import json
import os
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
from pyshorteners import Shortener

app = Flask(__name__)
CORS(app)

DATA_FILE = "urls.json"

if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        urls = json.load(f)
else:
    urls = []

def save_urls():
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(urls, f, ensure_ascii=False, indent=4)

@app.route('/')
def home():
    return render_template('index.html', urls=urls, admin=False)

@app.route('/admin')
def adm():
    return render_template('index.html', urls=urls, admin=True)

@app.route('/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL not found"}), 400

    try:
        shortener = Shortener()
        short_url = shortener.tinyurl.short(url)

        new_entry = {"original": url, "short": short_url}
        urls.append(new_entry)
        save_urls()  

        return jsonify({"short_url": short_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clean', methods=['POST'])
def clean():
    urls.clear()
    save_urls()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)