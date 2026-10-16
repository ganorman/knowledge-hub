// Vista previa de la lista pública. Nunca sirve respaldos, configuración ni auditorías.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/data.js'),'utf8'),ctx);
const allowed=new Set(['index.html','assets/css/styles.css','assets/js/data.js','assets/js/content.js','assets/js/app.js',...ctx.window.HUB.DOCS.map(d=>d.file)]);
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.md':'text/plain'};
http.createServer((req,res)=>{
 let file;try{file=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html';}catch{res.writeHead(400).end();return;}
 if(!allowed.has(file)){res.writeHead(404).end('No encontrado');return;}
 res.writeHead(200,{'Content-Type':(mime[path.extname(file)]||'application/octet-stream')+'; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 fs.createReadStream(path.join(root,file)).pipe(res);
}).listen(8765,'127.0.0.1',()=>console.log('Vista previa: http://127.0.0.1:8765'));
