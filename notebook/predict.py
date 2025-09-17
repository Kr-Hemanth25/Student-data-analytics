import sys
import json
from pathlib import Path
import numpy as np

try:
    import joblib
except Exception as e:
    print(json.dumps({"error": "joblib not installed"}))
    sys.exit(1)


def load_model(model_path: Path):
    if not model_path.exists():
        raise FileNotFoundError(f"Model not found at {model_path}")
    return joblib.load(model_path)


def read_input():
    try:
        data = json.loads(sys.stdin.read() or "{}")
        return data
    except Exception:
        return {}


def to_features(payload: dict):
    keys = ["comprehension", "attention", "focus", "retention", "engagement_time"]
    values = []
    for k in keys:
        v = payload.get(k, 0)
        try:
            v = float(v)
        except Exception:
            v = 0.0
        values.append(v)
    return np.array(values, dtype=float).reshape(1, -1)


def persona_from_score(score: float) -> str:
    if score >= 85:
        return "High Performer"
    if score >= 70:
        return "Consistent Learner"
    if score >= 50:
        return "Developing Learner"
    return "Needs Support"


def main():
    # model path relative to this script
    model_path = Path(__file__).resolve().parent / "student_score_model.pkl"
    try:
        model = load_model(model_path)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        return

    payload = read_input()
    X = to_features(payload)
    try:
        y_pred = float(model.predict(X)[0])
    except Exception as e:
        print(json.dumps({"error": f"prediction_failed: {e}"}))
        return

    result = {
        "score": round(y_pred, 2),
        "persona": persona_from_score(y_pred),
    }
    print(json.dumps(result))


if __name__ == "__main__":
    main()


