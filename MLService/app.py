from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load model and vectorizer
with open("text_model_.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer_.pkl", "rb") as f:
    vectorizer = pickle.load(f)


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
    app.run(port=3000)