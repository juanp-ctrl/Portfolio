---
id: vite
title: "Vite: El Motor que Hace Todo Rápido"
category: Build Tools
order: 8
---

**Vite** (palabra francesa que significa "rápido", pronunciado /vit/) es la herramienta de build moderna para proyectos web. Fue creado por **Evan You** (el creador de Vue.js) y se ha convertido en el estándar para nuevos proyectos React.

## El puerto 5173: Un easter egg

Cuando ejecutas `npm run dev`, Vite levanta un servidor en `http://localhost:5173`.

¿Por qué 5173? Es un **easter egg**. Si lees los números de forma creativa, 5-1-7-3 se pueden mapear a las letras **V-I-T-E**: el 5 es la "V" en números romanos, el 1 es la "I", el 7 la "T" y el 3 la "E".

La razón práctica fue evitar conflictos con puertos populares como 3000, 4000 o 5000 — pero el guiño al nombre fue intencional.

## Rol 1: Servidor de Desarrollo

A diferencia de herramientas anteriores como Webpack, Vite **no empaqueta** todo tu código al arrancar. En su lugar:

1. Sirve tu `index.html` directamente
2. El HTML contiene un `&lt;script type="module"&gt;` que apunta a tu código
3. El navegador solicita los módulos usando **ES Modules nativos**
4. Vite intercepta cada solicitud, transforma el archivo al vuelo (JSX → JS) y lo sirve
5. Solo se procesan los archivos que el navegador realmente solicita

Esto hace que el servidor arranque **casi instantáneamente**, sin importar el tamaño del proyecto.

### HMR: Hot Module Replacement

Cuando guardas un cambio en tu editor, Vite detecta exactamente qué archivo cambió, lo transforma, y le dice al navegador que actualice _solo_ ese módulo. **No recarga toda la página** — actualiza el componente en vivo.

Esto es posible gracias a los ES Modules: Vite conoce el grafo de dependencias exacto y sabe qué módulos necesitan actualizarse.

## Rol 2: Build de Producción (Rollup)

Cuando ejecutas `npm run build`, Vite usa **Rollup** internamente como bundler.

### ¿Quién creó Rollup?

No fue Evan You — fue **Rich Harris**, el creador de Svelte. Harris creó Rollup en 2015 porque estaba frustrado: cada vez que separaba su código en más módulos (buena práctica), el bundle crecía por el overhead de los bundlers existentes.

Rollup genera código "plano" — como si hubieras escrito todo en un solo archivo, sin wrappers ni código extra. Además, fue pionero en **tree-shaking**: eliminar código que nadie importa.

## Webpack vs Vite: La evolución

### Era Webpack (2012-2020)

**Webpack** (creado por Tobias Koppers) fue revolucionario — permitió usar módulos en el navegador y manejar JS, CSS, imágenes, todo junto. Pero tenía costos:

- **Arrancaba lento**: Para servir un archivo, tenía que analizar y empaquetar _todo_ el proyecto
- **HMR más lento**: Al cambiar un archivo, re-empaquetaba secciones completas
- **Bundles con overhead**: Cada módulo envuelto en funciones wrapper
- **Configuración compleja**: El `webpack.config.js` podía tener cientos de líneas

### Era Vite (2020+)

Vite tomó un enfoque diferente:

- **Arranque instantáneo**: No empaqueta nada, sirve ES Modules directamente
- **HMR instantáneo**: Reemplaza un módulo específico
- **Zero-config**: Funciona sin configuración para la mayoría de proyectos
- **Builds eficientes**: Usa Rollup para producción (bundles planos, tree-shaking)

```
Era Webpack:                          Era Vite:
──────────────────                    ──────────────────
Desarrollo:                           Desarrollo:
- Empaqueta TODO al arrancar          - No empaqueta, sirve ES Modules
- HMR lento (re-bundle parcial)       - HMR instantáneo (1 módulo)
- Config compleja                     - Zero-config

Producción:                           Producción:
- Webpack bundle (con wrappers)       - Rollup bundle (plano, eficiente)
```

## ¿Cómo no se pierde nada?

Con decenas de archivos `.jsx`, `.ts`, `.css`, ¿cómo sabe el sistema qué va con qué?

Todo empieza con un **punto de entrada**: `src/main.jsx`. El bundler lee ese archivo, ve que importa `App.jsx`, entonces lee `App.jsx`, ve que importa `Header.jsx`, y así sucesivamente. Va construyendo un **grafo de módulos**:

```
main.jsx
  ├── App.jsx
  │     ├── Header.jsx
  │     └── Footer.jsx
  ├── react (de node_modules)
  └── react-dom (de node_modules)
```

**Si un archivo no está conectado a este grafo (nadie lo importa), simplemente no se incluye en el build.** Esto es tree-shaking a nivel de archivos.

## Desarrollo vs Producción

```
Desarrollo (npm run dev):              Producción (npm run build):
────────────────────────               ────────────────────────────
Vite Dev Server                        Rollup (bundler)
        ↓                                      ↓
Transforma al vuelo                    Empaqueta + optimiza
        ↓                                      ↓
ES Modules nativos                     dist/
Navegador pide lo que necesita             ├── index.html
        ↓                                  ├── assets/
HMR (actualización en vivo)                │   ├── index-a1b2c3.js
                                           │   ├── vendor-d4e5f6.js
                                           │   └── index-g7h8i9.css
```
