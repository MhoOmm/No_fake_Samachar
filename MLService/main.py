# # ml-service/predict.py
# import os
# from huggingface_hub import InferenceClient

# # Initialize HF client once (reuse for all requests)
# HF_API_KEY = os.getenv("HF_API_KEY")

# client = InferenceClient(
#     provider="hf-inference",
#     api_key=HF_API_KEY
# )

# HF_MODEL = "fakespot-ai/roberta-base-ai-text-detection-v1"

# def hf_model_predict(text: str):
#     """
#     Predicts if text is AI-generated using Hugging Face RoBERTa model.
#     Returns structured output.
#     """
#     try:
#         # Use explicit 'inputs' and 'model' for clarity
#         result = client.text_classification(
#             model=HF_MODEL,
#             inputs=text
#         )
#         # result is usually a list of dicts: [{"label": "...", "score": ...}]
#         return {"prediction": result}
#     except Exception as e:
#         return {"error": str(e)}

# def second_model_predict(text: str):
#     """
#     Placeholder for second model. Replace with actual prediction logic.
#     """
#     # Example dummy prediction
#     return {"prediction": {"label": "neutral", "score": 1.0}}