# MLService/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from predict import hf_model_predict, second_model_predict
import pickle
import os

# ==========================
# ✅ Setup paths
# ==========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "second_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "vectorizer.pkl")

# ==========================
# ✅ Load model and vectorizer
# ==========================
with open(MODEL_PATH, "rb") as f:
    second_model = pickle.load(f)

with open(VECTORIZER_PATH, "rb") as f:
    vectorizer = pickle.load(f)

# ==========================
# ✅ FastAPI App
# ==========================
app = FastAPI(title="Fake News Analyzer")

# Request body
class AnalyzeRequest(BaseModel):
    text: str

# ==========================
# Helper prediction function
# ==========================
def second_model_predict(text: str):
    if not text.strip():
        return {"error": "Text is empty"}
    
    X = vectorizer.transform([text])
    pred = second_model.predict(X)
    return {"prediction": str(pred[0])}

# Placeholder for HF model if needed
def hf_model_predict(text: str):
    # Add HuggingFace RoBERTa model code here
    return {"prediction": "hf-model-placeholder"}

# ==========================
# Endpoints
# ==========================
@app.post("/analyze/second")
def analyze_second(request: AnalyzeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    return second_model_predict(request.text)

@app.post("/analyze/hf")
def analyze_hf(request: AnalyzeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    return hf_model_predict(request.text)

# Health check
@app.get("/health")
def health_check():
    return {"status": "OK"}