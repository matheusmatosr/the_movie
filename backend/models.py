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
        conn.execute("DELETE FROM favorites WHERE imdbID = ?", (imdbID,))
    conn.close()
