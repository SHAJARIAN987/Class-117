# import the necessary modules
from flask import Flask , render_template , request , jsonify, url_for

# importing sentiment_analysis file as sa
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

app.route('/predictemotion', methods = ["POST"])
def predictemotion():
    input_text = request.json.get("customer_review")
    response = ""
    if not input_text:
        response = {
            "status":"error",
            "message":"The response is blank! Please enter some text."
        }
        return jsonify(response)
    else:
        predicted_emotion, predicted_emotion_img_url = sa.predict(input_text)

        response = {
            "status":"success",
            "predicted_emotion":predicted_emotion,
            "predicted_emotion_img_url":predicted_emotion_img_url
        }
        return jsonify(response)

app.run(debug = True)