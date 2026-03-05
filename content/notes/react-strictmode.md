---
id: react-strictmode
title: "React.StrictMode: Tu Linter en Vivo"
category: React
order: 15
---

Si miras el archivo `main.jsx` de un proyecto React, verás que `&lt;App /&gt;` está envuelto en algo llamado `&lt;React.StrictMode&gt;`:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

¿Qué es esto y por qué a veces ves `console.log` duplicados?

## ¿Qué es StrictMode?

`&lt;React.StrictMode&gt;` es un componente especial de React que **no renderiza nada visible** en la pantalla — no agrega ningún elemento al DOM. Pero activa **verificaciones adicionales solo en modo desarrollo** para ayudarte a escribir mejor código.

Piénsalo como un "linter en vivo" que React ejecuta por ti mientras desarrollas.

## Las 3 verificaciones de StrictMode

### 1. Doble renderizado de componentes

En desarrollo, React ejecuta tus componentes **dos veces** (doble invocación) para detectar efectos secundarios impuros.

```jsx
function Contador() {
  console.log('Renderizando Contador');  // Verás esto 2 veces
  const [count, setCount] = useState(0);
  return <p>{count}</p>;
}
```

Si tu componente modifica variables externas durante el render, este doble renderizado lo hará evidente porque verás el efecto duplicado.

### 2. Doble ejecución de efectos

Los `useEffect` también se ejecutan, se limpian, y se ejecutan de nuevo:

```jsx
useEffect(() => {
  console.log('Efecto ejecutado');  // Verás esto 2 veces
  
  return () => {
    console.log('Cleanup ejecutado');  // También se ejecuta
  };
}, []);
```

Esto verifica que tu **cleanup** (limpieza) está bien implementada. Si olvidas limpiar una suscripción o un timer, verás el bug inmediatamente.

### 3. Detección de APIs obsoletas

StrictMode te avisa si estás usando APIs legacy que serán eliminadas en futuras versiones de React (como `findDOMNode`, `componentWillMount`, etc.).

## ¿Por qué veo console.log duplicados?

El efecto más confuso para principiantes: si haces un `console.log()` en tu componente y lo ves duplicado en la consola, **no es un bug** — es StrictMode verificando que tu componente es puro.

```jsx
function App() {
  console.log('App renderizado');  // Aparece 2 veces en desarrollo
  return <h1>Hola</h1>;
}
```

Si los dos resultados son iguales, todo está bien. Si son diferentes, tienes un problema que StrictMode te está ayudando a detectar.

## Importante: Solo afecta desarrollo

**Nada de esto afecta al build de producción.** StrictMode solo activa estas verificaciones cuando estás desarrollando (`npm run dev`).

En producción (`npm run build` + deploy), todo se ejecuta una sola vez, como esperas. StrictMode desaparece por completo del bundle final.

```
Desarrollo (npm run dev):           Producción (npm run build):
─────────────────────────           ────────────────────────────
StrictMode ACTIVO                   StrictMode INACTIVO
- Componentes renderizados 2x       - Componentes renderizados 1x
- Efectos ejecutados 2x             - Efectos ejecutados 1x
- console.log aparece 2 veces       - console.log aparece 1 vez
- Verificaciones activas            - Sin verificaciones extra
```

## ¿Debería quitarlo?

**No.** StrictMode existe para ayudarte a encontrar bugs antes de que lleguen a producción. Los desarrolladores experimentados lo dejan activado porque:

1. No afecta el rendimiento en producción
2. Detecta problemas comunes temprano
3. Prepara tu código para futuras versiones de React

Si el doble console.log te molesta mucho, puedes usar las DevTools del navegador para filtrar mensajes duplicados, pero no quites StrictMode.
