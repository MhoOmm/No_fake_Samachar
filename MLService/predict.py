# ml-service/predict.py
import requests
import os

# Hugging Face Model 1
HF_API_URL_1 = "https://api-inference.huggingface.co/models/your-username/roberta-fake-news"
HF_API_TOKEN = os.getenv("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") 
HEADERS = {"Authorization": f"Bearer {HF_API_TOKEN}"}

def hf_model_predict(text: str):
    """
    Call Hugging Face RoBERTa model for fake news detection
    """
    payload = {"inputs": text}
    try:
        response = requests.post(HF_API_URL_1, headers=HEADERS, json=payload)
        response.raise_for_status()
        data = response.json()
        top = max(data[0], key=lambda x: x["score"])
        return {"label": top["label"], "score": float(top["score"])}
    except Exception as e:
        return {"label": "error", "score": 0.0, "details": str(e)}

def second_model_predict(text: str):
    """
    Placeholder for second fake news detection model
    """
    # TODO: Add your second model logic (e.g., TF-IDF + Logistic Regression)
    return {"label": "not_implemented", "score": 0.0}