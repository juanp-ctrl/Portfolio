---
id: dom-tree
title: "El DOM: El Árbol que el Navegador Entiende"
category: Web Fundamentals
order: 2
---

El **DOM** (Document Object Model - Modelo de Objeto del Documento) es una interfaz estándar del navegador. Es la representación en memoria de tu documento HTML como un **árbol de objetos** que JavaScript puede leer y manipular.

## Visualizando el DOM como un árbol

Cuando el navegador lee este HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Hola</h1>
    <p>Bienvenido</p>
    <div>
      <span>Texto</span>
      <button>Clic</button>
    </div>
  </body>
</html>
```

Construye este árbol en memoria:

```
document
└── html
    ├── head
    │   └── title ("Mi Página")
    └── body
        ├── h1 ("Hola")
        ├── p ("Bienvenido")
        └── div
            ├── span ("Texto")
            └── button ("Clic")
```

Cada elemento HTML se convierte en un **nodo** del árbol. Los nodos tienen relaciones: padres, hijos y hermanos.

## Manipulando el DOM con JavaScript

JavaScript puede leer y modificar este árbol directamente:

```javascript
// Buscar elementos
const titulo = document.querySelector('h1');
const boton = document.getElementById('miBoton');
const parrafos = document.querySelectorAll('p');

// Crear elementos nuevos
const nuevoParrafo = document.createElement('p');
nuevoParrafo.textContent = 'Hola desde JavaScript';

// Insertar en el árbol
document.body.appendChild(nuevoParrafo);

// Modificar elementos existentes
titulo.textContent = 'Nuevo título';
titulo.className = 'destacado';

// Eliminar elementos
titulo.remove();
```

## El problema de rendimiento

Cada vez que modificas el DOM, el navegador puede necesitar:

1. **Reflow (recalcular layout)**: Si cambias el tamaño o posición de un elemento, el navegador debe recalcular la posición de todos los elementos afectados
2. **Repaint (repintar)**: El navegador debe volver a dibujar los píxeles de los elementos que cambiaron

En aplicaciones pequeñas esto no importa. Pero en aplicaciones complejas con muchos elementos y actualizaciones frecuentes (como Facebook, Instagram, o cualquier app moderna), estas operaciones se vuelven **muy costosas en rendimiento**.

## El problema de mantenimiento

Además del rendimiento, escribir todas esas instrucciones manuales (`createElement`, `appendChild`, `removeChild`, `setAttribute`, etc.) se vuelve **extremadamente difícil de mantener**:

```javascript
// Imagina hacer esto para una lista de 100 usuarios que cambia constantemente
const lista = document.createElement('ul');
usuarios.forEach(usuario => {
  const li = document.createElement('li');
  const nombre = document.createElement('span');
  nombre.textContent = usuario.nombre;
  const boton = document.createElement('button');
  boton.textContent = 'Eliminar';
  boton.addEventListener('click', () => eliminarUsuario(usuario.id));
  li.appendChild(nombre);
  li.appendChild(boton);
  lista.appendChild(li);
});
// Y luego actualizar cuando cambian los datos...
```

Este código imperativo es propenso a errores y difícil de seguir. Por eso necesitamos herramientas como React que gestionen estas actualizaciones de forma inteligente.
