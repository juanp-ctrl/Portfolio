---
id: npm-basics
title: 'Que es y como funciona npm'
category: JavaScript Fundamentals
order: 5
---

## npm: El Supermercado de Código JavaScript

**npm** (Node Package Manager) es el gestor de paquetes que viene incluido con Node.js. Es tanto un registro online (el "supermercado" con más de 3 millones de paquetes) como una herramienta de línea de comandos para instalar y gestionar esos paquetes.

¿Qué hace npm en un proyecto React? Gestiona todas las dependencias que tu proyecto necesita: React, ReactDOM, Vite, plugins de Babel, librerías de estilos, etc.

### Los archivos clave de npm

**`package.json`** — Es el "manifiesto" de tu proyecto. Lista todas las dependencias y sus versiones, define scripts que puedes ejecutar, y guarda metadatos del proyecto:

```json
{
  "name": "mi-app-react",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

Nota la distinción entre `dependencies` (necesarias en producción: React es código que el usuario final ejecuta) y `devDependencies` (solo para desarrollo: Vite, el compilador, linters, etc. — el usuario final nunca los ve).

**`package-lock.json`** — Es el "candado" que asegura que todos los desarrolladores del equipo instalen exactamente las mismas versiones de cada paquete. Si `package.json` dice "quiero React ^19.0.0" (cualquier versión 19.x), el lock file dice "instalamos React 19.1.2 exactamente."

**`node_modules/`** — Es la carpeta donde npm descarga todos los paquetes y sus dependencias. Es _enorme_ (puede tener miles de carpetas) y **nunca** se sube al repositorio (por eso existe `.gitignore`). Cada desarrollador ejecuta `npm install` y npm recrea esta carpeta usando `package.json` y `package-lock.json`.

### El flujo de npm

```
npm install
    ↓
Lee package.json y package-lock.json
    ↓
Descarga paquetes del registro npm (npmjs.com)
    ↓
Los guarda en node_modules/
    ↓
Tu código puede importar: import React from 'react'
(Node.js busca 'react' dentro de node_modules/)
```

---
