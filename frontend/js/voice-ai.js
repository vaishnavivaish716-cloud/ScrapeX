// ScrapeX Voice AI - Meta AI Style
let isListening = false;
let recognition;

// Floating Button Create
document.addEventListener("DOMContentLoaded", () => {
    let btn = document.createElement("div");
    btn.innerHTML = `
    <div id="voiceBtn" style="position:fixed;bottom:25px;right:25px;width:60px;height:60px;background:#38bdf8;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 15px rgba(56,189,248,0.5);z-index:9999;font-size:28px;transition:0.3s;">🎙️</div>
    <div id="voiceBox" style="display:none;position:fixed;bottom:100px;right:25px;width:300px;background:#1e293b;border-radius:12px;padding:15px;z-index:9999;box-shadow:0 5px 20px black;">
        <h4 style="color:#38bdf8;margin-bottom:10px;">ScrapeX AI 🎧</h4>
        <p id="voiceStatus" style="font-size:13px;color:#94a3b8;">Mic ah click pannu, pesu da...</p>
        <p id="voiceQ" style="margin-top:10px;color:white;font-weight:bold;"></p>
        <p id="voiceA" style="margin-top:8px;color:#22c55e;"></p>
    </div>`;
    document.body.appendChild(btn);

    document.getElementById("voiceBtn").onclick = startVoice;
});

function startVoice() {
    let status = document.getElementById("voiceStatus");
    let box = document.getElementById("voiceBox");
    box.style.display = "block";

    if (!('webkitSpeechRecognition' in window)) {
        status.innerText = "Browser support illa da, Chrome la try pannu";
        return;
    }

    if (isListening) {
        recognition.stop();
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN"; // Tamil + English mix ketkum
    recognition.start();
    isListening = true;
    document.getElementById("voiceBtn").style.background = "#ef4444";
    document.getElementById("voiceBtn").innerHTML = "🔴";
    status.innerText = "Kekuren da... Pesu!";

    recognition.onresult = async (e) => {
        let query = e.results[0][0].transcript;
        document.getElementById("voiceQ").innerText = "You: " + query;
        isListening = false;
        document.getElementById("voiceBtn").style.background = "#38bdf8";
        document.getElementById("voiceBtn").innerHTML = "🎙️";
        status.innerText = "Yosikuren...";

        // AI Answer logic
        let res = await fetch("/api/summary");
        let data = await res.json();
        let answer = "";

        let q = query.toLowerCase();
        if (q.includes("total") || q.includes("ethanai")) {
            answer = `Unkita total ${data.total_products} products irukku da.`;
        } else if (q.includes("price") || q.includes("vili")) {
            answer = `Average price ${data.average_price} rooba da.`;
        } else if (q.includes("rating")) {
            answer = `Average rating ${data.average_rating} star da, sema product!`;
        } else if (q.includes("scrape")) {
            answer = `Scrape page ku poi Start Scraping click pannu da.`;
        } else if (q.includes("hi") || q.includes("hello") || q.includes("vanakkam")) {
            answer = `Vanakkam da macha! Naan ScrapeX AI. Enna venum kelu.`;
        } else {
            answer = `Puriyala da, aana un kitta ${data.total_products} products irukku, average price ${data.average_price} nu theriyuthu.`;
        }

        document.getElementById("voiceA").innerText = "AI: " + answer;
        status.innerText = "Mic click panni thirumba pesu";

        // Voice la pesum
        let speech = new SpeechSynthesisUtterance(answer);
        speech.lang = "en-IN";
        window.speechSynthesis.speak(speech);
    };

    recognition.onend = () => {
        isListening = false;
        document.getElementById("voiceBtn").style.background = "#38bdf8";
        document.getElementById("voiceBtn").innerHTML = "🎙️";
    };
}