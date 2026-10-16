// Regenera el texto legible y buscable; solo incluye archivos del catálogo.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8'), ctx);
const hub = ctx.window.HUB;
const ids = new Set();
const content = {};
for (const d of hub.DOCS) {
  if (ids.has(d.id)) throw new Error('ID repetido: ' + d.id);
  ids.add(d.id);
  const category = hub.CATEGORIES.find(c => c.id === d.category);
  if (!category || !category.subcategories.includes(d.subcategory)) throw new Error('Categoría inválida: ' + d.id);
  if (!d.file || /^(?:[a-z]+:|\/|#)/i.test(d.file)) throw new Error('Se requiere un archivo local: ' + d.id);
  const file = path.resolve(root, d.file);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) throw new Error('Archivo ausente o fuera del proyecto: ' + d.file);
  if (d.type === 'md') content[d.id] = fs.readFileSync(file, 'utf8');
}
fs.writeFileSync(path.join(root, 'assets/js/content.js'), '/* Generado por tools/build-content.cjs. No editar. */\nwindow.HUB_CONTENT = ' + JSON.stringify(content, null, 2) + ';\n');
console.log(JSON.stringify({ documentos: ids.size, textos: Object.keys(content).length, categorias: hub.CATEGORIES.length }));
