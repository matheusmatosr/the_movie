from database import get_db_connection


def get_next_id():
    """Retorna o próximo ID sequencial baseado no número de registros no banco."""
    conn = get_db_connection()
    result = conn.execute("SELECT COUNT(*) AS total FROM favorites").fetchone()
    conn.close()
    return result["total"] + 1


def add_to_favorites(movie):
    conn = get_db_connection()
    with conn:
        next_id = get_next_id()
        conn.execute(
            """
        INSERT INTO favorites (id, title, year, imdbID, type, poster)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
            (
                next_id,
                movie["Title"],
                movie["Year"],
                movie["imdbID"],
                movie["Type"],
                movie["Poster"],
            ),
        )
    conn.close()


def get_favorites():
    conn = get_db_connection()
    favorites = conn.execute("SELECT * FROM favorites").fetchall()
    conn.close()
    return [dict(row) for row in favorites]


def remove_from_favorites(imdbID):
    conn = get_db_connection()
    with conn:
        # Remove a avaliação associada
        conn.execute(
            "DELETE FROM reviews WHERE favorite_id = (SELECT id FROM favorites WHERE imdbID = ?)",
            (imdbID,),
        )
        # Remove o filme dos favoritos
        conn.execute("DELETE FROM favorites WHERE imdbID = ?", (imdbID,))
    conn.close()


def add_review(favorite_id, name, rating, comment):
    conn = get_db_connection()
    with conn:
        conn.execute(
            """
            INSERT INTO reviews (favorite_id, name, rating, comment)
            VALUES (?, ?, ?, ?)
            """,
            (favorite_id, name, rating, comment),
        )
    conn.close()


def get_review_by_favorite_id(favorite_id):
    conn = get_db_connection()
    review = conn.execute(
        "SELECT * FROM reviews WHERE favorite_id = ?", (favorite_id,)
    ).fetchone()
    conn.close()
    return dict(review) if review else None


def update_review(favorite_id, name, rating, comment):
    conn = get_db_connection()
    with conn:
        conn.execute(
            """
            UPDATE reviews
            SET name = ?, rating = ?, comment = ?
            WHERE favorite_id = ?
            """,
            (name, rating, comment, favorite_id),
        )
    conn.close()
