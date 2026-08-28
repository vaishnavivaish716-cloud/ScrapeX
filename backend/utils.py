import csv
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def save_to_csv(products, filename="scraped_data.csv"):
    path = os.path.join(BASE_DIR, "data", filename)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=products[0].keys())
        writer.writeheader()
        writer.writerows(products)