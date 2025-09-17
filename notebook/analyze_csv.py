import sys
import json
import io
import pandas as pd
import numpy as np
from pathlib import Path

try:
    from sklearn.cluster import KMeans
    from sklearn.linear_model import LinearRegression
    import joblib
except Exception:
    KMeans = None
    LinearRegression = None
    joblib = None


def compute_overview(df: pd.DataFrame):
    numeric_cols = [c for c in [
        'comprehension','attention','focus','retention','engagement_time','assessment_score'
    ] if c in df.columns]
    stats = df[numeric_cols].mean(numeric_only=True).to_dict()
    return { k: float(round(v,2)) for k,v in stats.items() }


def compute_correlations(df: pd.DataFrame):
    corr = df.corr(numeric_only=True)
    if 'assessment_score' in corr.columns:
        series = corr['assessment_score'].sort_values(ascending=False)
        return { k: float(round(v,3)) for k,v in series.items() }
    return {}


def predict_scores(df: pd.DataFrame):
    model_path = Path(__file__).resolve().parent / 'student_score_model.pkl'
    if joblib is None or not model_path.exists():
        return None
    model = joblib.load(model_path)
    needed = ['comprehension','attention','focus','retention','engagement_time']
    if not all(c in df.columns for c in needed):
        return None
    X = df[needed].astype(float).values
    preds = model.predict(X)
    return [ float(round(p,2)) for p in preds ]


def persona_from_score(score: float) -> str:
    if score >= 85: return 'High Performer'
    if score >= 70: return 'Consistent Learner'
    if score >= 50: return 'Developing Learner'
    return 'Needs Support'


def cluster_personas(df: pd.DataFrame):
    # If model predictions available, use them to label; else kmeans
    preds = predict_scores(df)
    personas = []
    if preds is not None:
        personas = [ persona_from_score(p) for p in preds ]
    else:
        if KMeans is None:
            return None
        needed = ['comprehension','attention','focus','retention','engagement_time']
        if not all(c in df.columns for c in needed):
            return None
        X = df[needed].astype(float).values
        km = KMeans(n_clusters=3, random_state=42, n_init=10)
        labels = km.fit_predict(X)
        mapping = {0:'High Performer',1:'Consistent Learner',2:'Developing Learner'}
        personas = [ mapping.get(int(l), 'Persona') for l in labels ]
    return personas


def main():
    raw = sys.stdin.buffer.read()
    if not raw:
        print(json.dumps({"error":"no_input"}))
        return
    try:
        text = raw.decode('utf-8', errors='ignore')
        df = pd.read_csv(io.StringIO(text))
    except Exception as e:
        print(json.dumps({"error": f"csv_parse_failed: {e}"}))
        return

    overview = compute_overview(df)
    correlations = compute_correlations(df)
    personas = cluster_personas(df)

    result = {
        "overview": overview,
        "correlations": correlations,
        "personas": personas,
        "count": int(len(df)),
        "columns": list(df.columns),
        "preview": df.to_dict(orient='records')
    }
    print(json.dumps(result))


if __name__ == '__main__':
    main()


