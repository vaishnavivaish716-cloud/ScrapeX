import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from flask import Blueprint, request, jsonify, Response
from datetime import datetime
import csv, io
from database import get_connection
from scraper import scrape_products
from analysis import get_summary, get_analytics

routes = Blueprint("routes", __name__)

@routes.route("/scrape", methods=["POST"])
def scrape():
    url=request.get_json().get("url")
    products=scrape_products(url)
    conn=get_connection()
    for p in products: conn.execute("INSERT INTO products (name,price,rating,reviews,category,source_url,scraped_at) VALUES (?,?,?,?,?,?,?)",(p["name"],p["price"],p["rating"],p["reviews"],p["category"],p["source_url"],p["scraped_at"]))
    conn.execute("INSERT INTO scraping_history (url,products_count,scraped_at) VALUES (?,?,?)",(url,len(products),datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
    conn.commit(); conn.close()
    return jsonify({"success":True,"count":len(products)})

@routes.route("/products", methods=["GET"])
def get_products(): conn=get_connection(); rows=conn.execute("SELECT * FROM products ORDER BY id DESC").fetchall(); conn.close(); return jsonify([dict(r) for r in rows])
@routes.route("/summary", methods=["GET"])
def summary(): return jsonify(get_summary())
@routes.route("/analytics", methods=["GET"])
def analytics(): return jsonify(get_analytics())
@routes.route("/history", methods=["GET"])
def history(): conn=get_connection(); rows=conn.execute("SELECT * FROM scraping_history ORDER BY id DESC").fetchall(); conn.close(); return jsonify([dict(r) for r in rows])
@routes.route("/products", methods=["DELETE"])
def delete_products(): conn=get_connection(); conn.execute("DELETE FROM products"); conn.commit(); conn.close(); return jsonify({"success":True})
@routes.route("/export/csv", methods=["GET"])
def export_csv():
    conn=get_connection(); rows=conn.execute("SELECT * FROM products").fetchall(); conn.close()
    if not rows: return jsonify({"message":"No data"}),404
    output=io.StringIO(); import csv; writer=csv.DictWriter(output, fieldnames=rows[0].keys()); writer.writeheader(); writer.writerows([dict(r) for r in rows])
    return Response(output.getvalue(), mimetype="text/csv", headers={"Content-Disposition":"attachment;filename=data.csv"})