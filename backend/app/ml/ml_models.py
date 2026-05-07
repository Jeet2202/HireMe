"""
ml_models.py — Model wrappers for training and prediction

Handles:
  1. Random Forest Classifier
  2. XGBoost Classifier
  3. XGBoost Regressor
  4. Serialization / deserialization
"""

import numpy as np
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier, XGBRegressor

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "trained_models"


# ═══════════════════════════════════════════════════════════════
#  TRAINING
# ═══════════════════════════════════════════════════════════════

def train_random_forest(X_train: np.ndarray, y_train: np.ndarray) -> RandomForestClassifier:
    """Train a Random Forest Classifier."""
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=42,
        class_weight="balanced",
    )
    model.fit(X_train, y_train)
    return model


def train_xgboost_classifier(X_train: np.ndarray, y_train: np.ndarray) -> XGBClassifier:
    """Train an XGBoost Classifier for success prediction."""
    model = XGBClassifier(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.1,
        random_state=42,
        use_label_encoder=False,
        eval_metric="logloss",
    )
    model.fit(X_train, y_train)
    return model


def train_xgboost_regressor(X_train: np.ndarray, y_train: np.ndarray) -> XGBRegressor:
    """
    Train an XGBoost Regressor for continuous match scoring.
    y_train here is the weighted_score (continuous), NOT the binary label.
    """
    model = XGBRegressor(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.1,
        random_state=42,
    )
    model.fit(X_train, y_train)
    return model


# ═══════════════════════════════════════════════════════════════
#  PERSISTENCE
# ═══════════════════════════════════════════════════════════════

def save_model(model, filename: str) -> None:
    """Serialize a trained model to disk."""
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODELS_DIR / filename)


def load_model(filename: str):
    """Load a serialized model from disk."""
    path = MODELS_DIR / filename
    if not path.exists():
        raise FileNotFoundError(f"{filename} not found. Run training first.")
    return joblib.load(path)


# ═══════════════════════════════════════════════════════════════
#  PREDICTION
# ═══════════════════════════════════════════════════════════════

def predict_rf(X: np.ndarray) -> np.ndarray:
    """Return Random Forest match probabilities (class 1)."""
    model = load_model("random_forest.pkl")
    return model.predict_proba(X)[:, 1]


def predict_xgb_clf(X: np.ndarray) -> np.ndarray:
    """Return XGBoost Classifier match probabilities (class 1)."""
    model = load_model("xgboost_clf.pkl")
    return model.predict_proba(X)[:, 1]


def predict_xgb_reg(X: np.ndarray) -> np.ndarray:
    """Return XGBoost Regressor continuous match scores."""
    model = load_model("xgboost_reg.pkl")
    return model.predict(X)


def get_feature_importance(model_name: str = "random_forest.pkl") -> dict:
    """
    Return feature importance as a dict of {feature_name: importance}.
    Works for RF, XGBoost Classifier, and XGBoost Regressor.
    """
    from app.ml.features import FEATURE_COLUMNS

    model = load_model(model_name)
    importances = model.feature_importances_
    return {
        col: round(float(imp), 4)
        for col, imp in zip(FEATURE_COLUMNS, importances)
    }
