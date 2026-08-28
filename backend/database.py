import sqlite3, os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "database", "scraping.db")
def get_connection():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
def init_db():
    conn = get_connection()
    conn.execute("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, rating REAL, reviews INTEGER, category TEXT, source_url TEXT, scraped_at TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS scraping_history (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, products_count INTEGER, scraped_at TEXT)")
    conn.commit(); conn.close()