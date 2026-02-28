# ml-service/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from predict import hf_model_predict, second_model_predict

app = FastAPI(title="Fake News Analyzer")

class AnalyzeRequest(BaseModel):
    text: str

# Endpoint for HF RoBERTa model
@app.post("/analyze/hf")
def analyze_hf(request: AnalyzeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    return hf_model_predict(request.text)

# Endpoint for second model
@app.post("/analyze/second")
def analyze_second(request: AnalyzeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    return second_model_predict(request.text)

# Health check
@app.get("/health")
def health_check():
    return {"status": "OK"}