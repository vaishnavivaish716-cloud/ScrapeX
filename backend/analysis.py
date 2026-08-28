import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import get_connection
def get_summary():
    conn=get_connection(); r=conn.execute("SELECT COUNT(*) as total, AVG(price) as avg_price, AVG(rating) as avg_rating, SUM(reviews) as total_rev FROM products").fetchone(); conn.close()
    return {"total_products":r["total"] or 0, "average_price":round(r["avg_price"] or 0,2), "average_rating":round(r["avg_rating"] or 0,2), "total_reviews":r["total_rev"] or 0}
def get_analytics():
    conn=get_connection(); price=[dict(x) for x in conn.execute("SELECT name, price FROM products ORDER BY price DESC LIMIT 10").fetchall()]; rating=[dict(x) for x in conn.execute("SELECT name, rating FROM products ORDER BY rating DESC LIMIT 10").fetchall()]; conn.close()
    return {"price_distribution":price, "rating_distribution":rating}