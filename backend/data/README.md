# Data Directory

Place the following CSV files here:

## 1. `workers.csv`
| Column | Description |
|---|---|
| worker_id | Unique identifier |
| skills | Comma-separated skill strings (e.g. "masonry, concrete, tiling") |
| experience_years | Integer: years of experience |
| skill_level | beginner / intermediate / expert |
| rating | Float: 1.0 – 5.0 |
| jobs_completed | Integer |
| reliability_score | Float: 0.0 – 1.0 |
| attendance_rate | Float: 0.0 – 1.0 |
| expected_daily_wage | Integer (currency) |
| response_time | Float: average response time in hours |
| latitude | Float |
| longitude | Float |

## 2. `jobs.csv`
| Column | Description |
|---|---|
| job_id | Unique identifier |
| required_skills | Comma-separated skill strings |
| required_skill_level | beginner / intermediate / expert |
| workers_needed | Integer |
| budget_per_day | Integer (currency) |
| urgency | low / medium / high |
| latitude | Float |
| longitude | Float |

## 3. `matches.csv`  (ML training dataset)
| Column | Description |
|---|---|
| worker_id | FK to workers.csv |
| job_id | FK to jobs.csv |
| skill_match_score | Float: TF-IDF similarity output (0–1) |
| distance_score | Float: normalized proximity (0–1) |
| wage_match_score | Float: salary compatibility (0–1) |
| predicted_no_show_probability | Float: risk score (0–1) |
| weighted_score | Float: baseline model output |
| random_forest_score | Float: RF model output |
| xgboost_score | Float: XGBoost model output |
| final_match_score | Float: merged ranking score |
| selected_for_job | Integer: 1 = hired, 0 = not hired (TRAINING LABEL) |
| worker_showed_up | Integer: 1 = showed up, 0 = no-show (NO-SHOW PREDICTION TARGET) |
