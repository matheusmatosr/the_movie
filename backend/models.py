from database import get_db_connection


def add_to_favorites(movie):
    conn = get_db_connection()
    with conn:
        conn.execute(
            """
        INSERT INTO favorites (title, year, imdbID, type, poster)
        VALUES (?, ?, ?, ?, ?)
        """,
            (
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
