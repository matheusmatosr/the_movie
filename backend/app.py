from flask import Flask, request, jsonify
from flask_cors import CORS
from models import add_to_favorites, get_favorites, remove_from_favorites
from models import add_review, get_review_by_favorite_id, update_review

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


@app.route("/reviews/<int:favorite_id>", methods=["GET"])
def get_review(favorite_id):
    review = get_review_by_favorite_id(favorite_id)
    if review:
        return jsonify(review), 200
    return jsonify({"message": "Nenhuma avaliação encontrada"}), 404


@app.route("/reviews", methods=["POST"])
def create_review():
    data = request.json
    try:
        add_review(data["favorite_id"], data["name"], data["rating"], data["comment"])
        return jsonify({"message": "Avaliação salva com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/reviews/<int:favorite_id>", methods=["PUT"])
def edit_review(favorite_id):
    data = request.json
    try:
        update_review(favorite_id, data["name"], data["rating"], data["comment"])
        return jsonify({"message": "Avaliação atualizada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
