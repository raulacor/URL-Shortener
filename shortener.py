# Memória temporária para guardar URLs
urls = []

from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
from pyshorteners import Shortener

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html', urls=urls)

@app.route('/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "Nenhuma URL enviada"}), 400

    try:
        shortener = Shortener()
        short_url = shortener.tinyurl.short(url)
        urls.append({"original": url, "short": short_url})
        return jsonify({"short_url": short_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/limpar', methods=['POST'])
def limpar():
    urls.clear()
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)
