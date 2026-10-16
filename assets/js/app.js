/* Biblioteca estática: solo contenido público. */
(() => {
'use strict';
const { SITE, CATEGORIES, DOCS } = window.HUB;
const CONTENT = window.HUB_CONTENT || {};
const $ = id => document.getElementById(id);
const app=$('app'), search=$('globalSearch'), sidebar=$('sidebar'), menu=$('menuToggle'), backdrop=$('sidebarBackdrop');
const mobile=matchMedia('(max-width: 860px)');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const date=s=>new Date(s+'T12:00:00').toLocaleDateString('es-DO',{day:'numeric',month:'short',year:'numeric'});
const category=id=>CATEGORIES.find(c=>c.id===id);
const byDate=(a,b)=>b.date.localeCompare(a.date)||a.title.localeCompare(b.title,'es');
const docURL=d=>d.type==='md'?'#/d/'+encodeURIComponent(d.id):d.file;
let favs=[],theme,searchTimer;
try{const saved=JSON.parse(localStorage.getItem('hub.favs'));if(Array.isArray(saved))favs=[...new Set(saved.filter(id=>DOCS.some(d=>d.id===id)))];}catch{}
try{theme=localStorage.getItem('hub.theme');}catch{}
if(!['light','dark'].includes(theme))theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
function announce(message){$('status').textContent=message;}
function save(key,value){try{localStorage.setItem(key,value);return true;}catch{announce('No se pueden guardar preferencias. Se conservarán mientras esta página siga abierta.');return false;}}
function applyTheme(){$('themeToggle').textContent=theme==='dark'?'☀':'☾';$('themeToggle').setAttribute('aria-label',theme==='dark'?'Usar tema claro':'Usar tema oscuro');document.documentElement.dataset.theme=theme;}
function setMenu(open,restore=false){
sidebar.classList.toggle('open',open);backdrop.classList.toggle('show',open);sidebar.inert=mobile.matches&&!open;
menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
if(open)sidebar.querySelector('a').focus();else if(restore)menu.focus();
}
function buildSidebar(){
const links=[['#/','Inicio'],['#/favoritos','Favoritos'],...CATEGORIES.map(c=>['#/c/'+c.id,c.name])];
$('sideNav').innerHTML=links.map(([href,label])=>'<a class="nav-item" href="'+href+'">'+esc(label)+'</a>').join('');
}
const favorite=d=>'<button class="fav-btn" data-fav="'+esc(d.id)+'" aria-pressed="'+favs.includes(d.id)+'" aria-label="'+(favs.includes(d.id)?'Quitar de':'Añadir a')+' favoritos: '+esc(d.title)+'">'+(favs.includes(d.id)?'★':'☆')+'</button>';
function card(d){
return '<article class="doc-card">'+favorite(d)+'<p class="doc-meta">'+esc(category(d.category).name)+' · '+esc(d.subcategory)+'</p><h2 class="doc-title"><a href="'+esc(docURL(d))+'">'+esc(d.title)+'</a></h2><p class="doc-desc">'+esc(d.description)+'</p>'+(d.status?'<span class="review-label">'+esc(d.status)+'</span>':'')+'<div class="doc-foot"><span>'+date(d.date)+'</span><a href="'+esc(docURL(d))+'" aria-label="Leer '+esc(d.title)+'">Leer →</a></div></article>';
}
const grid=list=>list.length?'<div class="cards-grid">'+list.map(card).join('')+'</div>':'<p class="empty">No hay recursos en esta selección.</p>';
const back=(href='#/',label='Inicio')=>'<a class="back-link" href="'+href+'">← '+esc(label)+'</a>';
const head=(title,description)=>'<header class="page-head"><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></header>';
function home(){
const selected=DOCS.filter(d=>d.featured&&!d.status).sort(byDate).slice(0,3);
app.innerHTML=head('Conocimiento para volver a usar','Prompts, ideas y recursos seleccionados por '+SITE.owner+'.')+'<div class="collections">'+CATEGORIES.map(c=>'<a href="#/c/'+c.id+'"><strong>'+esc(c.name)+'</strong><span>'+DOCS.filter(d=>d.category===c.id).length+' recursos</span></a>').join('')+'</div><div class="section-heading"><h2>Para empezar</h2><a href="#/todos">Ver todo</a></div>'+grid(selected)+'<p class="quiet-note">Biblioteca pública. Los favoritos se guardan solo en este navegador.</p>';
}
function collection(id,params){
const aliases={biblioteca:'recursos',aprendizaje:'recursos',proyectos:'recursos',finanzas:'recursos'};
if(aliases[id]){history.replaceState(null,'','#/c/'+aliases[id]);id=aliases[id];}
const cat=category(id);if(!cat)return notFound();
const all=DOCS.filter(d=>d.category===id).sort(byDate),subs=cat.subcategories.filter(s=>all.some(d=>d.subcategory===s));
const requested=params.get('sub'),active=subs.includes(requested)?requested:'',list=active?all.filter(d=>d.subcategory===active):all;
app.innerHTML=back()+head(cat.name,cat.description)+(subs.length>1?'<nav class="chips" aria-label="Filtrar '+esc(cat.name)+'">'+['',...subs].map(s=>'<a class="chip '+(active===s?'active':'')+'" '+(active===s?'aria-current="page"':'')+' href="#/c/'+id+(s?'?sub='+encodeURIComponent(s):'')+'">'+esc(s||'Todos')+'</a>').join('')+'</nav>':'')+'<p class="result-count">'+list.length+(list.length===1?' recurso':' recursos')+'</p>'+grid(list);
}
function results(q){
const terms=norm(q).trim().split(/\s+/).filter(Boolean);
const list=terms.length?DOCS.filter(d=>terms.every(t=>norm([d.title,d.description,d.subcategory,category(d.category).name,...d.tags,CONTENT[d.id]||''].join(' ')).includes(t))).sort(byDate):[];
app.innerHTML=back()+head('Resultados',terms.length?list.length+(list.length===1?' recurso para «':' recursos para «')+q+'».':'Busca por título, tema o contenido.')+(terms.length?grid(list):'');
announce(terms.length?list.length+(list.length===1?' resultado':' resultados'):'Escribe para buscar.');
}
// El texto se escapa antes de dar formato. No se interpreta HTML de las notas.
function inline(text){
return esc(text).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
function markdown(text){
const lines=text.replace(/\r/g,'').split('\n');let html='',i=0,codeIndex=0;
while(i<lines.length){
const line=lines[i];
if(line.startsWith('```')){const code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);html+='<div class="code-block"><button class="copy-code" data-copy="'+codeIndex+++'">Copiar bloque</button><pre><code>'+esc(code.join('\n'))+'</code></pre></div>';i++;continue;}
if(/^\s*\|/.test(line)&&i+1<lines.length&&/^\s*\|?[\s:|-]+\|/.test(lines[i+1])){
const cells=s=>s.trim().replace(/^\||\|$/g,'').split('|').map(v=>v.trim());
html+='<div class="table-wrap"><table><thead><tr>'+cells(line).map(v=>'<th>'+inline(v)+'</th>').join('')+'</tr></thead><tbody>';i+=2;
while(i<lines.length&&/^\s*\|/.test(lines[i]))html+='<tr>'+cells(lines[i++]).map(v=>'<td>'+inline(v)+'</td>').join('')+'</tr>';
html+='</tbody></table></div>';continue;}
if(/^#{1,6}\s/.test(line)){const m=line.match(/^(#{1,6})\s+(.*)/),n=Math.min(m[1].length+1,6);html+='<h'+n+'>'+inline(m[2])+'</h'+n+'>';i++;continue;}
if(/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)){html+='<hr>';i++;continue;}
if(/^>/.test(line)){html+='<blockquote>'+inline(line.replace(/^>\s?/,''))+'</blockquote>';i++;continue;}
if(/^\s*(?:[-*]|\d+\.)\s/.test(line)){
const ordered=/^\s*\d+\./.test(line),tag=ordered?'ol':'ul',pattern=ordered?/^\s*\d+\.\s/:/^\s*[-*]\s/;html+='<'+tag+'>';
while(i<lines.length&&pattern.test(lines[i]))html+='<li>'+inline(lines[i++].replace(pattern,''))+'</li>';
html+='</'+tag+'>';continue;}
if(line.trim()){
const paragraph=[line];i++;
while(i<lines.length&&lines[i].trim()&&!/^(?:#{1,6}\s|>|```|\s*[-*]\s|\s*\d+\.\s|\s*\||\s*([-*_])(?:\s*\1){2,}\s*$)/.test(lines[i]))paragraph.push(lines[i++]);
html+='<p>'+inline(paragraph.join(' '))+'</p>';continue;
}i++;
}
return html;
}
function reader(id){
const d=DOCS.find(d=>d.id===id);if(!d||!Object.hasOwn(CONTENT,id))return notFound();
app.innerHTML=back('#/c/'+d.category,category(d.category).name)+head(d.title,d.description)+'<div class="reader-actions"><button id="copyDocument">Copiar texto completo</button><a href="'+esc(d.file)+'" download>Descargar Markdown</a>'+favorite(d)+'</div>'+(d.status?'<p class="notice">'+esc(d.status)+'</p>':'')+'<article class="reader">'+markdown(CONTENT[id])+'</article>';
$('copyDocument').addEventListener('click',()=>copy(CONTENT[id],$('copyDocument')));
app.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',()=>copy(btn.nextElementSibling.textContent,btn)));
}
async function copy(text,button){
const label=button.textContent;
try{await navigator.clipboard.writeText(text);button.textContent='Copiado';announce('Texto copiado.');setTimeout(()=>{if(button.isConnected)button.textContent=label;},1500);}
catch{announce('No se pudo copiar. Selecciona el texto o descarga el archivo.');button.textContent='Selecciona el texto para copiar';}
}
function notFound(){app.innerHTML=back()+head('No encontramos ese recurso','Vuelve al inicio o usa el buscador.');}
function wireFavorites(){
app.querySelectorAll('[data-fav]').forEach(button=>button.addEventListener('click',()=>{
const id=button.dataset.fav,on=!favs.includes(id);favs=on?[...favs,id]:favs.filter(f=>f!==id);
const persisted=save('hub.favs',JSON.stringify(favs));
if(location.hash==='#/favoritos'){router(false);(app.querySelector('[data-fav]')||app).focus();}
else{button.textContent=on?'★':'☆';button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',(on?'Quitar de':'Añadir a')+' favoritos: '+DOCS.find(d=>d.id===id).title);}
if(persisted)announce(on?'Añadido a favoritos.':'Quitado de favoritos.');
}));
}
function router(moveFocus=true){
clearTimeout(searchTimer);
const [path,query='']=(location.hash||'#/').split('?'),params=new URLSearchParams(query);
if(path==='#/'||!path)home();
else if(path==='#/favoritos')app.innerHTML=back()+head('Favoritos','Guardados solo en este navegador; no se sincronizan entre dispositivos.')+grid(DOCS.filter(d=>favs.includes(d.id)).sort(byDate));
else if(path==='#/todos')app.innerHTML=back()+head('Todos los recursos',DOCS.length+' recursos en la biblioteca pública.')+grid([...DOCS].sort(byDate));
else if(path.startsWith('#/c/'))collection(path.slice(4),params);
else if(path.startsWith('#/d/')){try{reader(decodeURIComponent(path.slice(4)));}catch{notFound();}}
else if(path==='#/buscar'){search.value=params.get('q')||'';results(search.value);}
else notFound();
if(path!=='#/buscar')search.value='';
const current=location.hash.split('?')[0],d=DOCS.find(d=>'#/d/'+encodeURIComponent(d.id)===current);
document.querySelectorAll('.nav-item').forEach(link=>{const selected=link.getAttribute('href')===(d?'#/c/'+d.category:current);link.classList.toggle('active',selected);if(selected)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
wireFavorites();document.title=(app.querySelector('h1')?.textContent||SITE.brand)+' · '+SITE.owner;
if(moveFocus&&document.activeElement!==search)app.focus();if(moveFocus)window.scrollTo({top:0});
}
function init(){
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();app.focus();app.scrollIntoView({block:'start'});});
applyTheme();buildSidebar();setMenu(false);$('brandName').textContent=SITE.brand;$('brandRole').textContent=SITE.owner;
$('themeToggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';applyTheme();save('hub.theme',theme);});
menu.addEventListener('click',()=>setMenu(!sidebar.classList.contains('open'),true));
backdrop.addEventListener('click',()=>setMenu(false,true));
sidebar.addEventListener('click',e=>{const link=e.target.closest('a');if(link){setMenu(false);if(link.hash===location.hash||(!location.hash&&link.hash==='#/'))app.focus();}});
mobile.addEventListener('change',()=>setMenu(false));
search.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{const q=search.value.trim(),next=q?'#/buscar?q='+encodeURIComponent(q):'#/';if(!location.hash.startsWith('#/buscar')&&q)history.pushState(null,'',next);else history.replaceState(null,'',next);router(false);},180);});
search.addEventListener('keydown',e=>{if(e.key==='Enter'){clearTimeout(searchTimer);history.replaceState(null,'',search.value.trim()?'#/buscar?q='+encodeURIComponent(search.value.trim()):'#/');router(false);app.focus();}});
document.addEventListener('keydown',e=>{
if(e.key==='Escape'&&sidebar.classList.contains('open')){e.preventDefault();setMenu(false,true);}
if(e.key==='/'&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)&&!document.activeElement.isContentEditable){e.preventDefault();search.focus();}
if(e.key==='Tab'&&mobile.matches&&sidebar.classList.contains('open')){
const links=[...sidebar.querySelectorAll('a')],active=document.activeElement;
if(e.shiftKey&&active===links[0]){e.preventDefault();menu.focus();}
else if(e.shiftKey&&active===menu){e.preventDefault();links.at(-1).focus();}
else if(!e.shiftKey&&active===links.at(-1)){e.preventDefault();menu.focus();}
else if(!e.shiftKey&&active===menu){e.preventDefault();links[0].focus();}
}});
window.addEventListener('hashchange',()=>router());window.addEventListener('popstate',()=>router());router();
}
init();
})();
