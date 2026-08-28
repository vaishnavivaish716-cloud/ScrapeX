let allProducts=[];
async function loadProducts(){
 let res=await fetch("/api/products");
 allProducts=await res.json();
 render(allProducts);
}
function render(data){
 document.querySelector("#productTable tbody").innerHTML=data.map(p=>`<tr><td>${p.name}</td><td>₹${p.price}</td><td>${p.rating}</td><td>${p.category}</td></tr>`).join("");
}
document.getElementById("searchInput")?.addEventListener("input",(e)=>{
 let v=e.target.value.toLowerCase();
 render(allProducts.filter(p=>p.name.toLowerCase().includes(v)));
});
function exportCSV(){ window.location="/api/export/csv"; }
async function deleteAll(){ 
 if(confirm("Delete all?")){ 
   await fetch("/api/products",{method:"DELETE"}); 
   loadProducts(); 
 } 
}
loadProducts();