"""
similarity.py — TF-IDF + Cosine Similarity Engine

Computes semantic skill similarity between a job's required_skills
and each worker's skills using TF-IDF vectorization.
"""

import numpy as np
import joblib
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

MODELS_DIR = Path(__file__).resolve().parent.parent.parent / "trained_models"

# Soft pre-filter threshold (Phase 6.3 — Hybrid Design)
SIMILARITY_THRESHOLD = 0.35


def fit_tfidf(corpus: list[str]) -> TfidfVectorizer:
    """
    Fit a TF-IDF vectorizer on the full corpus of skill strings.

    Parameters
    ----------
    corpus : list of strings — concatenated worker skills + job skill strings

    Returns
    -------
    Fitted TfidfVectorizer
    """
    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        ngram_range=(1, 2),  # unigrams + bigrams for better matching
    )
    vectorizer.fit(corpus)
    return vectorizer


def save_tfidf(vectorizer: TfidfVectorizer) -> None:
    """Persist the fitted TF-IDF vectorizer."""
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(vectorizer, MODELS_DIR / "tfidf_vectorizer.pkl")


def load_tfidf() -> TfidfVectorizer:
    """Load the fitted TF-IDF vectorizer from disk."""
    path = MODELS_DIR / "tfidf_vectorizer.pkl"
    if not path.exists():
        raise FileNotFoundError("tfidf_vectorizer.pkl not found. Run training first.")
    return joblib.load(path)


def compute_similarity(
    vectorizer: TfidfVectorizer,
    job_skills: str,
    worker_skills_list: list[str],
) -> np.ndarray:
    """
    Compute cosine similarity between a single job and all workers.

    Parameters
    ----------
    vectorizer : fitted TfidfVectorizer
    job_skills : string of required skills (e.g. "masonry, concrete, tiling")
    worker_skills_list : list of skill strings, one per worker

    Returns
    -------
    np.ndarray of shape (n_workers,) — similarity scores in [0, 1]
    """
    # Transform job + workers into TF-IDF space
    all_texts = [job_skills] + worker_skills_list
    tfidf_matrix = vectorizer.transform(all_texts)

    # Cosine similarity: job vector (row 0) vs all worker vectors (rows 1+)
    job_vector = tfidf_matrix[0:1]
    worker_vectors = tfidf_matrix[1:]
    scores = cosine_similarity(job_vector, worker_vectors).flatten()

    return scores


def apply_soft_prefilter(
    worker_ids: list,
    similarity_scores: np.ndarray,
    threshold: float = SIMILARITY_THRESHOLD,
) -> tuple[list, np.ndarray]:
    """
    Remove workers below the soft pre-filter threshold.

    Parameters
    ----------
    worker_ids : list of worker identifiers
    similarity_scores : array of TF-IDF similarity scores
    threshold : minimum similarity to keep (default 0.35)

    Returns
    -------
    (filtered_worker_ids, filtered_scores) — only those above threshold
    """
    mask = similarity_scores >= threshold
    filtered_ids = [wid for wid, keep in zip(worker_ids, mask) if keep]
    filtered_scores = similarity_scores[mask]
    return filtered_ids, filtered_scores
