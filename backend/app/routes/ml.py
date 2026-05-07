"""
ml.py — API routes for the ML matching engine

Routes:
  POST /api/ml/train             — trigger offline training
  POST /api/ml/retrain           — retrain on updated data
  GET  /api/ml/evaluate          — return comparison metrics table
  POST /api/ml/predict/{job_id}  — run all models, return ranked workers
  GET  /api/ml/similarity/{job_id} — return TF-IDF similarity scores
  GET  /api/ml/feature-importance  — return feature importance from RF
"""

import subprocess
import sys
import numpy as np
import pandas as pd
from pathlib import Path
from fastapi import APIRouter, HTTPException, status

from app.ml.features import (
    load_workers, load_jobs, FEATURE_COLUMNS,
    compute_distance_score, compute_wage_match,
)
from app.ml.similarity import load_tfidf, compute_similarity, apply_soft_prefilter
from app.ml.preprocessing import load_scaler, load_weights, weighted_score
from app.ml.ml_models import predict_rf, predict_xgb_clf, predict_xgb_reg, get_feature_importance
from app.ml.evaluate import load_metrics

router = APIRouter()

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent


# ═══════════════════════════════════════════════════════════════
#  TRAINING
# ═══════════════════════════════════════════════════════════════

@router.post("/train", status_code=status.HTTP_200_OK)
async def train_models():
    """
    Trigger the offline training script.
    Trains all models on the current CSV data in backend/data/.
    """
    try:
        result = subprocess.run(
            [sys.executable, str(BACKEND_DIR / "train_models.py")],
            capture_output=True,
            text=True,
            cwd=str(BACKEND_DIR),
            timeout=300,
        )
        if result.returncode != 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Training failed:\n{result.stderr}",
            )
        return {
            "message": "Training completed successfully.",
            "output": result.stdout,
        }
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/retrain", status_code=status.HTTP_200_OK)
async def retrain_models():
    """
    Re-run training on updated data.
    Same as /train — exists as a semantic alias for admin clarity.
    """
    return await train_models()


# ═══════════════════════════════════════════════════════════════
#  EVALUATION
# ═══════════════════════════════════════════════════════════════

@router.get("/evaluate")
async def evaluate():
    """Return the last saved model comparison metrics."""
    try:
        metrics = load_metrics()
        return {"metrics": metrics}
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Models not trained yet. Run POST /api/ml/train first.",
        )


@router.get("/feature-importance")
async def feature_importance():
    """Return feature importance from the Random Forest model."""
    try:
        rf_importance = get_feature_importance("random_forest.pkl")
        xgb_importance = get_feature_importance("xgboost_clf.pkl")
        return {
            "random_forest": rf_importance,
            "xgboost_classifier": xgb_importance,
        }
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Models not trained yet. Run POST /api/ml/train first.",
        )


# ═══════════════════════════════════════════════════════════════
#  PREDICTION
# ═══════════════════════════════════════════════════════════════

@router.post("/predict/{job_id}")
async def predict(job_id: str):
    """
    Run all models for a given job and return ranked workers.

    Pipeline:
    1. Load workers & job
    2. Compute TF-IDF similarity
    3. Apply soft pre-filter (threshold 0.35)
    4. Build 8-feature vectors
    5. Normalize via fitted scaler
    6. Run weighted scoring, RF, XGBoost Clf, XGBoost Reg
    7. Return merged ranked list
    """
    try:
        workers = load_workers()
        jobs = load_jobs()
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Find the job
    job_matches = jobs[jobs["job_id"].astype(str) == str(job_id)]
    if job_matches.empty:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found.")
    job = job_matches.iloc[0]

    try:
        vectorizer = load_tfidf()
        scaler = load_scaler()
        weights = load_weights()
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Models not trained yet. Run POST /api/ml/train first.",
        )

    # Step 1: TF-IDF similarity
    worker_skills = workers["skills"].fillna("").tolist()
    job_skills = str(job["required_skills"]) if pd.notna(job["required_skills"]) else ""
    similarity_scores = compute_similarity(vectorizer, job_skills, worker_skills)

    # Step 2: Soft pre-filter
    worker_ids = workers["worker_id"].tolist()
    filtered_ids, filtered_sim = apply_soft_prefilter(worker_ids, similarity_scores)

    if len(filtered_ids) == 0:
        return {"job_id": job_id, "ranked_workers": [], "message": "No workers matched above similarity threshold."}

    # Step 3: Build feature vectors for filtered workers
    filtered_workers = workers[workers["worker_id"].isin(filtered_ids)].reset_index(drop=True)
    # Create a mapping from worker_id to filtered similarity score
    sim_map = dict(zip(filtered_ids, filtered_sim))

    feature_rows = []
    for _, w in filtered_workers.iterrows():
        distance = compute_distance_score(
            w["latitude"], w["longitude"],
            job["latitude"], job["longitude"],
        )
        wage = compute_wage_match(w["expected_daily_wage"], job["budget_per_day"])
        rating_norm = (w["rating"] - 1.0) / 4.0 if w["rating"] >= 1 else 0.0
        resp = max(0.0, 1.0 - w["response_time"] / 24.0)

        feature_rows.append([
            sim_map[w["worker_id"]],  # [0] skill_match
            w["experience_years"],     # [1] experience
            distance,                  # [2] distance
            w["reliability_score"],    # [3] reliability
            rating_norm,               # [4] rating
            w["attendance_rate"],      # [5] attendance_rate
            wage,                      # [6] wage_match
            resp,                      # [7] response_time
        ])

    X = np.array(feature_rows, dtype=float)
    X_scaled = scaler.transform(X)

    # Step 4: Run all models
    ws = weighted_score(X_scaled, weights)
    rf = predict_rf(X_scaled)
    xgb_c = predict_xgb_clf(X_scaled)
    xgb_r = predict_xgb_reg(X_scaled)

    # Step 5: Merge into ranked list (average of all scores)
    final_scores = (ws + rf + xgb_c + xgb_r) / 4.0

    # Build output
    results = []
    for i, (_, w) in enumerate(filtered_workers.iterrows()):
        results.append({
            "worker_id": str(w["worker_id"]),
            "skills": w["skills"],
            "experience_years": int(w["experience_years"]),
            "rating": float(w["rating"]),
            "scores": {
                "skill_similarity": round(float(sim_map[w["worker_id"]]), 4),
                "weighted_score": round(float(ws[i]), 4),
                "random_forest": round(float(rf[i]), 4),
                "xgboost_classifier": round(float(xgb_c[i]), 4),
                "xgboost_regressor": round(float(xgb_r[i]), 4),
                "final_score": round(float(final_scores[i]), 4),
            }
        })

    # Sort by final score descending
    results.sort(key=lambda x: x["scores"]["final_score"], reverse=True)

    return {
        "job_id": job_id,
        "total_workers": len(workers),
        "workers_after_filter": len(filtered_ids),
        "ranked_workers": results,
    }


# ═══════════════════════════════════════════════════════════════
#  SIMILARITY (standalone)
# ═══════════════════════════════════════════════════════════════

@router.get("/similarity/{job_id}")
async def similarity(job_id: str):
    """Return TF-IDF similarity scores for all workers against a job."""
    try:
        workers = load_workers()
        jobs = load_jobs()
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))

    job_matches = jobs[jobs["job_id"].astype(str) == str(job_id)]
    if job_matches.empty:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found.")
    job = job_matches.iloc[0]

    try:
        vectorizer = load_tfidf()
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="TF-IDF model not trained yet.")

    worker_skills = workers["skills"].fillna("").tolist()
    job_skills = str(job["required_skills"]) if pd.notna(job["required_skills"]) else ""
    scores = compute_similarity(vectorizer, job_skills, worker_skills)

    results = [
        {
            "worker_id": str(workers.iloc[i]["worker_id"]),
            "skills": workers.iloc[i]["skills"],
            "similarity_score": round(float(scores[i]), 4),
            "above_threshold": bool(scores[i] >= 0.35),
        }
        for i in range(len(workers))
    ]
    results.sort(key=lambda x: x["similarity_score"], reverse=True)

    return {
        "job_id": job_id,
        "job_required_skills": job_skills,
        "similarity_results": results,
    }
