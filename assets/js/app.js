/* ============================================================
   app.js — Lógica del Hub (Vanilla JS, sin dependencias)
   Maneja: tema, enrutado por hash, render, búsqueda y favoritos.
   ============================================================ */
(function () {
  "use strict";

  const { CATEGORIES, DOCS } = window.HUB;
  const app = document.getElementById("app");

  /* Iconos por tipo de documento */
  const TYPE_ICON = {
    html: "🌐", pdf: "📕", xlsx: "📊", pptx: "📽️",
    image: "🖼️", md: "📝", link: "🔗"
  };
  const TYPE_LABEL = {
    html: "HTML", pdf: "PDF", xlsx: "Excel", pptx: "PowerPoint",
    image: "Imagen", md: "Markdown", link: "Enlace"
  };

  /* ---------- Utilidades ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const catById = (id) => CATEGORIES.find((c) => c.id === id);
  const fmtDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  };
  const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

  /* ---------- Favoritos (localStorage) ---------- */
  const FAV_KEY = "hub.favs";
  const getFavs = () => {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch { return []; }
  };
  const isFav = (id) => getFavs().includes(id);
  const toggleFav = (id) => {
    const favs = getFavs();
    const i = favs.indexOf(id);
    if (i === -1) favs.push(id); else favs.splice(i, 1);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return i === -1;
  };

  /* ---------- Tema (localStorage) ---------- */
  const THEME_KEY = "hub.theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const btn = $("#themeToggle");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /* ---------- Barra lateral ---------- */
  function buildSidebar() {
    const nav = $("#sideNav");
    let html = `
      <div class="nav-item" data-route="#/"><span class="ico">🏠</span> Inicio</div>
      <div class="nav-item" data-route="#/favoritos"><span class="ico">⭐</span> Favoritos</div>
      <div class="nav-sep"></div>`;
    html += CATEGORIES.map((c) => `
      <div class="nav-item" data-route="#/c/${c.id}">
        <span class="ico">${c.icon}</span> ${esc(c.name)}
      </div>`).join("");
    nav.innerHTML = html;

    nav.querySelectorAll(".nav-item").forEach((el) => {
      el.addEventListener("click", () => {
        location.hash = el.dataset.route;
        closeSidebar();
      });
    });
  }
  function highlightNav() {
    const h = location.hash || "#/";
    document.querySelectorAll(".nav-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.route === h ||
        (h.startsWith("#/c/") && el.dataset.route === h));
    });
  }
  const sidebar = $("#sidebar");
  const backdrop = $("#sidebarBackdrop");
  function openSidebar() { sidebar.classList.add("open"); backdrop.classList.add("show"); }
  function closeSidebar() { sidebar.classList.remove("open"); backdrop.classList.remove("show"); }

  /* ---------- Componentes de render ---------- */
  function favBtn(id) {
    return `<button class="fav-btn ${isFav(id) ? "on" : ""}" data-fav="${id}"
      aria-label="Favorito" title="Marcar como favorito">${isFav(id) ? "⭐" : "☆"}</button>`;
  }

  function docCard(d) {
    const cat = catById(d.category);
    return `
      <article class="doc-card">
        ${favBtn(d.id)}
        <div class="doc-top">
          <span class="doc-type" title="${TYPE_LABEL[d.type] || d.type}">${TYPE_ICON[d.type] || "📄"}</span>
          <div class="doc-head">
            <h3 class="doc-title">${esc(d.title)}</h3>
            <div class="doc-cat">${cat ? cat.icon + " " + esc(cat.name) : ""} · ${esc(d.subcategory || "")}</div>
          </div>
        </div>
        <p class="doc-desc">${esc(d.description || "")}</p>
        <div class="doc-tags">
          ${(d.tags || []).map((t) => `<span class="tag" data-tag="${esc(t)}">#${esc(t)}</span>`).join("")}
        </div>
        <div class="doc-foot">
          <span>🕓 ${fmtDate(d.date)}</span>
          <a class="open" href="${esc(d.file)}" ${d.file.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>Abrir →</a>
        </div>
      </article>`;
  }

  function docsGrid(list) {
    if (!list.length) return emptyState("No hay documentos aquí todavía.");
    return `<div class="cards-grid">${list.map(docCard).join("")}</div>`;
  }

  function emptyState(msg, sub) {
    return `<div class="empty">
      <div class="big">🗂️</div>
      <p>${esc(msg)}</p>
      ${sub ? `<p style="font-size:13px">${esc(sub)}</p>` : ""}
    </div>`;
  }

  /* ---------- Vistas ---------- */
  function viewHome() {
    const total = DOCS.length;
    const favCount = getFavs().length;
    const latest = [...DOCS].sort(byDateDesc).slice(0, 6);
    const featured = DOCS.filter((d) => d.featured).slice(0, 6);
    const lastUpdate = latest[0] ? fmtDate(latest[0].date) : "—";

    const stats = `
      <div class="stats-grid">
        <div class="stat"><div class="stat-num">${total}</div><div class="stat-label">Documentos</div></div>
        <div class="stat"><div class="stat-num">${CATEGORIES.length}</div><div class="stat-label">Categorías</div></div>
        <div class="stat"><div class="stat-num">${favCount}</div><div class="stat-label">Favoritos</div></div>
        <div class="stat"><div class="stat-num" style="font-size:18px">${lastUpdate}</div><div class="stat-label">Última actualización</div></div>
      </div>`;

    const quick = `
      <div class="quick-list">
        ${CATEGORIES.map((c) => `
          <div class="quick-item" data-route="#/c/${c.id}">
            <span class="ico">${c.icon}</span><span class="lbl">${esc(c.name)}</span>
          </div>`).join("")}
      </div>`;

    const catCards = `
      <div class="cards-grid">
        ${CATEGORIES.map((c) => {
          const n = DOCS.filter((d) => d.category === c.id).length;
          return `
          <div class="cat-card" data-route="#/c/${c.id}">
            <span class="cat-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</span>
            <h3>${esc(c.name)}</h3>
            <p>${esc(c.description)}</p>
            <div class="cat-meta">
              <span class="cat-count">${n} doc${n === 1 ? "" : "s"}</span>
              <span>Abrir →</span>
            </div>
          </div>`;
        }).join("")}
      </div>`;

    app.innerHTML = `
      <div class="page-head">
        <div class="page-eyebrow">Panel principal</div>
        <h1 class="page-title">👋 Tu Hub de Conocimiento</h1>
        <p class="page-desc">Todo tu conocimiento personal en un solo lugar: prompts, ideas, biblioteca, proyectos, finanzas y aprendizaje.</p>
      </div>

      ${stats}

      <div class="section-title">Accesos rápidos</div>
      ${quick}

      <div class="section-title">Categorías</div>
      ${catCards}

      <div class="section-title">⭐ Destacados</div>
      ${featured.length ? `<div class="cards-grid">${featured.map(docCard).join("")}</div>`
        : emptyState("Marca documentos como destacados con featured: true en data.js.")}

      <div class="section-title">🆕 Últimos añadidos</div>
      <div class="cards-grid">${latest.map(docCard).join("")}</div>
    `;
    wireRouteEls();
  }

  function viewCategory(id) {
    const cat = catById(id);
    if (!cat) return viewNotFound();
    const all = DOCS.filter((d) => d.category === id).sort(byDateDesc);

    // Subcategoría activa desde el hash: #/c/prompts?sub=Claude
    const params = new URLSearchParams((location.hash.split("?")[1]) || "");
    const activeSub = params.get("sub") || "all";
    const list = activeSub === "all" ? all : all.filter((d) => d.subcategory === activeSub);

    const chips = `
      <div class="chips">
        <span class="chip ${activeSub === "all" ? "active" : ""}" data-sub="all">Todas</span>
        ${cat.subcategories.map((s) => `
          <span class="chip ${activeSub === s ? "active" : ""}" data-sub="${esc(s)}">${esc(s)}</span>`).join("")}
      </div>`;

    const lastUpd = all[0] ? fmtDate(all[0].date) : "—";

    app.innerHTML = `
      <div class="back-link" data-route="#/">← Inicio</div>
      <div class="page-head">
        <div class="page-eyebrow">Categoría</div>
        <h1 class="page-title"><span class="cat-icon" style="width:40px;height:40px;font-size:22px;margin:0;background:${cat.color}22;color:${cat.color}">${cat.icon}</span> ${esc(cat.name)}</h1>
        <p class="page-desc">${esc(cat.description)}</p>
        <p class="page-desc" style="font-size:12.5px;color:var(--text-faint);margin-top:6px">
          ${all.length} documento${all.length === 1 ? "" : "s"} · Última actualización: ${lastUpd}
        </p>
      </div>
      ${chips}
      ${docsGrid(list)}
    `;

    app.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => {
      const sub = c.dataset.sub;
      location.hash = sub === "all" ? `#/c/${id}` : `#/c/${id}?sub=${encodeURIComponent(sub)}`;
    }));
    wireRouteEls();
  }

  function viewFavorites() {
    const favs = getFavs();
    const list = DOCS.filter((d) => favs.includes(d.id)).sort(byDateDesc);
    app.innerHTML = `
      <div class="back-link" data-route="#/">← Inicio</div>
      <div class="page-head">
        <div class="page-eyebrow">Colección</div>
        <h1 class="page-title">⭐ Favoritos</h1>
        <p class="page-desc">Accesos rápidos al contenido que marcaste como importante. Se guardan en este navegador.</p>
      </div>
      ${list.length ? docsGrid(list)
        : emptyState("Aún no tienes favoritos.", "Pulsa la estrella ☆ en cualquier tarjeta para añadirlo aquí.")}
    `;
    wireRouteEls();
  }

  function viewSearch(q) {
    const query = (q || "").trim().toLowerCase();
    let list = [];
    if (query) {
      list = DOCS.filter((d) => {
        const hay = [
          d.title, d.description, d.subcategory,
          (catById(d.category) || {}).name,
          (d.tags || []).join(" ")
        ].join(" ").toLowerCase();
        return query.split(/\s+/).every((term) => hay.includes(term));
      }).sort(byDateDesc);
    }
    app.innerHTML = `
      <div class="back-link" data-route="#/">← Inicio</div>
      <div class="page-head">
        <div class="page-eyebrow">Búsqueda</div>
        <h1 class="page-title">🔍 Resultados</h1>
        <p class="page-desc">${query
          ? `${list.length} resultado${list.length === 1 ? "" : "s"} para “${esc(q)}”.`
          : "Escribe en el buscador para encontrar documentos por título, etiquetas o descripción."}</p>
      </div>
      ${query && !list.length
        ? emptyState("Sin coincidencias.", "Prueba con otra palabra o una etiqueta.")
        : docsGrid(list)}
    `;
    wireRouteEls();
  }

  function viewNotFound() {
    app.innerHTML = `
      <div class="back-link" data-route="#/">← Inicio</div>
      ${emptyState("Página no encontrada.", "El enlace no corresponde a ninguna sección.")}`;
    wireRouteEls();
  }

  /* ---------- Conexión de elementos con data-route / data-fav / data-tag ---------- */
  function wireRouteEls() {
    app.querySelectorAll("[data-route]").forEach((el) =>
      el.addEventListener("click", (e) => {
        if (e.target.closest("[data-fav]") || e.target.closest("a")) return;
        location.hash = el.dataset.route;
      }));

    app.querySelectorAll("[data-fav]").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const on = toggleFav(btn.dataset.fav);
        btn.classList.toggle("on", on);
        btn.textContent = on ? "⭐" : "☆";
        if ((location.hash || "").startsWith("#/favoritos")) router();
      }));

    app.querySelectorAll("[data-tag]").forEach((t) =>
      t.addEventListener("click", (e) => {
        e.stopPropagation();
        const term = t.dataset.tag;
        $("#globalSearch").value = term;
        location.hash = "#/buscar?q=" + encodeURIComponent(term);
      }));
  }

  /* ---------- Enrutador ---------- */
  function router() {
    const hash = location.hash || "#/";
    const [path, qs] = hash.split("?");

    if (path === "#/" || path === "") viewHome();
    else if (path === "#/favoritos") viewFavorites();
    else if (path.startsWith("#/c/")) viewCategory(path.slice(4));
    else if (path === "#/buscar") {
      const q = new URLSearchParams(qs || "").get("q") || "";
      $("#globalSearch").value = q;
      viewSearch(q);
    } else viewNotFound();

    highlightNav();
    app.focus();
    window.scrollTo({ top: 0 });
  }

  /* ---------- Buscador global (en vivo) ---------- */
  function initSearch() {
    const input = $("#globalSearch");
    let t;
    input.addEventListener("input", () => {
      clearTimeout(t);
      const q = input.value.trim();
      t = setTimeout(() => {
        if (q) location.hash = "#/buscar?q=" + encodeURIComponent(q);
        else if ((location.hash || "").startsWith("#/buscar")) location.hash = "#/";
      }, 140);
    });
    // Atajo "/" para enfocar
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input) {
        e.preventDefault(); input.focus();
      }
      if (e.key === "Escape") { input.blur(); }
    });
  }

  /* ---------- Arranque ---------- */
  function init() {
    initTheme();
    buildSidebar();
    initSearch();
    $("#themeToggle").addEventListener("click", toggleTheme);
    $("#menuToggle").addEventListener("click", openSidebar);
    backdrop.addEventListener("click", closeSidebar);
    window.addEventListener("hashchange", router);
    router();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
