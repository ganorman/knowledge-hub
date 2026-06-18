# 🧠 Hub Personal de Conocimiento

Portal personal **100% estático** (HTML + CSS + JavaScript puro) para organizar
prompts, ideas, biblioteca, proyectos, finanzas y aprendizaje.
Sin base de datos, sin backend, sin servicios de pago, sin frameworks.
Diseñado para alojarse gratis en **GitHub Pages**.

![tema claro/oscuro · responsive · búsqueda local](https://img.shields.io/badge/estático-GitHub_Pages-4f6df5)

---

## ✨ Características

- 🎨 Tema **claro / oscuro** (se recuerda en el navegador).
- 🔍 **Buscador global** local (títulos, etiquetas y descripciones) — sin servidor.
- 🗂️ 6 categorías con subcategorías y filtros por chips.
- ⭐ **Favoritos** guardados en el navegador (`localStorage`).
- 📊 Inicio con estadísticas, destacados y últimos añadidos.
- 📱 **Responsive** (móvil y escritorio) con menú lateral.
- ⚡ Carga instantánea: cero dependencias externas, todo offline.

---

## 📁 Estructura del proyecto

```
/
├── index.html              ← App principal (no necesitas tocarla)
├── .nojekyll               ← Indica a GitHub Pages que sirva los archivos tal cual
├── README.md
│
├── assets/
│   ├── css/styles.css      ← Estilos y temas
│   ├── js/data.js          ← ⭐ AQUÍ se añade el contenido (lo único que editas)
│   ├── js/app.js           ← Lógica (routing, búsqueda, favoritos)
│   ├── images/             ← Imágenes propias (opcional)
│   └── icons/              ← Iconos propios (opcional)
│
├── prompts/                ← Archivos de cada categoría
├── ideas/
├── biblioteca/
├── proyectos/
├── finanzas/
├── aprendizaje/
└── search/                 ← Reservada para futuras ampliaciones del buscador
```

> El buscador no necesita la carpeta `search/` para funcionar (la búsqueda se hace
> en memoria desde `data.js`). Se deja preparada por si quieres un índice avanzado.

---

## 🚀 Despliegue en GitHub Pages (gratis)

1. Crea un repositorio nuevo en tu cuenta — por ejemplo en
   **https://github.com/ganorman** llámalo `knowledge-hub`.
2. Sube **todos los archivos** de esta carpeta a la raíz del repositorio:
   ```bash
   git init
   git add .
   git commit -m "Hub personal de conocimiento"
   git branch -M main
   git remote add origin https://github.com/ganorman/knowledge-hub.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages**.
4. En *Build and deployment* elige **Source: Deploy from a branch**.
5. Branch: **main** · carpeta: **/ (root)** · pulsa **Save**.
6. Espera ~1 minuto. Tu hub estará en:
   ```
   https://ganorman.github.io/knowledge-hub/
   ```

> 💡 Si nombras el repositorio `ganorman.github.io`, la URL será directamente
> `https://ganorman.github.io/` (sin subcarpeta).

### Probarlo en local
Abre `index.html` haciendo doble clic — funciona tal cual.
(Opcional, recomendado) sirve la carpeta para evitar restricciones del navegador:
```bash
# Python
python -m http.server 8080
# luego abre http://localhost:8080
```

---

## ➕ Cómo añadir un documento nuevo

Solo editas **`assets/js/data.js`**. Dos pasos:

**1) Copia el archivo** (PDF, XLSX, PPTX, HTML, imagen, MD…) dentro de la carpeta
de su categoría, p. ej. `biblioteca/mi-informe.pdf`.

**2) Añade un objeto** a la lista `DOCS` de `data.js`:

```js
{
  id: "bib-mi-informe",                 // único, sin espacios
  title: "Mi informe trimestral",
  category: "biblioteca",               // id de categoría (ver CATEGORIES)
  subcategory: "PDF",                   // debe existir en esa categoría
  date: "2026-06-17",                   // AAAA-MM-DD
  tags: ["informe", "q2"],
  description: "Resumen de resultados del segundo trimestre.",
  type: "pdf",                          // html|pdf|xlsx|pptx|image|md|link
  file: "biblioteca/mi-informe.pdf",    // ruta relativa o URL
  featured: false                       // true para destacarlo en el inicio
}
```

Guarda, recarga la página y listo. La tarjeta, el buscador, las estadísticas
y los filtros se actualizan solos.

> Los ejemplos `*.xlsx` que vienen incluidos son **referencias de muestra**:
> sustitúyelos copiando tu hoja real con el mismo nombre, o cambia la ruta `file`.

---

## 🎨 Personalizar categorías e iconos

Edita la lista `CATEGORIES` en `assets/js/data.js`.

**Cambiar un icono** → cambia el emoji de `icon`:
```js
{ id: "ideas", name: "Ideas", icon: "💡", ... }
```

**Cambiar el color** de la categoría → campo `color` (hex):
```js
color: "#f5a623"
```

**Añadir una subcategoría** → añádela al array `subcategories`:
```js
subcategories: ["Negocios", "Aplicaciones", "Automatizaciones", "Proyectos futuros", "Nueva"]
```

**Añadir una categoría nueva** → copia un bloque completo y cámbiale `id` (único),
`name`, `icon`, `color`, `description` y `subcategories`. Aparece sola en el menú
lateral y en el dashboard.

### Iconos de tipo de archivo
Se definen en `assets/js/app.js` (objeto `TYPE_ICON`). Puedes cambiar el emoji
de cada tipo (`pdf`, `xlsx`, etc.) ahí.

### Colores del tema
Edita las variables CSS al inicio de `assets/css/styles.css`
(`:root` para claro, `[data-theme="dark"]` para oscuro). El acento principal es
`--accent`.

---

## 🧩 Decisiones técnicas (por qué está hecho así)

| Decisión | Motivo |
|----------|--------|
| App de una sola página con enrutado por `#hash` | Un único HTML que mantener; funciona en GitHub Pages sin configuración. |
| Contenido en `data.js` (objeto JS), no JSON vía `fetch` | Evita errores de CORS al abrir con `file://`; carga síncrona y simple. |
| Búsqueda en memoria sobre el array | Instantánea, sin servidor ni dependencias. |
| Emojis como iconos | Cero dependencias externas; totalmente offline. |
| Tema y favoritos en `localStorage` | Persistencia sin backend. |
| `.nojekyll` | Evita el procesado Jekyll y sirve los archivos tal cual. |

---

## 🔧 Mantenimiento

- **Añadir contenido:** copia el archivo + 1 objeto en `data.js`.
- **Quitar contenido:** borra su objeto de `DOCS` (y el archivo si quieres).
- **Reordenar:** el inicio ordena por fecha automáticamente (`date`).
- **Sin build, sin npm, sin dependencias.** Editar = recargar.

---

Hecho para durar: simple, rápido y fácil de escalar. 🧠
