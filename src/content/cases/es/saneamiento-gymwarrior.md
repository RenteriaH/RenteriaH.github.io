---
title: "Sanear una aplicación PHP heredada sin reescribirla"
seoTitle: "Caso de estudio: saneamiento de una app PHP"
seoDescription: "Cómo encontré y corregí diez problemas de seguridad en una tienda PHP y MySQL, con pruebas que fallan en la versión original y pasan en la corregida."
summary: "Una tienda académica en PHP y MySQL que funcionaba, pero con inyección SQL, subidas sin validar, datos de usuarios en el repositorio y un script de rastreo escondido en la plantilla. Diez correcciones, comprobadas con pruebas de punta a punta."
role: "Desarrollo original (2024) y saneamiento (2026)"
org: "Proyecto académico — GYMWARRIOR"
period: "2024 · 2026"
stack: ["PHP 8", "MySQL 8", "JavaScript", "Playwright", "git-filter-repo"]
order: 1
key: "saneamiento-gymwarrior"
---

## Contexto

GYMWARRIOR es una tienda web que hice en la escuela en 2024: catálogo por categorías, registro e inicio de sesión,
modo invitado, carrito, pago de prueba con el sandbox de PayPal y un panel para administrar el inventario. Está escrita
en PHP sin framework, con MySQL.

En 2026, al revisar mi GitHub antes de buscar empleo, encontré que el repositorio público incluía un volcado de la base
de datos con correos reales de usuarios y una clave de Google Maps. Lo pasé a privado de inmediato y me propuse algo
más útil que borrarlo: dejarlo en un estado que pudiera defender en una entrevista.

## Por qué «no se veía»

Lo primero fue reproducirlo. GitHub muestra el código, pero no ejecuta PHP, así que el repositorio parecía «roto».
Monté PHP y MySQL en local, cargué el esquema y comprobé que el código original **sí funcionaba**: la portada se veía
y el catálogo, sin base de datos, terminaba en un error fatal. No hacía falta reescribir nada para que funcionara;
hacía falta corregir lo que estaba mal.

## Lo que encontré

| Problema | Riesgo |
|---|---|
| Registro que armaba el SQL con el texto del usuario | Inyección SQL |
| Página que creaba un administrador con contraseña fija al visitarla | Cualquiera podía crear un admin |
| Subida de imágenes sin validar | Un `.php` disfrazado de `.jpg` se guardaba y se podía ejecutar |
| Sin token CSRF; borrar productos por GET | Acciones forzadas desde otro sitio |
| Datos mostrados sin escapar | XSS |
| `.env` servido por el servidor web | Credenciales visibles para cualquiera |
| Script de rastreo externo en la plantilla HTML | Código remoto ejecutándose en cada visita, incluido el login |
| Compra sin validar cantidades ni stock | Stock negativo; ventas de productos agotados |
| Volcado SQL con datos de usuarios en el repositorio | Privacidad de terceros |
| Testimonios con nombres y fotos de personas | Privacidad y reseñas inventadas |

El script de rastreo fue la sorpresa: venía en `custom.js` de la plantilla gratuita que usé y descargaba código de un
dominio externo con `$.getScript`. No lo escribí yo, pero estaba en mi sitio.

## Primero las pruebas

Antes de corregir escribí 13 pruebas de punta a punta con Playwright que describen cómo **debería** comportarse la
aplicación: páginas sin errores, ningún script de dominios no permitidos, archivos internos inaccesibles, registro y
login, carrito del invitado, compra con stock y un archivo PHP disfrazado rechazado.

Contra el código original fallaron 10 de 13. Eso me dio dos cosas: una lista objetiva de lo que había que arreglar y la
forma de saber cuándo estaba arreglado.

## Las correcciones

- **Consultas preparadas** en todas las escrituras y una validación de registro con las mismas reglas en el navegador
  y en el servidor.
- **Token CSRF** en todos los formularios y en la llamada `fetch` del carrito; la baja de productos pasó a POST.
- **Subidas**: tipo real del archivo con `finfo`, lista blanca de JPG/PNG/WEBP, 2 MB y nombre aleatorio.
- **Compra en una transacción** con `UPDATE … WHERE stock >= ?`: si un producto no alcanza, no se descuenta ninguno.
- **Configuración por `.env`** fuera del repositorio, más `.htaccess` y un `router.php` que bloquean archivos internos.
- Dos errores funcionales: el invitado no podía agregar al carrito (su `usuario_id` es `null` y `isset()` lo trataba
  como no conectado) y el pago redirigía al recibo antes de que el servidor confirmara el stock.
- **Datos ficticios** (dominio `example.com`) en lugar del volcado, y testimonios rotulados como ejemplo.

Después de los cambios, las 13 pruebas pasan.

## El historial también cuenta

Borrar un archivo en un commit nuevo no lo quita del historial. Reescribí el historial con `git-filter-repo` en una
copia aparte, quitando el volcado, las fotos y la clave, y lo verifiqué buscando cada patrón en todos los commits. La
clave se revoca en el proveedor: limpiarla del código no la invalida.

## Capturas

Capturas de la versión saneada ejecutándose en local con datos ficticios. No es una demostración en línea: GitHub Pages no ejecuta PHP ni MySQL.

<figure class="shot"><img src="/img/gymwarrior/index.jpg" alt="Portada de la tienda" width="1200" height="750" loading="lazy" decoding="async"><figcaption>Portada de la tienda</figcaption></figure>
<figure class="shot"><img src="/img/gymwarrior/carrito.jpg" alt="Carrito con el botón de pago de prueba de PayPal" width="1200" height="750" loading="lazy" decoding="async"><figcaption>Carrito con el botón de pago de prueba de PayPal</figcaption></figure>
<figure class="shot"><img src="/img/gymwarrior/admin.jpg" alt="Panel de administración para agregar productos con imagen validada" width="1200" height="750" loading="lazy" decoding="async"><figcaption>Panel de administración para agregar productos con imagen validada</figcaption></figure>

## Lo que aprendí

- Que algo funcione no significa que sea seguro: la versión original hacía lo que prometía.
- Las pruebas que fallan antes del arreglo son la mejor evidencia de que el arreglo sirve.
- Una plantilla gratuita es código de terceros y hay que revisarla como tal.
- Proteger los datos de otras personas va antes que cualquier mejora visual.

El saneamiento lo hice en 2026 con asistencia de agentes de IA, revisando y probando cada cambio.
