from flask import Flask, request, jsonify
import pickle
import os

app = Flask(__name__)

# Load model and vectorizer
with open("text_model_.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer_.pkl", "rb") as f:
    vectorizer = pickle.load(f)
    

@app.get("/health")
def health():
    return {"status": "ok"}
    
@app.get("/warmup")
def warmup():
    sample = "Breaking news example"
    vector = vectorizer.transform([sample])
    model.predict(vector)
    return {"status": "warm"}


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    transformed = vectorizer.transform([text])
    prediction = model.predict(transformed)[0]
    probability = model.predict_proba(transformed)[0]

    return jsonify({
        "prediction": int(prediction),
        "probability": float(max(probability))
    })


@app.route("/")
def home():
    return "ML Service is running"
    
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)