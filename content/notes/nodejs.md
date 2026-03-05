---
id: nodejs
title: "Node.js: JavaScript Fuera del Navegador"
category: JavaScript Fundamentals
order: 5
---

Hasta ahora hemos hablado de lo que pasa en el navegador. Pero para llegar ahí, necesitamos herramientas que trabajen en nuestra computadora de desarrollo. Aquí entra **Node.js**.

## ¿Qué es Node.js?

**Node.js** es un **entorno de ejecución** (runtime) de JavaScript **fuera del navegador**. 

### ¿Qué es un runtime?

Un **runtime** es el entorno que ejecuta tu código. Cuando escribes JavaScript, algo tiene que leer ese código y ejecutarlo — ese "algo" es el runtime.

- En el navegador, el runtime es el **motor JavaScript del navegador** (V8 en Chrome, SpiderMonkey en Firefox)
- En tu computadora, el runtime puede ser **Node.js**

### ¿Qué es V8?

**V8** es el motor de JavaScript creado por Google para Chrome. Es el programa que lee código JavaScript y lo ejecuta. Node.js usa este mismo motor V8, pero en lugar de ejecutarse en una pestaña del navegador, se ejecuta directamente en tu sistema operativo.

## ¿Por qué necesitamos Node.js para desarrollo frontend?

Aunque tu app React se ejecutará en el navegador del usuario, necesitas Node.js en tu computadora para:

- **Ejecutar herramientas de desarrollo** (Vite, Webpack, ESLint) que están escritas en JavaScript
- **Ejecutar el servidor de desarrollo local** que sirve tu app mientras la desarrollas
- **Transformar tu código** (JSX → JavaScript, TypeScript → JavaScript)
- **Gestionar paquetes** a través de npm

```
Tu computadora (desarrollo):
┌─────────────────────────────────────────────┐
│  Node.js                                    │
│  ├── npm (gestión de paquetes)              │
│  ├── Vite (servidor de desarrollo + build)  │
│  └── SWC/Babel (transpilador JSX → JS)      │
└─────────────────────────────────────────────┘
                    ↓ (build)
            Archivos estáticos:
            HTML + CSS + JS
                    ↓
            Servidor web → Navegador del usuario
```

## La distinción clave: Node.js NO va a producción

En una app React típica, **Node.js no va a producción**. La app final es HTML + CSS + JavaScript estático que cualquier servidor web puede servir (Apache, Nginx, un CDN como Vercel o Netlify).

Node.js es una **herramienta de desarrollo**. El usuario final nunca interactúa con Node.js — solo con el JavaScript ya transformado que se ejecuta en su navegador.

## ¿Dónde se ejecuta cada cosa?

Esta es una confusión común. Aclaremos:

**Node.js ejecuta las herramientas** (Vite, el transpilador, el bundler). Pero el **JavaScript resultante** de esa transformación **se ejecuta en el navegador del usuario**.

```
Tu código JSX (App.jsx)
        ↓
Node.js + Vite lo TRANSFORMA (JSX → JS puro)
        ↓
El JS puro viaja por la red al navegador
        ↓
El NAVEGADOR lo EJECUTA (React corre aquí, el Virtual DOM vive aquí)
```

Piénsalo así: **Node.js es el traductor** que convierte un libro del coreano al español. **El lector (el navegador) lee la versión en español**. El traductor no lee el libro por el lector.

## Verificando Node.js

Para verificar que tienes Node.js instalado:

```javascript
// En tu terminal:
node --version
// Debería mostrar algo como: v20.10.0

npm --version
// Debería mostrar algo como: 10.2.3
```

Node.js viene con **npm** (Node Package Manager) incluido, que es lo que usamos para instalar dependencias como React, Vite, etc.
