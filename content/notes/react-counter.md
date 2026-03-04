---
id: react-counter
title: "Ejemplo Práctico: Contador"
category: React
order: 4
---

Veamos la diferencia práctica con un contador simple. Primero la versión imperativa:

```javascript
// IMPERATIVO: Contador con JavaScript Vanilla
let count = 0;
const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');

incrementBtn.addEventListener('click', () => {
  count++;
  counterDisplay.textContent = count; // Actualización manual
});
```

Ahora la versión declarativa con React:

```jsx
// DECLARATIVO: Contador con React
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

En React, cuando `count` cambia, el componente se *re-renderiza* automáticamente. No necesitamos decirle cómo actualizar el DOM.
