from flask import Flask, request, jsonify
from flask_cors import CORS
from models import add_to_favorites, get_favorites, remove_from_favorites

app = Flask(__name__)
CORS(app)


@app.route("/favorites", methods=["GET"])
def list_favorites():
    return jsonify(get_favorites())


@app.route("/favorites", methods=["POST"])
def add_favorite():
    movie = request.json
    try:
        add_to_favorites(movie)
        return jsonify({"message": "Filme adicionado aos favoritos!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/favorites/<imdbID>", methods=["DELETE"])
def delete_favorite(imdbID):
    remove_from_favorites(imdbID)
    return jsonify({"message": "Filme removido dos favoritos!"}), 200


if __name__ == "__main__":
    app.run(debug=True)
