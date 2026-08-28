import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "database" / "scraping.db"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

products = [
    ("iPhone 15", 69999, 4.5, 1250),
    ("Samsung Galaxy S24", 64999, 4.4, 980),
    ("OnePlus 12", 56999, 4.3, 750),
    ("Redmi Note 13", 18999, 4.2, 620),
    ("Realme 12 Pro", 24999, 4.1, 450)
]

for name, price, rating, reviews in products:
    cursor.execute(
        "INSERT INTO products (name, price, rating, reviews) VALUES (?, ?, ?, ?)",
        (name, price, rating, reviews)
    )

conn.commit()
conn.close()

print("5 products added successfully")