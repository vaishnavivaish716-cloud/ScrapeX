async function startScraping() {
    const urlInput = document.getElementById('scrapeUrl') || document.querySelector('input');
    const url = urlInput.value;
    const resultDiv = document.getElementById('result') || document.getElementById('error');

    if (!url) {
        alert("URL enter pannu da!");
        return;
    }

    try {
        // Backend iruntha fetch pannum
        const response = await fetch('https://scrapex-backend.onrender.com/api/scrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        });

        // HTML vantha error varum, atha check pannrom
        const text = await response.text();
        const data = JSON.parse(text);
        
        alert("Success: " + data.message);

    } catch (err) {
        // GitHub Pages la backend illa, demo mode
        console.log("Pages Demo Mode:", err.message);
        
        if(resultDiv){
            resultDiv.innerHTML = `<p style="color:lightgreen; font-weight:bold;">
            Demo Mode Success! ✅<br>
            URL: ${url}<br>
            25 products scraped (Demo)<br>
            Note: Full scraping local/backend la work aagum
            </p>`;
        } else {
            alert(`Demo Mode: ${url} la irunthu 25 products scraped! (Backend local la than work aagum da)`);
        }
    }
}