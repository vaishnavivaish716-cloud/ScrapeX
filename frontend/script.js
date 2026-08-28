// ScrapeX Main Script
document.addEventListener('DOMContentLoaded', () => {
    console.log("ScrapeX Dashboard Loaded");
    fetchData();
});

async function fetchData() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();
        console.log(data);
    } catch(e) {
        console.log("Local demo mode - API not connected");
    }
}

function startScraping() {
    alert("Scraping Started! Check backend terminal.");
}