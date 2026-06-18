# 10 bucles de IA para automatizar tu trabajo
### (con prompts para copiar)

> Categoría: Prompts IA · Automatización · #bucles #automatización #prompts #productividad
>
> Un **bucle** no es siempre la respuesta. Si la tarea es pequeña y la puedes
> revisar de un vistazo, te basta con un buen prompt. El bucle solo se vuelve
> necesario cuando la tarea es tan grande, o tiene tantas reglas a la vez, que un
> solo intento se deja cosas fuera y **tú ni te enteras**. Ahí es donde la IA tiene
> que revisarse a sí misma.
>
> La diferencia es esa: **un prompt mira una vez; un bucle se relee**, encuentra lo
> que se le escapó y lo corrige, hasta que una pasada completa no encuentra nada
> nuevo. Estos son diez casos donde eso no es un lujo: es lo que separa un resultado
> fiable de uno que parece bueno pero está incompleto.
>
> **Copia el prompt, pega tu contenido donde indica y ponle siempre un freno.**

---

## 1. Extraer todo de un documento largo sin que se escape nada

Pides «sácame todos los puntos» de un documento de cuarenta páginas y te da una lista
convincente. El problema: no sabes qué se ha dejado fuera, y no te vas a leer las
cuarenta páginas para comprobarlo. El bucle se relee el documento entero buscando lo que falta.

```
Extrae todos los puntos clave de este documento.
Ahora vuelve al documento entero, sección por sección, y busca
los que NO estén en tu lista.
Si encuentras alguno, añádelo. Repite hasta que una pasada
completa no encuentre nada nuevo.
Máximo 4 pasadas.
Al final dime cuántos encontraste en la primera pasada y cuántos
en total.
[Pega aquí el documento]
```

---

## 2. Validar una lista de datos contra reglas estrictas

Doscientas filas que tienen que cumplir un formato. Un prompt corrige las primeras y
se cansa; las del final pasan sin revisar. El bucle recorre la lista entera tantas veces como haga falta.

```
Revisa esta lista de datos contra estas reglas: [escribe aquí tus
reglas].
Comprueba fila por fila. Marca cada fila que incumpla alguna
regla y corrígela.
Vuelve a revisar la lista entera; repite hasta que una pasada
completa no encuentre ningún incumplimiento.
Máximo 4 pasadas.
Al final dime cuántas filas corregiste y cuántas quedaron
marcadas como dudosas.
[Pega aquí los datos]
```

---

## 3. Revisar un documento contra un checklist, punto por punto

Antes de enviar un contrato o un procedimiento que tiene que cumplir requisitos. Un
prompt evalúa unos cuantos puntos y se salta otros sin avisar. El bucle se asegura de
que ninguno queda sin revisar.

```
Revisa este documento contra el siguiente checklist: [pega aquí
el checklist].
Para cada punto indica CUMPLE / NO CUMPLE / NO APLICA y dónde lo
has visto.
Comprueba que has evaluado TODOS los puntos; si te saltaste
alguno, vuelve y complétalo.
Repite hasta que no quede ningún punto sin evaluar. Máximo 3
pasadas.
Entrégame una tabla y, al final, la lista de lo que hay que
corregir.
[Pega aquí el documento]
```

---

## 4. Cruzar dos listas y encontrar lo que no cuadra

Facturas contra pagos. Inscritos contra asistentes. Inventario contra albaranes. Un
prompt encuentra algunas diferencias y se deja otras. El bucle recorre ambas listas
hasta que no aparece ni una más.

```
Tengo dos listas: LISTA A y LISTA B.
Encuentra los elementos de A que no están en B, y los de B que no
están en A.
Ahora recorre ambas listas enteras otra vez y comprueba que no se
te ha escapado ninguna diferencia; si hay más, añádelas.
Repite hasta que una pasada completa no encuentre nuevas
diferencias. Máximo 3 pasadas.
Entrégame dos columnas: "Solo en A" y "Solo en B".
[Pega aquí LISTA A]
[Pega aquí LISTA B]
```

---

## 5. Cumplir varias restricciones a la vez en un texto

Cuando un texto tiene que cumplir cuatro reglas al mismo tiempo, un solo intento casi
siempre rompe una. El bucle se relee comprobando las cuatro y reescribe hasta que las
cumple todas juntas.

```
Reescribe este texto cumpliendo TODAS estas reglas a la vez:
1) máximo 150 palabras; 2) sin tecnicismos; 3) tono cercano pero
profesional; 4) que termine con una llamada a la acción clara.
Relee tu versión y comprueba las 4 reglas una a una. Si incumple
alguna, reescríbela.
Repite hasta cumplir las 4 a la vez. Máximo 4 intentos.
Entrégame solo la versión final y confírmame que cumple las 4.
[Pega aquí el texto]
```

---

## 6. Sacar todas las obligaciones y plazos de un contrato

En un contrato, la cláusula que se escapa es la que te cuesta dinero. Un prompt te da
las obvias; el bucle recorre el contrato entero buscando las que faltan.
**Aviso honesto:** esto te prepara el terreno, no sustituye la revisión de un profesional.

```
Extrae de este contrato todas las obligaciones, plazos y
penalizaciones, una por una.
Ahora vuelve al contrato entero, cláusula por cláusula, y busca
obligaciones, plazos o penalizaciones que NO estén en tu lista.
Si encuentras alguno, añádelo. Repite hasta que una pasada
completa no encuentre nada nuevo. Máximo 4 pasadas.
Entrégame una tabla: Obligación · Plazo · Penalización ·
Cláusula.
[Pega aquí el contrato]
```

---

## 7. Traducir un documento largo sin que baile la terminología

En textos largos, la IA traduce el mismo concepto de dos o tres formas distintas según
la página. Un prompt no lo detecta. El bucle se relee buscando esas inconsistencias y las unifica.

```
Traduce este documento al [idioma] en registro formal.
Cuando termines, recórrelo entero buscando un mismo concepto
traducido de dos formas distintas.
Si encuentras inconsistencias, unifícalas y vuelve a revisar.
Repite hasta que una pasada no encuentre ninguna. Máximo 3
pasadas.
Al final dime qué términos unificaste.
[Pega aquí el documento]
```

---

## 8. Anonimizar un documento sin que se cuele un dato personal

Quitar nombres, DNI, teléfonos o números de historia antes de compartir algo. Aquí un
dato que se escape es un problema serio. El bucle relee el texto entero hasta que no
encuentra ninguno. **Aviso honesto:** revísalo tú antes de compartir, no es una garantía legal.

```
Quita de este texto todos los datos personales: nombres, DNI,
teléfonos, correos, direcciones y números de historia.
Ahora vuelve a leer el texto entero buscando datos personales que
se te hayan escapado.
Si encuentras alguno, quítalo. Repite hasta que una pasada
completa no encuentre ninguno. Máximo 4 pasadas.
Al final dime cuántos datos quitaste, por tipo.
[Pega aquí el texto]
```

---

## 9. Crear preguntas que cubran todo el temario

Para formación interna o un examen. Un prompt se centra en los temas más llamativos y
deja otros sin tocar. El bucle comprueba que cada tema tiene su pregunta antes de parar.

```
A partir de este temario, crea preguntas de evaluación.
Criterio: al menos una pregunta por cada tema; ningún tema puede
quedarse sin pregunta.
Repasa el temario y comprueba que cada tema tiene la suya; si
falta alguno, añádelo.
Repite hasta cubrirlos todos. Máximo 3 pasadas.
Entrégame las preguntas agrupadas por tema.
[Pega aquí el temario]
```

---

## 10. Cazar las afirmaciones sin fuente antes de publicar

Antes de publicar un texto con datos y cifras, conviene saber cuáles no tienes
contrastados. Un prompt marca algunas; el bucle recorre el texto entero hasta no
dejarse ninguna afirmación dudosa sin señalar.

```
Revisa este borrador y marca toda afirmación de dato, cifra o
hecho que no tenga fuente.
Para cada una indica la frase y si es "verificable", "dudosa" o
"hay que citar fuente".
Vuelve a recorrer el texto entero por si se te escapó alguna;
repite hasta que una pasada no encuentre más. Máximo 3 pasadas.
Entrégame la lista de afirmaciones a revisar antes de publicar.
[Pega aquí el borrador]
```

---

## Cuándo NO necesitas un bucle

Si la tarea es de una sola vez, o la puedes comprobar de un vistazo, montar un bucle es
matar moscas a cañonazos: te basta con un buen prompt. Y recuerda **el freno**: sin un
número máximo de pasadas, un bucle puede seguir revisando y gastar de más sin entregar
nada mejor. Hay otra trampa: **el bucle solo es tan bueno como su criterio**. Si el
criterio está mal puesto, la IA itera con entusiasmo hacia la respuesta equivocada. El
criterio lo pones tú, con cabeza.

---

## Preguntas frecuentes

**¿En qué se diferencia un bucle de un prompt normal?**
Un prompt pide una vez y te entrega lo que salga. Un bucle añade un **criterio** que la
IA puede comprobar por sí misma y un **freno** con un número máximo de intentos. Esas
dos piezas son las que hacen que se corrija sola.

**¿Necesito saber programar?**
No. Todos estos prompts se escriben en lenguaje normal dentro de un chat de IA. Para
dispararlos solos (por ejemplo cada lunes) ya entran herramientas de automatización,
pero el bucle en sí no requiere código.

**¿Cómo sé cuántas pasadas poner de freno?**
Empieza con 3 o 4. Si en la última pasada todavía aparecen cambios, súbelo un poco. Si
desde la segunda ya no encuentra nada nuevo, puedes bajarlo. La idea es que **pare
cuando deja de mejorar**.

---

*Fuente original: Paco Vida — «Deja de escribir prompts. Escribe bucles».*
