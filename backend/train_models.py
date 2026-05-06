"""
train_models.py — Offline training script

Run this once to train all models on the CSV data:
    python train_models.py

Generates:
    trained_models/scaler.pkl
    trained_models/weight_vector.json
    trained_models/tfidf_vectorizer.pkl
    trained_models/random_forest.pkl
    trained_models/xgboost_clf.pkl
    trained_models/xgboost_reg.pkl
    trained_models/metrics.json
"""

import sys
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split

# Ensure the backend root is on the import path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from app.ml.features import load_workers, load_jobs, load_matches, FEATURE_COLUMNS
from app.ml.similarity import fit_tfidf, save_tfidf
from app.ml.preprocessing import (
    fit_scaler, save_scaler, save_weights, DEFAULT_WEIGHTS, weighted_score,
)
from app.ml.ml_models import (
    train_random_forest, train_xgboost_classifier, train_xgboost_regressor,
    save_model, predict_rf, predict_xgb_clf, predict_xgb_reg,
)
from app.ml.evaluate import evaluate_all_models, save_metrics


def main():
    print("=" * 60)
    print("  IPD Matching Engine — Offline Training")
    print("=" * 60)

    # ── Step 1: Load data ────────────────────────────────────
    print("\n[1/7] Loading CSV data...")
    workers = load_workers()
    jobs = load_jobs()
    matches = load_matches()
    print(f"  Workers: {len(workers)} | Jobs: {len(jobs)} | Match samples: {len(matches)}")

    # ── Step 2: Fit TF-IDF on all skills ─────────────────────
    print("\n[2/7] Fitting TF-IDF vectorizer on skills corpus...")
    worker_skills = workers["skills"].fillna("").tolist()
    job_skills = jobs["required_skills"].fillna("").tolist()
    corpus = worker_skills + job_skills
    vectorizer = fit_tfidf(corpus)
    save_tfidf(vectorizer)
    print(f"  Vocabulary size: {len(vectorizer.vocabulary_)}")

    # ── Step 3: Build training feature matrix from matches.csv
    print("\n[3/7] Building feature matrix from matches.csv...")

    # matches.csv already has the computed features we need
    feature_cols_in_matches = [
        "skill_match_score",    # → skill_match
        "distance_score",       # → distance
        "wage_match_score",     # → wage_match
    ]

    # Merge matches with worker data to get the full feature set
    match_data = matches.merge(
        workers[["worker_id", "experience_years", "reliability_score",
                 "rating", "attendance_rate", "response_time"]],
        on="worker_id",
        how="left",
    )

    # Normalize rating to 0-1 (rating is 1-5)
    match_data["rating_norm"] = (match_data["rating"] - 1.0) / 4.0

    # Normalize response_time: lower is better; cap at 24 hours
    match_data["response_norm"] = (1.0 - match_data["response_time"].clip(upper=24) / 24.0)

    # Assemble the 8-feature matrix in the correct order
    X = match_data[[
        "skill_match_score",     # [0] skill_match
        "experience_years",      # [1] experience
        "distance_score",        # [2] distance
        "reliability_score",     # [3] reliability
        "rating_norm",           # [4] rating
        "attendance_rate",       # [5] attendance_rate
        "wage_match_score",      # [6] wage_match
        "response_norm",         # [7] response_time
    ]].values.astype(float)

    y_class = match_data["selected_for_job"].values.astype(int)    # binary label
    y_weighted = match_data["weighted_score"].values.astype(float)  # regression target

    print(f"  Feature matrix shape: {X.shape}")
    print(f"  Positive samples (hired): {y_class.sum()} / {len(y_class)}")

    # ── Step 4: Fit scaler + save weights ────────────────────
    print("\n[4/7] Fitting MinMaxScaler & saving weight vector...")
    scaler = fit_scaler(X)
    save_scaler(scaler)
    save_weights(DEFAULT_WEIGHTS)
    X_scaled = scaler.transform(X)
    print("  Scaler fitted and saved.")

    # ── Step 5: Train/test split ─────────────────────────────
    print("\n[5/7] Splitting data 80/20...")
    X_train, X_test, y_train_c, y_test_c, y_train_w, y_test_w = train_test_split(
        X_scaled, y_class, y_weighted,
        test_size=0.2,
        random_state=42,
        stratify=y_class,
    )
    print(f"  Train: {len(X_train)} | Test: {len(X_test)}")

    # ── Step 6: Train all models ─────────────────────────────
    print("\n[6/7] Training models...")

    print("  → Weighted Scoring (baseline — no training needed)")
    # weighted scoring uses the weight vector directly, no fit

    print("  → Random Forest Classifier...")
    rf = train_random_forest(X_train, y_train_c)
    save_model(rf, "random_forest.pkl")

    print("  → XGBoost Classifier...")
    xgb_clf = train_xgboost_classifier(X_train, y_train_c)
    save_model(xgb_clf, "xgboost_clf.pkl")

    print("  → XGBoost Regressor...")
    xgb_reg = train_xgboost_regressor(X_train, y_train_w)
    save_model(xgb_reg, "xgboost_reg.pkl")

    print("  All models trained and saved.")

    # ── Step 7: Evaluate on test set ─────────────────────────
    print("\n[7/7] Evaluating on test set...")

    ws_scores = weighted_score(X_test, DEFAULT_WEIGHTS)
    rf_proba = rf.predict_proba(X_test)[:, 1]
    xgb_clf_proba = xgb_clf.predict_proba(X_test)[:, 1]
    xgb_reg_scores = xgb_reg.predict(X_test)

    metrics = evaluate_all_models(
        y_true=y_test_c,
        weighted_scores=ws_scores,
        rf_proba=rf_proba,
        xgb_clf_proba=xgb_clf_proba,
        xgb_reg_scores=xgb_reg_scores,
    )
    save_metrics(metrics)

    # Print comparison table
    print("\n" + "=" * 60)
    print("  MODEL COMPARISON RESULTS")
    print("=" * 60)
    print(f"  {'Model':<25} {'Acc':>7} {'Prec':>7} {'Rec':>7} {'F1':>7} {'AUC':>7}")
    print("  " + "-" * 55)
    for name, m in metrics.items():
        acc = f"{m['accuracy']:.2%}" if m["accuracy"] is not None else "  —"
        prec = f"{m['precision']:.2%}" if m["precision"] is not None else "  —"
        rec = f"{m['recall']:.2%}" if m["recall"] is not None else "  —"
        f1 = f"{m['f1']:.2%}" if m["f1"] is not None else "  —"
        auc = f"{m['roc_auc']:.4f}" if m["roc_auc"] is not None else "  —"
        print(f"  {name:<25} {acc:>7} {prec:>7} {rec:>7} {f1:>7} {auc:>7}")

    print("\n✅ Training complete. Models saved to trained_models/")
    print("   Start the server: python -m uvicorn app.main:app --reload --port 8000\n")


if __name__ == "__main__":
    main()
