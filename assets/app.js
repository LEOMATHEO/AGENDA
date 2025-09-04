async function loadCSV(path){
  const resp=await fetch(path);const text=await resp.text();
  const rows=text.split(/\r?\n/).filter(r=>r.trim().length>0);
  const headers=rows[0].split(",");
  return rows.slice(1).map(line=>{const cols=line.split(",");let obj={};headers.forEach((h,i)=>obj[h.trim()]=cols[i]?cols[i].trim():"");return obj;});}
function render(id,data){
  const tbody=document.querySelector(id+" tbody");tbody.innerHTML="";
  data.forEach(r=>{const tr=document.createElement("tr");const siglaTd=document.createElement("td");siglaTd.textContent=r.SIGLA;if(r.SIGLA.includes("CTDIR"))siglaTd.classList.add("sigla-ctdir");if(r.SIGLA.includes("SUREC"))siglaTd.classList.add("sigla-surec");tr.appendChild(siglaTd);["SETOR","TELEFONE","RAMAL","RESPONSAVEL","LOCAL"].forEach(k=>{const td=document.createElement("td");td.textContent=r[k];tr.appendChild(td);});tbody.appendChild(tr);});}
function showTab(tab){document.querySelectorAll(".tab").forEach(s=>s.style.display="none");document.getElementById(tab).style.display="block";}
async function init(){const principal=await loadCSV("RAMAIS-SEFAZ.csv");render("#tablePrincipal",principal);const ss=await loadCSV("Secretario_e_subsecretarios.csv");render("#tableSS",ss);}init();