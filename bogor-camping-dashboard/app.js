const $ = (id) => document.getElementById(id);
const places = window.CAMPING_PLACES || [];
const areas = window.CAMPING_AREAS || [];
let view = "grid";
const fmt = n => new Intl.NumberFormat("id-ID").format(n);
function init(){
  $("totalPlaces").textContent=places.length;
  $("ratedPlaces").textContent=places.filter(p=>p.rating!==null).length;
  $("familyPlaces").textContent=places.filter(p=>p.family).length;
  $("areaFilter").innerHTML=areas.map((a,i)=>`<option value="${i===0?"all":a}">${a}</option>`).join("");
  $("areaChips").innerHTML=areas.slice(1).map(a=>`<button class="area-chip" data-area="${a}">${a}<span>${places.filter(p=>p.area===a).length} tempat terdata →</span></button>`).join("");
  ["searchInput","areaFilter","familyFilter","sortFilter"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",render));
  $("resetBtn").addEventListener("click",()=>{$("searchInput").value="";$("areaFilter").value="all";$("familyFilter").value="all";$("sortFilter").value="rating";render()});
  $("gridView").onclick=()=>setView("grid");$("listView").onclick=()=>setView("list");
  $("areaChips").addEventListener("click",e=>{const b=e.target.closest("[data-area]");if(!b)return;$("areaFilter").value=b.dataset.area;render();$("explore").scrollIntoView({behavior:"smooth"})});
  $("shareBtn").onclick=share;
  render();
}
function setView(v){view=v;$("placesGrid").classList.toggle("list",v==="list");$("gridView").classList.toggle("active",v==="grid");$("listView").classList.toggle("active",v==="list")}
function render(){
  const q=$("searchInput").value.toLowerCase().trim(), area=$("areaFilter").value, fam=$("familyFilter").value, sort=$("sortFilter").value;
  let result=places.filter(p=>{
    const hay=[p.name,p.area,p.subarea,p.kind,...p.tags].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(area==="all"||p.area===area)&&(fam==="all"||(fam==="yes"&&p.family)||(fam==="unknown"&&!p.family));
  });
  result.sort((a,b)=>sort==="name"?a.name.localeCompare(b.name):sort==="reviews"?(b.reviews||-1)-(a.reviews||-1):(b.rating??-1)-(a.rating??-1)||(b.reviews||0)-(a.reviews||0));
  $("resultCount").textContent=`Menampilkan ${result.length} dari ${places.length} tempat`;
  $("emptyState").classList.toggle("hidden",result.length>0);
  $("placesGrid").innerHTML=result.map(card).join("");
  setView(view);
  document.querySelectorAll(".area-chip").forEach(b=>b.classList.toggle("active",b.dataset.area===area));
}
function card(p){
  const rating=p.rating===null?`<span class="unrated">Belum terverifikasi</span>`:`<span class="rating-pill">★ ${p.rating.toFixed(1)}</span>`;
  const review=p.reviews===null?"Jumlah ulasan belum tersedia":`${fmt(p.reviews)} ulasan · ${p.source}`;
  return `<article class="place-card"><div class="card-top"><span class="area-label">${p.area}</span>${rating}</div><div class="card-body"><div><div class="family-flag">${p.family?"Kandidat family-friendly":"Perlu cek kecocokan keluarga"}</div><h3 class="card-title">${p.name}</h3><div class="subarea">⌖ ${p.subarea} · ${p.kind}</div><div class="review-line">${p.rating===null?"":`★ ${p.rating.toFixed(1)} · `}${review}</div></div><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><p class="card-note">${p.notes}</p><div class="card-actions"><a class="map-link" href="${p.maps}" target="_blank" rel="noopener">Buka Google Maps ↗</a><button class="detail-link" onclick="copyPlace('${encodeURIComponent(p.name)}')">Salin nama</button></div></div></article>`;
}
function copyPlace(encoded){const name=decodeURIComponent(encoded);navigator.clipboard?.writeText(name).then(()=>toast("Nama tempat disalin")).catch(()=>toast(name))}
async function share(){const data={title:"Bogor Camping Guide",text:"Direktori camping & glamping keluarga di Bogor",url:location.href};if(navigator.share){try{await navigator.share(data)}catch(e){}}else{try{await navigator.clipboard.writeText(location.href);toast("Link website disalin")}catch(e){toast("Salin URL dari address bar")}}}
let toastTimer;function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
init();