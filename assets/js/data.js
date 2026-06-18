/* ============================================================
   data.js — ÚNICA FUENTE DE CONTENIDO DEL HUB
   ------------------------------------------------------------
   Para añadir un documento: copia un objeto de la lista DOCS,
   pégalo y edítalo. Eso es todo. No hay base de datos.

   Campos de cada documento:
     id          (texto único, sin espacios)
     title       Título visible
     category    id de categoría (ver CATEGORIES abajo)
     subcategory Nombre exacto de una subcategoría de esa categoría
     date        Fecha "AAAA-MM-DD" (se usa para "últimos" y "actualización")
     tags        Lista de etiquetas (se buscan)
     description Descripción breve (se busca)
     type        html | pdf | xlsx | pptx | image | md | link
     file        Ruta al archivo o URL (lo que abre la tarjeta)
     featured    true para destacarlo en el inicio (opcional)

   Para añadir una CATEGORÍA o SUBCATEGORÍA: edita CATEGORIES.
   Para cambiar un icono: cambia el emoji de "icon".
   ============================================================ */

window.HUB = {

  /* ---------- CATEGORÍAS ---------- */
  CATEGORIES: [
    {
      id: "prompts",
      name: "Prompts IA",
      icon: "🤖",
      color: "#4f6df5",
      description: "Plantillas y prompts reutilizables para modelos de IA.",
      subcategories: ["ChatGPT", "Claude", "Gemini", "Automatización", "Análisis de documentos", "Investigación"]
    },
    {
      id: "ideas",
      name: "Ideas",
      icon: "💡",
      color: "#f5a623",
      description: "Chispas de negocio, apps y proyectos por explorar.",
      subcategories: ["Negocios", "Aplicaciones", "Automatizaciones", "Proyectos futuros"]
    },
    {
      id: "biblioteca",
      name: "Biblioteca",
      icon: "📚",
      color: "#7c5cff",
      description: "Documentos, plantillas y archivos de referencia.",
      subcategories: ["HTML", "PDF", "PowerPoint", "Excel", "Documentos"]
    },
    {
      id: "proyectos",
      name: "Proyectos",
      icon: "🎯",
      color: "#22b07d",
      description: "Seguimiento de iniciativas personales y profesionales.",
      subcategories: ["Activos", "En pausa", "Finalizados"]
    },
    {
      id: "finanzas",
      name: "Finanzas",
      icon: "💰",
      color: "#16a34a",
      description: "Presupuesto, metas y seguimiento económico.",
      subcategories: ["Presupuesto", "Metas", "Seguimiento"]
    },
    {
      id: "aprendizaje",
      name: "Aprendizaje",
      icon: "📖",
      color: "#e0567a",
      description: "Cursos, resúmenes, notas y referencias de estudio.",
      subcategories: ["Cursos", "Resúmenes", "Notas", "Referencias"]
    }
  ],

  /* ---------- DOCUMENTOS (contenido inicial de ejemplo) ---------- */
  DOCS: [
    {
      id: "prompt-claude-resumen",
      title: "Resumen ejecutivo de documentos",
      category: "prompts",
      subcategory: "Claude",
      date: "2026-06-12",
      tags: ["resumen", "documentos", "productividad"],
      description: "Prompt para convertir cualquier documento largo en un resumen ejecutivo con puntos clave y acciones.",
      type: "md",
      file: "prompts/claude-resumen-ejecutivo.md",
      featured: true
    },
    {
      id: "prompt-chatgpt-correos",
      title: "Redactor de correos profesionales",
      category: "prompts",
      subcategory: "ChatGPT",
      date: "2026-06-10",
      tags: ["email", "redacción", "trabajo"],
      description: "Genera correos claros y con el tono adecuado a partir de unas pocas notas.",
      type: "md",
      file: "prompts/chatgpt-correos.md"
    },
    {
      id: "prompt-auto-n8n",
      title: "Diseñar flujos de automatización",
      category: "prompts",
      subcategory: "Automatización",
      date: "2026-06-05",
      tags: ["n8n", "make", "workflow", "automatización"],
      description: "Prompt para esbozar un flujo de automatización paso a paso a partir de un objetivo.",
      type: "md",
      file: "prompts/automatizacion-flujos.md"
    },
    {
      id: "idea-app-habitos",
      title: "App de seguimiento de hábitos minimalista",
      category: "ideas",
      subcategory: "Aplicaciones",
      date: "2026-06-14",
      tags: ["app", "hábitos", "minimalismo"],
      description: "Concepto de app local-first sin cuentas, basada en una cuadrícula de hábitos diaria.",
      type: "md",
      file: "ideas/app-habitos.md",
      featured: true
    },
    {
      id: "idea-negocio-microsaas",
      title: "Micro-SaaS de plantillas para freelancers",
      category: "ideas",
      subcategory: "Negocios",
      date: "2026-06-08",
      tags: ["saas", "freelance", "negocio"],
      description: "Idea de negocio para vender packs de plantillas (contratos, propuestas) por suscripción.",
      type: "md",
      file: "ideas/microsaas-plantillas.md"
    },
    {
      id: "bib-plantilla-html",
      title: "Plantilla de página de aterrizaje",
      category: "biblioteca",
      subcategory: "HTML",
      date: "2026-06-11",
      tags: ["html", "landing", "plantilla"],
      description: "Landing page de una sola columna lista para personalizar.",
      type: "html",
      file: "biblioteca/landing-plantilla.html",
      featured: true
    },
    {
      id: "bib-presupuesto-xlsx",
      title: "Hoja de presupuesto mensual",
      category: "biblioteca",
      subcategory: "Excel",
      date: "2026-06-03",
      tags: ["excel", "presupuesto", "plantilla"],
      description: "Plantilla de Excel para controlar ingresos y gastos por categorías.",
      type: "xlsx",
      file: "biblioteca/presupuesto-mensual.xlsx"
    },
    {
      id: "proj-hub-personal",
      title: "Hub Personal de Conocimiento",
      category: "proyectos",
      subcategory: "Activos",
      date: "2026-06-17",
      tags: ["web", "github-pages", "personal"],
      description: "Este mismo portal: un hub estático de conocimiento alojado en GitHub Pages.",
      type: "link",
      file: "#/",
      featured: true
    },
    {
      id: "proj-blog",
      title: "Blog técnico personal",
      category: "proyectos",
      subcategory: "En pausa",
      date: "2026-05-20",
      tags: ["blog", "escritura"],
      description: "Proyecto de blog para publicar notas técnicas; en pausa hasta cerrar el hub.",
      type: "md",
      file: "proyectos/blog-tecnico.md"
    },
    {
      id: "fin-metas-2026",
      title: "Metas financieras 2026",
      category: "finanzas",
      subcategory: "Metas",
      date: "2026-06-01",
      tags: ["metas", "ahorro", "2026"],
      description: "Objetivos de ahorro e inversión para el año con hitos trimestrales.",
      type: "md",
      file: "finanzas/metas-2026.md",
      featured: true
    },
    {
      id: "fin-seguimiento",
      title: "Seguimiento de gastos — junio",
      category: "finanzas",
      subcategory: "Seguimiento",
      date: "2026-06-15",
      tags: ["gastos", "mensual"],
      description: "Registro de gastos del mes en curso para revisión semanal.",
      type: "xlsx",
      file: "finanzas/seguimiento-junio.xlsx"
    },
    {
      id: "apr-curso-js",
      title: "Curso: JavaScript moderno",
      category: "aprendizaje",
      subcategory: "Cursos",
      date: "2026-06-09",
      tags: ["javascript", "frontend", "curso"],
      description: "Notas y progreso del curso de JavaScript moderno (ES2023+).",
      type: "md",
      file: "aprendizaje/curso-javascript.md"
    },
    {
      id: "apr-notas-ux",
      title: "Notas de principios UX",
      category: "aprendizaje",
      subcategory: "Notas",
      date: "2026-06-13",
      tags: ["ux", "diseño", "notas"],
      description: "Apuntes sobre jerarquía visual, espaciado y carga cognitiva.",
      type: "md",
      file: "aprendizaje/notas-ux.md",
      featured: true
    }
  ]
};
