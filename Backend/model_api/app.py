import json
import pickle

from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import CountVectorizer

from db_utils import get_db_connection, get_all_questions

app = Flask(__name__)
vectorizer = None
model = None


def _load_model():
    local_model = pickle.load(open('model/model.pkl', 'rb'))

    return local_model


def _load_vectorizer():
    data = json.load(open('model/vocab.json'))
    local_vectorizer = CountVectorizer(ngram_range=(1, 3), vocabulary=data)

    return local_vectorizer


@app.route("/similar-questions", methods=['GET', 'POST'])
def get_similar_questions():
    conn = get_db_connection()
    questions = get_all_questions(conn)

    if len(questions) == 0:
        return jsonify([])

    json_data = request.json

    print(json_data)

    if 'text' not in json_data:
        return jsonify({
            'error': 'text field not present in JSON'
        }), 400

    context_question = json_data['text']
    questions_text = vectorizer.transform([context_question + ' ' + q[1] for q in questions])
    predictions = model.predict(questions_text)

    output_inds = []

    for i in range(0, len(predictions)):
        if predictions[i] == 1:
            output_inds.append(i)

    output = [{"id": questions[ind][0], "text": questions[ind][1]} for ind in output_inds][:10]

    return jsonify(output)


@app.route("/", methods=['GET'])
def hello_world():
    return "<p>This is the ML model API</p>"


if __name__ == "__main__":
    model = _load_model()
    vectorizer = _load_vectorizer()
    app.run(host="0.0.0.0", port=8001)
