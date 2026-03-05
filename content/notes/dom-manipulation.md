---
id: dom-manipulation
title: "Manipulación del DOM con JavaScript Vanilla"
category: JavaScript Fundamentals
order: 3
---

Antes de React, manipulábamos el DOM directamente. Esto se conoce como programación **imperativa**: le decimos al navegador *exactamente* qué pasos seguir.

```javascript
// Programación Imperativa - Manipulación directa del DOM
const container = document.getElementById('app');

// Crear elemento
const titulo = document.createElement('h1');
titulo.className = 'titulo';
titulo.textContent = 'Hola Mundo';

// Insertar en el DOM
container.appendChild(titulo);

// Para actualizar, debemos hacerlo manualmente
function actualizarTitulo(nuevoTexto) {
  titulo.textContent = nuevoTexto;
}
```

El problema con este enfoque es que debemos gestionar **manualmente** cada cambio en la UI. A medida que la aplicación crece, esto se vuelve difícil de mantener.
