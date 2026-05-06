"""
features.py — Feature vector builder

Reads workers.csv and jobs.csv, computes the 8-dimensional feature vector
for each (worker, job) pair.

Feature vector layout:
  [0] skill_match      — TF-IDF cosine similarity (filled by similarity.py)
  [1] experience       — normalized experience_years
  [2] distance         — inverse-normalized geographic distance
  [3] reliability      — reliability_score directly
  [4] rating           — avg_rating normalized to 0-1
  [5] attendance_rate  — attendance_rate directly
  [6] wage_match       — 1 - |expected_wage - budget| / max(expected_wage, budget)
  [7] response_time    — inverse-normalized response time (lower = better)
"""

import math
import pandas as pd
import numpy as np
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"


def load_workers() -> pd.DataFrame:
    """Load workers.csv from the data directory."""
    path = DATA_DIR / "workers.csv"
    if not path.exists():
        raise FileNotFoundError(f"workers.csv not found at {path}")
    return pd.read_csv(path)


def load_jobs() -> pd.DataFrame:
    """Load jobs.csv from the data directory."""
    path = DATA_DIR / "jobs.csv"
    if not path.exists():
        raise FileNotFoundError(f"jobs.csv not found at {path}")
    return pd.read_csv(path)


def load_matches() -> pd.DataFrame:
    """Load matches.csv (training dataset) from the data directory."""
    path = DATA_DIR / "matches.csv"
    if not path.exists():
        raise FileNotFoundError(f"matches.csv not found at {path}")
    return pd.read_csv(path)


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Compute the Haversine distance in km between two GPS coordinates."""
    R = 6371.0  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def compute_distance_score(worker_lat: float, worker_lon: float,
                           job_lat: float, job_lon: float,
                           max_km: float = 50.0) -> float:
    """
    Normalized inverse distance score.
    0 km → 1.0, ≥ max_km → 0.0
    """
    dist = haversine_km(worker_lat, worker_lon, job_lat, job_lon)
    return max(0.0, 1.0 - dist / max_km)


def compute_wage_match(expected_wage: float, budget: float) -> float:
    """
    Wage compatibility score.
    Perfect match → 1.0; large gap → approaches 0.0.
    """
    if max(expected_wage, budget) == 0:
        return 0.0
    return 1.0 - abs(expected_wage - budget) / max(expected_wage, budget)


def build_feature_vectors(workers_df: pd.DataFrame,
                          job_row: pd.Series,
                          skill_scores: np.ndarray) -> pd.DataFrame:
    """
    Build the full 8-feature matrix for all workers against a single job.

    Parameters
    ----------
    workers_df : DataFrame — must contain worker columns
    job_row : Series — a single row from jobs.csv
    skill_scores : np.ndarray — pre-computed TF-IDF similarity per worker (from similarity.py)

    Returns
    -------
    DataFrame with columns: worker_id + 8 feature columns
    """
    records = []
    for idx, w in workers_df.iterrows():
        distance = compute_distance_score(
            w["latitude"], w["longitude"],
            job_row["latitude"], job_row["longitude"],
        )
        wage = compute_wage_match(w["expected_daily_wage"], job_row["budget_per_day"])

        # Normalize rating to 0-1 (rating is 1-5)
        rating_norm = (w["rating"] - 1.0) / 4.0 if w["rating"] >= 1 else 0.0

        # Normalize response_time: lower is better; cap at 24 hours
        resp = max(0.0, 1.0 - w["response_time"] / 24.0)

        records.append({
            "worker_id": w["worker_id"],
            "skill_match": skill_scores[idx],
            "experience": w["experience_years"],
            "distance": distance,
            "reliability": w["reliability_score"],
            "rating": rating_norm,
            "attendance_rate": w["attendance_rate"],
            "wage_match": wage,
            "response_time": resp,
        })

    return pd.DataFrame(records)


# Ordered feature columns (always use this order)
FEATURE_COLUMNS = [
    "skill_match",
    "experience",
    "distance",
    "reliability",
    "rating",
    "attendance_rate",
    "wage_match",
    "response_time",
]
