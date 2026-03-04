---
id: declarative-vs-imperative
title: "Declarativo vs Imperativo"
category: React
order: 3
---

**Imperativo**: Describes *cómo* hacer algo, paso a paso. Como dar instrucciones detalladas para llegar a un lugar.

```javascript
// IMPERATIVO: Le decimos al navegador cada paso
const lista = document.createElement('ul');
const items = ['Manzana', 'Banana', 'Naranja'];

items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  lista.appendChild(li);
});

document.body.appendChild(lista);
```

**Declarativo**: Describes *qué* quieres obtener. Como pedir un Uber: dices el destino, no cómo llegar.

```jsx
// DECLARATIVO: Describimos qué queremos ver
function ListaFrutas() {
  const items = ['Manzana', 'Banana', 'Naranja'];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

React se encarga de los *detalles de implementación*. Nosotros solo describimos el resultado final y React actualiza el DOM de forma eficiente.
