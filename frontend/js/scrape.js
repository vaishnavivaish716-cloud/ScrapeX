async function startScrape(){
 let url=document.getElementById("urlInput").value;
 let status=document.getElementById("status");
 let btn=document.getElementById("scrapeBtn");
 if(!url){alert("URL podu macha");return;}
 btn.innerText="Scraping..."; btn.disabled=true;
 status.innerText="Scraping... wait pannu da";
 try{
  let res=await fetch("/api/scrape",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
  let data=await res.json();
  if(data.success){ status.innerText=`Done! ${data.count} products`; location.href="products.html"; }
  else status.innerText=data.message;
 }catch(e){ status.innerText=e; }
 btn.innerText="Start Scraping"; btn.disabled=false;
}