---
slug: flame-graphs-in-app-performance
title: 'Flame graphs en el rendimiento de aplicaciones'
excerpt: '¿Sabías que nuestras aplicaciones web producen llamas?'
date: '2025-10-27'
readingTime: 5
tags: ['Gráficos', 'Web', 'Rendimiento']
category: 'Rendimiento'
coverImage: '/images/blog/flame-graphs-in-app-performance/cover.webp'
---

¿Sabías que nuestras aplicaciones web producen llamas (flames en inglés)?

Para hablar de _flame graphs_ (gráficos de llama) hay que hablar de Brendan Gregg. Brendan es un ingeniero informático autor de dos libros, _Systems Performance_ y _BPF Performance Tools_, un ingeniero de rendimiento muy respetado; este tipo:

![Brendan Gregg, ingeniero de rendimiento](/images/blog/flame-graphs-in-app-performance/Brendan-Gregg.webp '400')

En diciembre de 2011, Brendan trabajaba en un problema de rendimiento de MySQL en Netflix y necesitaba entender el uso de CPU de forma rápida y en profundidad. El visualizador de aquel momento ponía el paso del tiempo en el eje x, y la visualización final quedaba demasiado densa para leerla cuando abarcaba varios segundos; así que descartó el tiempo en el eje x y lo sustituyó por la frecuencia relativa de cada llamada a función, ordenada alfabéticamente, y hizo que el eje y mostrara la profundidad de la pila de llamadas de abajo arriba. Los otros visualizadores usaban colores aleatorios para diferenciar marcos (_frames_); él eligió en cambio colores cálidos al principio porque explicaban por qué las CPU estaban «calientes», y como se parecía a llamas, pronto pasó a conocerse como **flame graphs** (_gráficos de llama_).

![Ejemplo de visualización de flame graph](/images/blog/flame-graphs-in-app-performance/cover.webp '520')

Cada rectángulo de color es una función; cuanto más ancho es, con más frecuencia apareció en las muestras del perfilado. Las «llamas» suben desde abajo (funciones raíz) hacia arriba, lo que permite identificar cuellos de botella de rendimiento de un vistazo al localizar los marcos más anchos y las «torres» más altas.

Con todo este trabajo, tiene sentido que ahora trabaje en Intel: allí se necesita mucha CPU y mucho trabajo de rendimiento.

Bien; usemos ya una definición más formal de _flame graph_:

Un _flame graph_ es ==una visualización interactiva de datos jerárquicos de seguimiento de pila (_stack trace_) que muestra qué rutas de código consumen más recursos== (CPU, memoria, etc.) en un programa.

Piensa en un _flame graph_ como una hoguera: la base del fuego (abajo) representa el punto de entrada de tu programa, y las llamas suben a través de distintas llamadas a función. Las partes más calientes y brillantes del fuego (los rectángulos más anchos) son donde tu código **pasa más tiempo**: esos son tus «puntos calientes» (_hot spots_) de rendimiento.

Igual que ves qué zonas del fuego arden más, puedes ver al instante qué rutas de código «queman» más ciclos de CPU.

## Flame charts

El uso de _flame charts_ se introdujo en Chrome en el inspector web de WebKit en abril de 2013, inspirado en los _flame graphs_, pero funcionan de otra manera: estos gráficos están basados en el tiempo, no en la frecuencia. La definición formal sería:

Un _flame chart_ es una visualización jerárquica ordenada en el tiempo que muestra las pilas de llamadas a lo largo del tiempo, donde ==el eje x representa el tiempo cronológico durante la sesión de perfilado y el eje y representa la profundidad de la pila de llamadas==.

**Eje X** — Tiempo:

- Representa el **paso cronológico del tiempo** durante tu sesión de perfilado

- De izquierda a derecha = **del inicio al fin** de la grabación

- La posición indica **cuándo** se llamó a una función

- Esta es la diferencia clave respecto a los _flame graphs_ (que ordenan alfabéticamente)

**Eje Y** — Profundidad de la pila de llamadas:

- Representa la **profundidad** de las llamadas a función en la pila

- Chrome DevTools usa orientación **invertida** (_icicle chart_):

- De **arriba a abajo** = raíz a hoja (poco profundo a más profundo)

- **Filas superiores**: funciones de entrada (p. ej., hilo principal, manejadores de eventos)

- **Filas inferiores**: llamadas muy anidadas (funciones hoja que hacen el trabajo real)

- Cada nivel **hacia abajo** es una función llamada por la de encima

#### Estrategia de lectura

Identifica cuellos de botella: busca **rectángulos anchos** a lo largo de la línea de tiempo:

- Bloques anchos = funciones de **larga duración**

- Bloques anchos repetidos = funciones costosas **llamadas con frecuencia**

- Huecos = tiempo inactivo o **espera**

Mira también:

- **Pilas profundas** (muchas filas hacia abajo): un anidamiento muy profundo puede indicar recursión ineficiente o cadenas de llamadas largas

- **Bloques regulares**: patrones constantes pueden indicar _polling_ o fotogramas de animación (`requestAnimationFrame`)

- **Bordes irregulares**: cambios de contexto o tareas interrumpidas

- **Barras anchas en cualquier nivel**: cuellos de botella de rendimiento; empieza investigando por ahí

**Ejemplo**

![Ejemplo de flame chart en Chrome DevTools](/images/blog/flame-graphs-in-app-performance/flame-chart-example.webp '800')

```
TOP     ┌─────────────────────────────────────┐
        │ Main — http://localhost:3000        │ ← Raíz: hilo principal
        └─────────────────────────────────────┘
              ↓ (llama)
        ┌─────────────────────────────────────┐
        │ Evaluate script                     │ ← Ejecución del script
        └─────────────────────────────────────┘
              ↓ (llama)
        ┌─────────────────────────────────────┐
        │ goToWork (barra rosa, ~150 ms)      │ ← Tu función
        └─────────────────────────────────────┘
              ↓ (llama)
        ┌──────────────┬─────────────────────┐
        │grabSomeCoffee│   petADog           │ ← Funciones anidadas
        └──────────────┴─────────────────────┘
              ↓ (llama)
BOTTOM  ┌──────────────┐
        │ orderCoffee  │                      ← Llamada anidada más profunda
        └──────────────┘
```

Con estos dos conceptos claros, podemos recordar que los **flame charts** son como ver una **película** de la ejecución de tu código fotograma a fotograma, mientras que los **flame graphs** son como mirar un **resumen** de qué escenas aparecieron con más frecuencia.

#### Referencias

https://www.brendangregg.com/flamegraphs.html

https://www.developerway.com/posts/client-side-rendering-flame-graph#part3

https://developer.chrome.com/docs/devtools/performance/reference#flame-chart
