import sqlite3


# Função para criar a conexão com o banco de dados
def get_db_connection():
    conn = sqlite3.connect("movies.db")
    conn.row_factory = sqlite3.Row  # Para retornar resultados no formato de dicionário
    return conn


def init_db():
    conn = get_db_connection()
    with conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                year TEXT NOT NULL,
                imdbID TEXT UNIQUE NOT NULL,
                type TEXT NOT NULL,
                poster TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                favorite_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 10),
                comment TEXT NOT NULL,
                FOREIGN KEY (favorite_id) REFERENCES favorites(id) ON DELETE CASCADE
            )
            """
        )
    conn.close()


# Inicializa o banco de dados ao importar
init_db()
