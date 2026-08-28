fetch("/api/summary").then(r=>r.json()).then(d=>{
 let el=document.getElementById("summaryCards");
 if(el) el.innerHTML=`<div class="card"><h3>${d.total_products}</h3><p>Total</p></div><div class="card"><h3>₹${d.average_price}</h3><p>Avg Price</p></div><div class="card"><h3>${d.average_rating}</h3><p>Rating</p></div><div class="card"><h3>${d.total_reviews}</h3><p>Reviews</p></div>`;
});