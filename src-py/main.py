from flask import Flask, render_template, request, jsonify
from chatbot_camping import chat_bot

app = Flask(__name__)

@app.route("/", methods=["POST"])
def chat():
    user_input = request.form["user_input"]
    response = chat_bot(user_input)
    print(user_input)
    return response

# @app.route("/")
# def index():
#     return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

