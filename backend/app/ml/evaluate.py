"""
evaluate.py — Model comparison metrics

Computes Accuracy, Precision, Recall, F1, and ROC-AUC
for each model on a test set.
"""

import json
import numpy as np
from pathlib import Path
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "trained_models"


def compute_classification_metrics(y_true: np.ndarray, y_proba: np.ndarray,
                                   threshold: float = 0.5) -> dict:
    """
    Compute classification metrics from probability predictions.

    Parameters
    ----------
    y_true  : binary ground truth labels (0 or 1)
    y_proba : predicted probabilities for class 1
    threshold : decision threshold for binary conversion

    Returns
    -------
    dict with accuracy, precision, recall, f1, roc_auc
    """
    y_pred = (y_proba >= threshold).astype(int)

    return {
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 4),
        "precision": round(float(precision_score(y_true, y_pred, zero_division=0)), 4),
        "recall": round(float(recall_score(y_true, y_pred, zero_division=0)), 4),
        "f1": round(float(f1_score(y_true, y_pred, zero_division=0)), 4),
        "roc_auc": round(float(roc_auc_score(y_true, y_proba)), 4),
    }


def compute_regression_auc(y_true: np.ndarray, y_scores: np.ndarray) -> dict:
    """
    For the regressor, we only compute ROC-AUC
    (how well the continuous score ranks positives above negatives).
    """
    return {
        "accuracy": None,
        "precision": None,
        "recall": None,
        "f1": None,
        "roc_auc": round(float(roc_auc_score(y_true, y_scores)), 4),
    }


def evaluate_all_models(y_true: np.ndarray,
                        weighted_scores: np.ndarray,
                        rf_proba: np.ndarray,
                        xgb_clf_proba: np.ndarray,
                        xgb_reg_scores: np.ndarray) -> dict:
    """
    Evaluate all four models and return the comparison table.

    Returns
    -------
    dict of { model_name: { accuracy, precision, recall, f1, roc_auc } }
    """
    results = {
        "weighted_scoring": compute_classification_metrics(y_true, weighted_scores),
        "random_forest": compute_classification_metrics(y_true, rf_proba),
        "xgboost_classifier": compute_classification_metrics(y_true, xgb_clf_proba),
        "xgboost_regressor": compute_regression_auc(y_true, xgb_reg_scores),
    }
    return results


def save_metrics(metrics: dict) -> None:
    """Persist evaluation metrics to disk."""
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    with open(MODELS_DIR / "metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)


def load_metrics() -> dict:
    """Load saved evaluation metrics."""
    path = MODELS_DIR / "metrics.json"
    if not path.exists():
        raise FileNotFoundError("metrics.json not found. Run training first.")
    with open(path, "r") as f:
        return json.load(f)
