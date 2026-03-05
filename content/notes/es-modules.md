---
id: es-modules
title: "ES Modules: El Sistema de Módulos de JavaScript"
category: JavaScript Fundamentals
order: 4
---

Antes de hablar de Vite, necesitamos entender una pieza fundamental: **ES Modules** (ESM).

## ¿Qué significa "ES"?

**ES** viene de **ECMAScript**, el nombre oficial del estándar que define el lenguaje JavaScript. JavaScript fue creado por Brendan Eich en 1995, pero cuando se necesitó estandarizar el lenguaje, la organización ECMA International se encargó de ello. Las versiones se conocen como ES5, ES6 (o ES2015), ES2016, etc.

## El problema original: JavaScript no tenía módulos

Antes de ES6 (2015), JavaScript **no tenía ningún sistema de módulos nativo**. Cada archivo de JavaScript que incluías con un `&lt;script&gt;` compartía el mismo scope global. Si dos archivos definían una variable con el mismo nombre, uno sobreescribía al otro. Era un desastre esperando ocurrir.

La comunidad inventó soluciones:

- **CommonJS**: El sistema `require()/module.exports` creado para Node.js
- **AMD**: Asynchronous Module Definition, usado con RequireJS para el navegador

Herramientas como **Webpack** surgieron para permitir usar CommonJS en el navegador, empaquetando todo en un solo archivo.

## ES Modules: La solución oficial (2015)

En **junio de 2015**, ECMAScript 2015 (ES6) finalmente incluyó un sistema de módulos nativo:

```javascript
// math.js — EXPORTAR
export function sumar(a, b) {
  return a + b;
}
export const PI = 3.14159;

// Exportación por defecto
export default function multiplicar(a, b) {
  return a * b;
}
```

```javascript
// app.js — IMPORTAR
import multiplicar, { sumar, PI } from './math.js';

console.log(sumar(2, 3));       // 5
console.log(PI);                 // 3.14159
console.log(multiplicar(4, 5)); // 20
```

## La diferencia clave: Análisis estático

La clave de ES Modules está en una diferencia fundamental con CommonJS: **ES Modules son estáticos**.

### CommonJS (dinámico)

```javascript
// Con require(), la ruta puede ser dinámica
const modulo = require(algunaVariable);  // ✓ Funciona
if (condicion) {
  require('./otroModulo');  // ✓ Funciona
}
```

Con CommonJS, el sistema descubre las dependencias **en tiempo de ejecución** — cuando el código se ejecuta.

### ES Modules (estático)

```javascript
// Con import, la ruta DEBE ser estática (un string literal)
import modulo from algunaVariable;  // ✗ ERROR
if (condicion) {
  import algo from './algo';  // ✗ ERROR
}

// Solo esto es válido:
import algo from './algo.js';  // ✓ String literal
```

Con ES Modules, las dependencias se declaran **en tiempo de análisis** — la herramienta puede saber qué archivo importa qué otro archivo _sin ejecutar nada_, simplemente leyendo la sintaxis.

## ¿Por qué el análisis estático importa?

Esta característica tiene consecuencias enormes:

### 1. Tree-shaking (eliminación de código muerto)

Como sabemos exactamente qué se importa de cada módulo, podemos eliminar con certeza el código que nadie usa:

```javascript
// utils.js exporta 10 funciones
export function a() { }
export function b() { }
// ... 8 funciones más

// app.js solo importa 2
import { a, b } from './utils.js';

// Las otras 8 funciones se ELIMINAN del bundle final
```

### 2. Hot Module Replacement (HMR) preciso

Como conocemos el grafo exacto de dependencias (qué archivo depende de qué otro), cuando cambias un archivo, Vite sabe _exactamente_ qué módulos se ven afectados y puede reemplazar **solo** esos módulos sin recargar toda la página.

### 3. Carga bajo demanda

El navegador puede pedir módulos individuales cuando los necesita, en lugar de cargar un bundle gigante al inicio.

## Usando ES Modules en el navegador

Los navegadores modernos soportan ES Modules nativamente con `&lt;script type="module"&gt;`:

```html
<script type="module" src="/src/main.js"></script>
```

Esto es exactamente lo que hace Vite durante desarrollo — sirve ES Modules nativos al navegador.

## De módulos a chunks en producción

Cuando ejecutas `npm run build`, el bundler (Rollup) analiza el grafo de dependencias y decide cómo dividirlos en **chunks** (fragmentos):

```
Tu código fuente (ES Modules):          Build de producción (chunks):
src/                                     dist/assets/
├── main.jsx                             ├── index-a1b2c3.js   (tu código)
├── App.jsx                              ├── vendor-d4e5f6.js  (React, etc.)
├── Header.jsx                           └── utils-g7h8i9.js   (código compartido)
└── utils.js
```

Un **chunk** es un archivo JavaScript de producción que contiene uno o más módulos agrupados estratégicamente para optimizar la carga.
