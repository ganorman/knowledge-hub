# Hub de conocimiento · GAN

Biblioteca pública, estática y sin servicios externos de ejecución. Cuatro colecciones: Prompts, Ideas, Recursos y Estudios bíblicos. Todo lo que se publique puede ser descargado; no es un almacén privado.

## Consultar

Abre index.html o inicia `node tools/preview.cjs` y visita http://127.0.0.1:8765. La vista previa solo sirve los archivos del catálogo y los recursos necesarios para la aplicación.

- Búsqueda por título, etiquetas y texto completo, con o sin acentos.
- Markdown legible dentro del hub; copia por bloque o documento completo.
- Favoritos y tema guardados en este navegador. No se sincronizan ni forman parte de un respaldo del contenido.
- Sin fuentes remotas: se usan las fuentes de respaldo GAN si Barlow e IBM Plex no están instaladas. No se ha recreado el monograma oficial sin su activo original.
- No hay garantía de disponibilidad offline al visitar GitHub Pages sin conexión. La copia local completa funciona sin servidor; copiar al portapapeles depende de los permisos del navegador.

## Añadir o modificar contenido

1. Comprueba que el documento sea apto para publicación y conserve su fuente.
2. Guarda el documento en su carpeta. No copies archivos privados ni exportaciones del segundo cerebro al repositorio.
3. Añade o actualiza la ficha en assets/js/data.js: id estable, título, categoría, subcategoría, fecha, etiquetas, descripción, tipo y archivo.
4. Ejecuta `node tools/build-content.cjs`. Verifica archivos, categorías e identificadores y regenera assets/js/content.js para el lector y la búsqueda. No edites ese archivo generado directamente.
5. Revisa la vista previa, teclado y pantalla pequeña. Publica únicamente los cambios revisados y autorizados.

El lector admite encabezados, párrafos, listas simples, tablas, citas, enlaces HTTP(S) y bloques de código. No ejecuta HTML dentro de notas y no es un procesador Markdown completo. HTML se abre como archivo independiente.

## Criterio editorial

- Organizar por utilidad; herramientas y formatos son etiquetas, no áreas principales.
- Un recurso tiene una fuente principal. No sincronizar automáticamente con el segundo cerebro.
- «Ejemplo por confirmar» no describe una meta ni un estado personal comprobado.
- «Apunte en revisión» requiere revisión de citas e interpretación antes de usarse como enseñanza validada.
- El prompt de andamios es una guía de estudio y no un procedimiento operativo validado.
- Las fechas de las fichas originales se conservan como procedencia; no prueban una revisión reciente de su contenido. `reviewed` identifica la revisión editorial del catálogo.

## Publicación y privacidad

GitHub Pages sirve archivos públicos aunque no estén enlazados en el catálogo. Quitar una ficha no elimina el archivo ni su historial de Git. Para retirar contenido hay que revisar archivo, catálogo, índice generado e historial, sin reescribir historia sin aprobación.

`.local-audit/` contiene respaldos y evidencia privados de trabajo: está excluida de Git y del servidor de vista previa. `.claude/`, dependencias y registros tampoco se publican. Nunca utilizar `git add .` sin revisar previamente el listado de archivos.

Las rutas antiguas de categorías Biblioteca, Aprendizaje, Proyectos y Finanzas llevan a Recursos. Los identificadores de documentos y las claves `hub.favs` / `hub.theme` se conservan.
