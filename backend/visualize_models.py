"""
visualize_models.py — Generate publication-quality graphs for report/PPT/viva

Run:
    python visualize_models.py

Generates in backend/graphs/:
    1_accuracy_comparison.png      — Bar chart: all models
    2_confusion_matrix_rf.png      — Confusion matrix: Random Forest
    3_confusion_matrix_xgb.png     — Confusion matrix: XGBoost Classifier
    4_roc_curve.png                — ROC curves: Weighted, RF, XGBoost on one plot
    5_feature_importance_rf.png    — Feature importance: Random Forest
    6_feature_importance_xgb.png   — Feature importance: XGBoost Classifier
"""

import sys
import json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")  # non-interactive backend for PNG generation
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc

# Ensure imports work
sys.path.insert(0, str(Path(__file__).resolve().parent))

from app.ml.features import load_workers, load_jobs, load_matches, FEATURE_COLUMNS
from app.ml.preprocessing import load_scaler, load_weights, weighted_score
from app.ml.ml_models import load_model

GRAPHS_DIR = Path(__file__).resolve().parent / "graphs"
MODELS_DIR = Path(__file__).resolve().parent / "trained_models"

# ── Color palette (professional dark theme) ──────────────────
BG_COLOR = "#0f1117"
CARD_BG = "#1a1d27"
TEXT_COLOR = "#e2e8f0"
GRID_COLOR = "#2d3348"
ACCENT_BLUE = "#60a5fa"
ACCENT_GREEN = "#34d399"
ACCENT_PURPLE = "#a78bfa"
ACCENT_ORANGE = "#fb923c"
ACCENT_RED = "#f87171"
ACCENT_CYAN = "#22d3ee"


def setup_style():
    """Apply dark professional matplotlib style."""
    plt.rcParams.update({
        "figure.facecolor": BG_COLOR,
        "axes.facecolor": CARD_BG,
        "axes.edgecolor": GRID_COLOR,
        "axes.labelcolor": TEXT_COLOR,
        "axes.grid": True,
        "grid.color": GRID_COLOR,
        "grid.alpha": 0.4,
        "text.color": TEXT_COLOR,
        "xtick.color": TEXT_COLOR,
        "ytick.color": TEXT_COLOR,
        "font.family": "sans-serif",
        "font.size": 12,
        "figure.dpi": 150,
    })


def load_test_data():
    """Reproduce the exact same test split used during training."""
    workers = load_workers()
    matches = load_matches()

    match_data = matches.merge(
        workers[["worker_id", "experience_years", "reliability_score",
                 "rating", "attendance_rate", "response_time"]],
        on="worker_id",
        how="left",
    )

    match_data["rating_norm"] = (match_data["rating"] - 1.0) / 4.0
    match_data["response_norm"] = 1.0 - match_data["response_time"].clip(upper=24) / 24.0

    X = match_data[[
        "skill_match_score",
        "experience_years",
        "distance_score",
        "reliability_score",
        "rating_norm",
        "attendance_rate",
        "wage_match_score",
        "response_norm",
    ]].values.astype(float)

    y_class = match_data["selected_for_job"].values.astype(int)
    y_weighted = match_data["weighted_score"].values.astype(float)

    scaler = load_scaler()
    X_scaled = scaler.transform(X)

    # Same split as train_models.py (random_state=42, stratify)
    X_train, X_test, y_train_c, y_test_c, y_train_w, y_test_w = train_test_split(
        X_scaled, y_class, y_weighted,
        test_size=0.2,
        random_state=42,
        stratify=y_class,
    )
    return X_test, y_test_c, y_test_w


def generate_accuracy_comparison():
    """1. Accuracy comparison bar chart for all models."""
    print("  -> Accuracy Comparison Graph...")

    with open(MODELS_DIR / "metrics.json") as f:
        metrics = json.load(f)

    models = ["weighted_scoring", "random_forest", "xgboost_classifier"]
    labels = ["Weighted\nScoring", "Random\nForest", "XGBoost\nClassifier"]
    colors = [ACCENT_ORANGE, ACCENT_BLUE, ACCENT_GREEN]

    # Gather all metrics
    acc_vals = [metrics[m]["accuracy"] * 100 for m in models]
    prec_vals = [metrics[m]["precision"] * 100 for m in models]
    rec_vals = [metrics[m]["recall"] * 100 for m in models]
    f1_vals = [metrics[m]["f1"] * 100 for m in models]

    fig, ax = plt.subplots(figsize=(12, 7))

    x = np.arange(len(models))
    width = 0.18

    bars1 = ax.bar(x - 1.5 * width, acc_vals, width, label="Accuracy", color=ACCENT_BLUE, alpha=0.9, edgecolor="none")
    bars2 = ax.bar(x - 0.5 * width, prec_vals, width, label="Precision", color=ACCENT_GREEN, alpha=0.9, edgecolor="none")
    bars3 = ax.bar(x + 0.5 * width, rec_vals, width, label="Recall", color=ACCENT_PURPLE, alpha=0.9, edgecolor="none")
    bars4 = ax.bar(x + 1.5 * width, f1_vals, width, label="F1 Score", color=ACCENT_ORANGE, alpha=0.9, edgecolor="none")

    # Add value labels on bars
    for bars in [bars1, bars2, bars3, bars4]:
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f"{height:.1f}%",
                        xy=(bar.get_x() + bar.get_width() / 2, height),
                        xytext=(0, 5), textcoords="offset points",
                        ha="center", va="bottom", fontsize=8, color=TEXT_COLOR)

    ax.set_ylabel("Score (%)", fontsize=13, fontweight="bold")
    ax.set_title("Model Performance Comparison", fontsize=18, fontweight="bold", pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=12)
    ax.set_ylim(0, 105)
    ax.legend(loc="upper left", framealpha=0.8, facecolor=CARD_BG, edgecolor=GRID_COLOR)

    plt.tight_layout()
    plt.savefig(GRAPHS_DIR / "1_accuracy_comparison.png", bbox_inches="tight")
    plt.close()


def generate_confusion_matrices(X_test, y_test):
    """2. Confusion matrices for RF and XGBoost."""
    print("  -> Confusion Matrix (RF)...")

    rf = load_model("random_forest.pkl")
    xgb = load_model("xgboost_clf.pkl")

    for model, name, filename, color in [
        (rf, "Random Forest", "2_confusion_matrix_rf.png", plt.cm.Blues),
        (xgb, "XGBoost Classifier", "3_confusion_matrix_xgb.png", plt.cm.Greens),
    ]:
        y_pred = model.predict(X_test)
        cm = confusion_matrix(y_test, y_pred)

        fig, ax = plt.subplots(figsize=(8, 7))

        disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["Not Hired", "Hired"])
        disp.plot(ax=ax, cmap=color, values_format="d", colorbar=False)

        # Style the text inside matrix cells
        for text in disp.text_.ravel():
            text.set_fontsize(20)
            text.set_fontweight("bold")

        ax.set_title(f"Confusion Matrix -- {name}", fontsize=16, fontweight="bold", pad=15)
        ax.set_xlabel("Predicted Label", fontsize=13, fontweight="bold")
        ax.set_ylabel("True Label", fontsize=13, fontweight="bold")

        plt.tight_layout()
        plt.savefig(GRAPHS_DIR / filename, bbox_inches="tight")
        plt.close()

        if "rf" in filename:
            print("  -> Confusion Matrix (XGBoost)...")


def generate_roc_curves(X_test, y_test):
    """3. ROC curves: Weighted, RF, and XGBoost on one plot."""
    print("  -> ROC Curve...")

    weights = load_weights()
    rf = load_model("random_forest.pkl")
    xgb = load_model("xgboost_clf.pkl")

    # Get probability scores
    ws_scores = weighted_score(X_test, weights)
    rf_proba = rf.predict_proba(X_test)[:, 1]
    xgb_proba = xgb.predict_proba(X_test)[:, 1]

    fig, ax = plt.subplots(figsize=(10, 8))

    for scores, name, color, ls in [
        (ws_scores, "Weighted Scoring", ACCENT_ORANGE, "--"),
        (rf_proba, "Random Forest", ACCENT_BLUE, "-"),
        (xgb_proba, "XGBoost Classifier", ACCENT_GREEN, "-"),
    ]:
        fpr, tpr, _ = roc_curve(y_test, scores)
        roc_auc = auc(fpr, tpr)
        ax.plot(fpr, tpr, color=color, linewidth=2.5, linestyle=ls,
                label=f"{name} (AUC = {roc_auc:.4f})")

    # Diagonal reference line
    ax.plot([0, 1], [0, 1], color=GRID_COLOR, linewidth=1, linestyle=":", alpha=0.7, label="Random (AUC = 0.5)")

    # Fill under curves slightly
    ax.fill_between([0, 1], [0, 1], alpha=0.03, color=TEXT_COLOR)

    ax.set_xlabel("False Positive Rate", fontsize=13, fontweight="bold")
    ax.set_ylabel("True Positive Rate", fontsize=13, fontweight="bold")
    ax.set_title("ROC Curve Comparison", fontsize=18, fontweight="bold", pad=20)
    ax.legend(loc="lower right", fontsize=11, framealpha=0.8, facecolor=CARD_BG, edgecolor=GRID_COLOR)
    ax.set_xlim(-0.02, 1.02)
    ax.set_ylim(-0.02, 1.02)

    plt.tight_layout()
    plt.savefig(GRAPHS_DIR / "4_roc_curve.png", bbox_inches="tight")
    plt.close()


def generate_feature_importance():
    """4. Feature importance: RF and XGBoost."""
    print("  -> Feature Importance (RF)...")

    rf = load_model("random_forest.pkl")
    xgb = load_model("xgboost_clf.pkl")

    feature_labels = [
        "Skill Match",
        "Experience",
        "Distance",
        "Reliability",
        "Rating",
        "Attendance",
        "Wage Match",
        "Response Time",
    ]

    for model, name, filename, color in [
        (rf, "Random Forest", "5_feature_importance_rf.png", ACCENT_BLUE),
        (xgb, "XGBoost Classifier", "6_feature_importance_xgb.png", ACCENT_GREEN),
    ]:
        importances = model.feature_importances_
        sorted_idx = np.argsort(importances)

        fig, ax = plt.subplots(figsize=(10, 7))

        bars = ax.barh(
            range(len(sorted_idx)),
            importances[sorted_idx],
            color=color,
            alpha=0.85,
            edgecolor="none",
            height=0.6,
        )

        # Add percentage labels
        for i, bar in enumerate(bars):
            width = bar.get_width()
            ax.text(width + 0.005, bar.get_y() + bar.get_height() / 2,
                    f"{width:.1%}", va="center", fontsize=11, color=TEXT_COLOR, fontweight="bold")

        ax.set_yticks(range(len(sorted_idx)))
        ax.set_yticklabels([feature_labels[i] for i in sorted_idx], fontsize=12)
        ax.set_xlabel("Importance", fontsize=13, fontweight="bold")
        ax.set_title(f"Feature Importance -- {name}", fontsize=16, fontweight="bold", pad=15)
        ax.set_xlim(0, max(importances) * 1.25)

        plt.tight_layout()
        plt.savefig(GRAPHS_DIR / filename, bbox_inches="tight")
        plt.close()

        if "rf" in filename:
            print("  -> Feature Importance (XGBoost)...")


def main():
    setup_style()
    GRAPHS_DIR.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("  IPD Matching Engine — Graph Generation")
    print("=" * 60)

    print("\nLoading test data (same split as training)...")
    X_test, y_test_c, y_test_w = load_test_data()
    print(f"  Test set size: {len(X_test)}\n")

    print("Generating graphs...")
    generate_accuracy_comparison()
    generate_confusion_matrices(X_test, y_test_c)
    generate_roc_curves(X_test, y_test_c)
    generate_feature_importance()

    print(f"\n[OK] All graphs saved to: {GRAPHS_DIR}/")
    print("   Files:")
    for f in sorted(GRAPHS_DIR.glob("*.png")):
        print(f"     {f.name}")


if __name__ == "__main__":
    main()
