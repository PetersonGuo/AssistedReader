from autocorrect import Speller
from flask import Flask, request

app = Flask(__name__)


@app.route("/autocorrect", methods=["POST"])
def autocorrect():
    spell = Speller(only_replacements=True)
    checked = spell(request.json['text'])
    print(request.json, checked)
    return {"text": checked}

if __name__ == "__main__":
    app.run(debug=True)
