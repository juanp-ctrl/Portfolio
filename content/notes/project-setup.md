---
id: project-setup
title: "Configurando un Proyecto React con Vite"
category: React
order: 14
---

Veamos cómo crear un proyecto React desde cero y entender cada archivo que se genera.

## ¿Qué es "scaffold"?

La palabra **scaffold** viene de la construcción: es la estructura temporal (andamiaje) que se usa para construir un edificio. En programación, hacer "scaffold" de un proyecto significa **generar automáticamente la estructura base de archivos y carpetas** que necesitas para empezar a trabajar.

## Creando el proyecto

```javascript
// Con npm:
npm create vite@latest mi-app -- --template react

// Con pnpm (más rápido y eficiente):
pnpm create vite@latest mi-app --template react

// Luego:
cd mi-app
npm install   // o: pnpm install
```

### ¿Cómo funciona `npm create`?

`npm create` es un alias de `npm init`. Cuando ejecutas `npm create vite@latest`:

1. npm busca un paquete llamado `create-vite` (le antepone `create-` al nombre)
2. Descarga y ejecuta temporalmente ese paquete (sin instalarlo permanentemente)
3. El paquete `create-vite` te hace preguntas interactivas (nombre, framework, TypeScript/JavaScript)
4. Genera los archivos del proyecto según tus respuestas

El `@latest` significa "usa la última versión disponible".

## npm vs pnpm vs yarn

| Característica | npm | pnpm | yarn |
|----------------|-----|------|------|
| Viene con Node.js | Sí | No | No |
| Velocidad | Normal | Más rápido | Rápido |
| Uso de disco | Alto | Muy bajo | Normal |

**pnpm** es más eficiente porque usa un sistema de **almacenamiento global con hard links**: en lugar de copiar cada paquete a cada proyecto, guarda una sola copia y crea enlaces. Esto ahorra gigabytes de espacio en disco si tienes muchos proyectos.

## Estructura del proyecto

Después del scaffold, tendrás esta estructura:

```
mi-app/
├── index.html              ← Punto de entrada HTML
├── package.json            ← Manifiesto del proyecto
├── vite.config.js          ← Configuración de Vite
├── node_modules/           ← Paquetes descargados (no tocar)
├── public/                 ← Archivos estáticos (favicon, etc.)
└── src/
    ├── main.jsx            ← Punto de entrada JavaScript
    ├── App.jsx             ← Componente raíz de React
    ├── App.css             ← Estilos del componente App
    └── index.css           ← Estilos globales
```

## El HTML casi vacío

Abramos `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**¡Miren ese HTML!** No hay `&lt;h1&gt;`, no hay `&lt;p&gt;`, no hay menús, no hay contenido. Solo un `&lt;div id="root"&gt;` vacío y un `&lt;script&gt;`.

Si abren "Ver código fuente" (Ctrl+U) verán exactamente esto. Casi nada de HTML.

Pero si abren las **DevTools (F12) → Elements**, verán un DOM lleno de elementos. ¿De dónde salieron? **JavaScript (React) los creó dinámicamente**.

## El punto de entrada: main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

La cadena completa:

1. **`document.getElementById('root')`** — Busca el `&lt;div id="root"&gt;` vacío
2. **`ReactDOM.createRoot(...)`** — React se "apodera" de ese div
3. **`.render(<App />)`** — React renderiza el componente `App` dentro

A partir de este momento, React controla todo lo que hay dentro de ese div. El HTML "vacío" se llena con el contenido que tus componentes React definen.

## Comandos del proyecto

```javascript
// Iniciar servidor de desarrollo
npm run dev      // Abre http://localhost:5173

// Construir para producción
npm run build    // Genera carpeta dist/

// Previsualizar build de producción
npm run preview  // Sirve el contenido de dist/
```
