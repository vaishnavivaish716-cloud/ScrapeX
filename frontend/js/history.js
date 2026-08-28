// History Page Logic
function loadHistory(){
    let history = JSON.parse(localStorage.getItem('scrapeHistory') || '[]');
    let container = document.getElementById('historyList');
    if(container){
        container.innerHTML = history.map(h => `<div>${h.url} - ${h.date}</div>`).join('');
    }
}
loadHistory();