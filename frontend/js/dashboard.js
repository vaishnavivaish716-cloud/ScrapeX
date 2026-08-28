async function loadCharts(){
  let res = await fetch("/api/analytics");
  let data = await res.json();
  let prices = data.price_distribution.slice(0,5);
  let ratings = data.rating_distribution.slice(0,5);

  new Chart(document.getElementById("priceChart"), {
    type: 'bar',
    data: { labels: prices.map(p=>p.name.substring(0,15)), datasets: [{ label: 'Price', data: prices.map(p=>p.price), backgroundColor: '#38bdf8' }] },
    options: { responsive: true, maintainAspectRatio: false, plugins:{legend:{labels:{color:'white'}}}, scales:{x:{ticks:{color:'white'}}, y:{ticks:{color:'white'}}} }
  });
  new Chart(document.getElementById("ratingChart"), {
    type: 'doughnut',
    data: { labels: ratings.map(r=>r.name.substring(0,15)), datasets: [{ data: ratings.map(r=>r.rating), backgroundColor: ['#3b82f6','#38bdf8','#60a5fa','#93c5fd','#cbd5e1'] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins:{legend:{labels:{color:'white'}}} }
  });
}
loadCharts();