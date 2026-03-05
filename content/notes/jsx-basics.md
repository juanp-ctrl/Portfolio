---
id: jsx-basics
title: "JSX: La Ilusión de Escribir HTML en JavaScript"
category: React
order: 11
---

Cuando ven código React por primera vez, seguramente piensan: "¿Eso es HTML dentro de JavaScript?" No lo es. Es **JSX** (JavaScript XML), una extensión de sintaxis que *parece* HTML pero es 100% JavaScript.

```jsx
// Esto es JSX
const elemento = <h1 className="titulo">Hola Mundo</h1>;
```

El navegador **no entiende JSX**. Antes de llegar al navegador, un compilador (Babel o SWC) transforma ese JSX en llamadas a funciones de JavaScript:

```javascript
// Después de la compilación, el JSX anterior se convierte en:
const elemento = React.createElement('h1', { className: 'titulo' }, 'Hola Mundo');
```

Y `React.createElement` retorna un objeto JavaScript plano, que es un nodo del Virtual DOM:

```javascript
// El resultado es un objeto asi:
{
  type: 'h1',
  props: {
    className: 'titulo',
    children: 'Hola Mundo'
  }
}
```
