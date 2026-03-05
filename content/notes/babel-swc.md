---
id: babel-swc
title: "Babel y SWC: Los Traductores de JavaScript"
category: Build Tools
order: 7
---

El navegador **no entiende JSX**. Cuando escribes `&lt;h1&gt;Hola&lt;/h1&gt;`, alguien tiene que convertirlo en `React.createElement('h1', null, 'Hola')` antes de que el navegador lo vea. Esos "alguien" son los **transpiladores**.

## ¿Qué es un Transpilador?

Un **transpilador** (o compilador source-to-source) es una herramienta que convierte código de un lenguaje o versión a otro. A diferencia de un compilador tradicional que convierte código a lenguaje máquina (0s y 1s), un transpilador convierte código fuente a otro código fuente.

Ejemplos de lo que hacen:
- JSX → JavaScript puro
- TypeScript → JavaScript
- JavaScript moderno (ES2024) → JavaScript compatible con navegadores viejos

## El proceso de 3 pasos

Tanto Babel como SWC siguen el mismo proceso:

### 1. Parsing (análisis)

Lee tu código fuente y lo convierte en un **AST** (Abstract Syntax Tree - Árbol de Sintaxis Abstracta). Un AST es una representación estructurada del código como un árbol de objetos que la computadora puede entender y manipular.

```javascript
// Tu código:
const x = 5 + 3;

// Se convierte en un AST (simplificado):
{
  type: "VariableDeclaration",
  declarations: [{
    id: { type: "Identifier", name: "x" },
    init: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Literal", value: 5 },
      right: { type: "Literal", value: 3 }
    }
  }]
}
```

### 2. Transformación

Recorre el AST y lo modifica según las reglas configuradas (convertir JSX, eliminar TypeScript, etc.)

### 3. Generación

Convierte el AST modificado de vuelta a código JavaScript que el navegador entiende.

## Babel: El veterano

**Babel** fue durante años _el_ estándar de la industria. Fue creado en 2014 (originalmente como "6to5" porque convertía ES6 a ES5) y está escrito en JavaScript.

Babel es extremadamente flexible gracias a su sistema de **plugins** y **presets** (conjuntos de plugins):

- `@babel/preset-react`: Plugins para transformar JSX
- `@babel/preset-env`: Convierte sintaxis moderna a versiones compatibles
- `@babel/preset-typescript`: Elimina tipos de TypeScript

## SWC: La nueva generación

**SWC** (Speedy Web Compiler) es la nueva generación. Fue creado por **Donny** (kdy1dev), un desarrollador que trabaja en Next.js en Vercel.

SWC sigue exactamente el mismo proceso de 3 pasos que Babel, pero con una diferencia fundamental: **está escrito en Rust** en lugar de JavaScript.

### ¿Por qué Rust importa?

**Rust** es un lenguaje de programación de bajo nivel (cercano al hardware) que:

- Se compila a **código máquina** (0s y 1s que el CPU ejecuta directamente)
- Gestiona la memoria de forma eficiente **en tiempo de compilación** (sin garbage collector corriendo constantemente)
- Puede aprovechar **múltiples núcleos** del CPU de forma segura

El resultado en rendimiento es demoledor:

```
Babel (JavaScript):     SWC (Rust):
──────────────────      ──────────────
1x velocidad            20x más rápido (1 núcleo)
                        70x más rápido (múltiples núcleos)
```

Para ponerlo en contexto práctico: lo que antes tomaba 12-15 segundos con Babel en un hot reload de Next.js, ahora toma fracciones de segundo con SWC.

## ¿Cuál usa Vite?

**Vite usa SWC** (a través de esbuild) por defecto para transformar JSX y TypeScript durante desarrollo, aprovechando esa velocidad para el HMR instantáneo.

```
Tu código JSX              Transpilador              Lo que recibe el navegador
─────────────────    →    ───────────────    →     ─────────────────────────
<h1>Hola</h1>             Babel o SWC              React.createElement(
                          (parse →                   'h1',
                           transform →                null,
                           generate)                  'Hola'
                                                   )
```
