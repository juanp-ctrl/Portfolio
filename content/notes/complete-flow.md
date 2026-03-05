---
id: complete-flow
title: "El Flujo Completo: De Tu Código al Navegador"
category: React
order: 16
---

Ahora que entendemos cada pieza individual, veamos cómo se conectan todas. Este es el viaje completo desde que escribes código hasta que el usuario ve tu aplicación.

## El diagrama completo

```
╔═══════════════════════════════════════════════════════════════╗
║                    TU COMPUTADORA (Desarrollo)                ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Tu Editor (VS Code)                                          ║
║  └── Escribes: App.jsx, main.jsx, estilos, etc.               ║
║                    ↓                                          ║
║  Node.js (entorno de ejecución)                               ║
║  ├── npm (gestor de paquetes)                                 ║
║  │   ├── package.json (lista de dependencias)                 ║
║  │   └── node_modules/ (React, Vite, etc.)                    ║
║  │                                                            ║
║  └── Vite (herramienta de build)                              ║
║      ├── Dev Server (localhost:5173)                          ║
║      │   ├── Sirve index.html                                 ║
║      │   ├── Transforma JSX → JS al vuelo (SWC)               ║
║      │   └── HMR: actualiza cambios en vivo                   ║
║      │                                                        ║
║      └── Build (npm run build)                                ║
║          ├── Rollup empaqueta todo                            ║
║          ├── Tree-shaking, minificación                       ║
║          └── Genera dist/ (archivos estáticos)                ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                    EL NAVEGADOR DEL USUARIO                   ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  1. Recibe index.html (casi vacío: solo <div id="root">)      ║
║  2. Carga el JS bundle (código React compilado)               ║
║  3. React se ejecuta EN EL NAVEGADOR:                         ║
║     a. Crea el Virtual DOM (objetos JS en memoria)            ║
║     b. Convierte Virtual DOM → operaciones DOM reales         ║
║     c. Llena el <div id="root"> con elementos HTML            ║
║  4. El navegador renderiza → el usuario ve la página          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

## Fase 1: Desarrollo

Cuando ejecutas `npm run dev`:

1. **Node.js** inicia **Vite**
2. Vite levanta un servidor en `localhost:5173`
3. Vite sirve `index.html` directamente
4. El navegador carga el HTML y ve `&lt;script type="module" src="/src/main.jsx"&gt;`
5. El navegador pide `main.jsx` a Vite
6. Vite **transforma** el JSX a JavaScript puro usando **SWC**
7. El navegador recibe JavaScript que puede ejecutar
8. React crea el Virtual DOM y actualiza el DOM real

Cuando guardas un cambio:

1. Vite detecta el archivo modificado
2. Transforma solo ese archivo
3. Envía la actualización al navegador via **WebSocket**
4. El navegador reemplaza solo el módulo que cambió (**HMR**)
5. React re-renderiza los componentes afectados

## Fase 2: Build de Producción

Cuando ejecutas `npm run build`:

1. **Rollup** analiza todos tus archivos empezando por `main.jsx`
2. Construye el **grafo de dependencias** (qué importa qué)
3. **Tree-shaking**: elimina código que nadie usa
4. **Bundling**: agrupa módulos en **chunks** optimizados
5. **Minificación**: reduce el tamaño del código
6. Genera la carpeta `dist/` con archivos estáticos

```
dist/
├── index.html
└── assets/
    ├── index-a1b2c3.js    ← Tu código (minificado)
    ├── vendor-d4e5f6.js   ← React y otras librerías
    └── index-g7h8i9.css   ← Tus estilos
```

## Fase 3: En el Navegador del Usuario

Cuando un usuario visita tu sitio:

```
1. Navegador pide index.html al servidor
2. Servidor responde con HTML (casi vacío)
3. Navegador parsea HTML, encuentra <script> tags
4. Navegador descarga los JS bundles
5. JavaScript se ejecuta:
   - React se inicializa
   - ReactDOM.createRoot() toma control del <div id="root">
   - React genera Virtual DOM basado en tus componentes
   - React convierte Virtual DOM → operaciones DOM
   - El <div id="root"> vacío ahora tiene contenido
6. Navegador renderiza el DOM → usuario ve la página
```

## Fase 4: Interacción del Usuario

Cuando el usuario hace clic en un botón:

```
1. Evento click dispara el handler
2. El handler llama setCount(count + 1)
3. React detecta el cambio de estado
4. React re-renderiza el componente (genera nuevo Virtual DOM)
5. React compara nuevo vs anterior (diffing):
   - <div> → no cambió ✓
   - <p>Clicks: 5</p> vs <p>Clicks: 6</p> → ¡CAMBIÓ!
   - <button> → no cambió ✓
6. React actualiza SOLO el texto del <p> en el DOM real
7. Navegador repinta SOLO ese pedazo de texto
```

No se recargó la página. No se pidió nada al servidor. Solo cambió el texto "5" por "6".

## Resumen de roles

| Herramienta | Dónde corre | Qué hace |
|-------------|-------------|----------|
| **Node.js** | Tu computadora | Ejecuta las herramientas de desarrollo |
| **npm/pnpm** | Tu computadora | Instala y gestiona paquetes |
| **Vite** | Tu computadora | Servidor de desarrollo + build |
| **SWC** | Tu computadora | Transforma JSX → JavaScript |
| **Rollup** | Tu computadora | Empaqueta código para producción |
| **React** | Navegador del usuario | Gestiona UI y Virtual DOM |
| **ReactDOM** | Navegador del usuario | Conecta React con el DOM real |

**La clave:** Node.js y todas las herramientas de build **nunca** llegan al usuario. Solo sirven para transformar tu código. El usuario solo recibe HTML, CSS y JavaScript puro que su navegador puede ejecutar.
