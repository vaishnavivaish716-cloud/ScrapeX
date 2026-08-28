const API_URL = "http://127.0.0.1:5000/api";

async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        updateDashboard(products);
        createCharts(products);

    } catch (error) {
        console.error("Dashboard Error:", error);
    }
}


function updateDashboard(products) {

    const totalProducts = products.length;

    const averagePrice =
        totalProducts > 0
            ? products.reduce((sum, p) => sum + Number(p.price || 0), 0) / totalProducts
            : 0;

    const averageRating =
        totalProducts > 0
            ? products.reduce((sum, p) => sum + Number(p.rating || 0), 0) / totalProducts
            : 0;

    const totalReviews =
        products.reduce((sum, p) => sum + Number(p.reviews || 0), 0);


    document.getElementById("totalProducts").textContent =
        totalProducts;

    document.getElementById("averagePrice").textContent =
        "₹" + Math.round(averagePrice).toLocaleString("en-IN");

    document.getElementById("averageRating").textContent =
        averageRating.toFixed(1);

    document.getElementById("totalReviews").textContent =
        totalReviews.toLocaleString("en-IN");


    displayTopProducts(products);
}


function displayTopProducts(products) {

    const container = document.getElementById("topProducts");

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = "<p>No data yet. Start a scrape.</p>";
        return;
    }

    const sortedProducts = [...products]
        .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
        .slice(0, 5);

    container.innerHTML = sortedProducts.map(product => `
        <div class="product-item">
            <strong>${product.name}</strong>
            <span>₹${Number(product.price).toLocaleString("en-IN")}</span>
            <span>⭐ ${product.rating}</span>
        </div>
    `).join("");
}


function createCharts(products) {

    if (typeof Chart === "undefined") {
        console.log("Chart.js not loaded");
        return;
    }

    const priceCanvas = document.getElementById("priceChart");
    const ratingCanvas = document.getElementById("ratingChart");

    if (!priceCanvas || !ratingCanvas) return;


    new Chart(priceCanvas, {
        type: "bar",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: "Price",
                data: products.map(p => p.price),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });


    new Chart(ratingCanvas, {
        type: "bar",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: "Rating",
                data: products.map(p => p.rating),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});