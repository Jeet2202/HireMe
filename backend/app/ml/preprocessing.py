"""
preprocessing.py — Normalization and Weighted Transformation

Handles:
  1. MinMaxScaler fitting and transforming
  2. Feature Weight Matrix (W vector) for weighted scoring baseline
"""

import json
import numpy as np
from pathlib import Path
from sklearn.preprocessing import MinMaxScaler
import joblib

from app.ml.features import FEATURE_COLUMNS

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "trained_models"


# ── Default Weight Vector ────────────────────────────────────────
# Order matches FEATURE_COLUMNS:
#   skill_match, experience, distance, reliability,
#   rating, attendance_rate, wage_match, response_time

DEFAULT_WEIGHTS = np.array([
    0.25,   # skill_match      — most important
    0.10,   # experience
    0.15,   # distance
    0.15,   # reliability
    0.10,   # rating
    0.10,   # attendance_rate
    0.10,   # wage_match
    0.05,   # response_time    — least important
])


def fit_scaler(X: np.ndarray) -> MinMaxScaler:
    """Fit a MinMaxScaler on the training feature matrix."""
    scaler = MinMaxScaler()
    scaler.fit(X)
    return scaler


def save_scaler(scaler: MinMaxScaler) -> None:
    """Persist the fitted scaler to disk."""
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(scaler, MODELS_DIR / "scaler.pkl")


def load_scaler() -> MinMaxScaler:
    """Load the fitted scaler from disk."""
    path = MODELS_DIR / "scaler.pkl"
    if not path.exists():
        raise FileNotFoundError("scaler.pkl not found. Run training first.")
    return joblib.load(path)


def save_weights(weights: np.ndarray) -> None:
    """Persist the weight vector as JSON."""
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    with open(MODELS_DIR / "weight_vector.json", "w") as f:
        json.dump({
            "features": FEATURE_COLUMNS,
            "weights": weights.tolist(),
        }, f, indent=2)


def load_weights() -> np.ndarray:
    """Load the weight vector from disk, or return defaults."""
    path = MODELS_DIR / "weight_vector.json"
    if not path.exists():
        return DEFAULT_WEIGHTS.copy()
    with open(path, "r") as f:
        data = json.load(f)
    return np.array(data["weights"])


def weighted_score(X_scaled: np.ndarray, weights: np.ndarray = None) -> np.ndarray:
    """
    Compute weighted dot-product scores for all rows.

    Parameters
    ----------
    X_scaled : np.ndarray of shape (n_workers, 8) — already normalized
    weights  : optional weight vector; uses saved/default if None

    Returns
    -------
    np.ndarray of shape (n_workers,) — scores in [0, 1]
    """
    if weights is None:
        weights = load_weights()
    return X_scaled @ weights
