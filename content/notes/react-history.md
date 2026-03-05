---
id: react-history
title: "La Historia de React: De Facebook al Mundo"
category: React
order: 9
---

React no nació en un laboratorio de investigación. Nació de la frustración de un ingeniero tratando de resolver un problema real.

## El problema de Facebook Ads (2011)

En 2011, los desarrolladores de Facebook enfrentaban un problema serio: la aplicación de **Facebook Ads** estaba creciendo tanto en funcionalidades que su código se volvía inmanejable. Cada nueva feature generaba **actualizaciones en cascada** — un cambio en un lugar afectaba a muchos otros, y el equipo no podía mantener el ritmo. La base de código se estaba desmoronando bajo su propio peso.

## Jordan Walke: El creador de React

**Jordan Walke**, un ingeniero de software en Facebook graduado de la University of Washington, decidió resolver este problema construyendo un prototipo.

Walke se inspiró en **XHP**, una extensión de PHP que Facebook usaba internamente. XHP permitía construir componentes HTML reutilizables de manera más segura, previniendo ataques XSS (Cross-Site Scripting — cuando código malicioso se inyecta en una página web). Su idea fue: _¿y si traemos este concepto de componentes reutilizables al mundo de JavaScript en el navegador?_

## La evolución: F-Bolt → FaxJS → React

El prototipo se llamó primero **"F-Bolt"**, luego fue renombrado a **"FaxJS"** (cuyo código aún se puede encontrar en el GitHub de Walke). FaxJS introdujo ideas que hoy nos parecen obvias pero que en 2011 eran revolucionarias:

- **Renderizado reactivo**: Las vistas se actualizan automáticamente al cambiar el estado
- **Arquitectura declarativa**: Describes qué quieres ver, no cómo construirlo
- **Componentes funcionales**: Piezas de UI reutilizables y componibles

## Los primeros despliegues

- **2011**: FaxJS fue desplegado en el **News Feed de Facebook**
- **2012**: Cuando Facebook adquirió Instagram, Pete Hunt (un ingeniero de Facebook Photos) llevó React al equipo de Instagram y construyó la primera versión del feed web

Instagram fue crucial porque, para que pudiera usar React, tuvieron que **extraerlo del código interno de Facebook**. En cierto sentido, Instagram fue el primer usuario "externo" de React, y ese proceso pavimentó el camino hacia el open source.

## El lanzamiento público (Mayo 2013)

En mayo de 2013, en la **JSConf US**, Jordan Walke presentó React al mundo como proyecto de código abierto.

La comunidad inicialmente fue **escéptica**. La reacción más común fue: _"¿HTML dentro de JavaScript? ¡Eso es una locura!"_ — mezclar markup con lógica parecía ir contra todas las "buenas prácticas" de la época.

Pero la eficiencia del Virtual DOM y la simplicidad del modelo declarativo ganaron a los desarrolladores uno por uno. Hoy, según la encuesta de Stack Overflow de 2025, React es una de las tecnologías web más utilizadas del mundo.

## ¿Qué pasó con Jordan Walke?

En enero de 2021, después de más de una década en Facebook, Walke anunció su salida para fundar su propia empresa. Además de React, Walke también creó **ReasonML**, un lenguaje de programación rápido y type-safe basado en OCaml.

Actualmente trabaja en **Replit**, la plataforma de desarrollo en la nube.

## El legado

La filosofía de **componentes declarativos** que Walke introdujo transformó completamente cómo construimos interfaces de usuario. Ya no pensamos en "manipular el DOM" — pensamos en "describir la UI como función del estado".
