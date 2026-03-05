---
id: critical-rendering-path
title: "El Critical Rendering Path: De la URL a los Píxeles"
category: Web Fundamentals
order: 1
---

Antes de entender React, necesitamos entender qué pasa cuando un usuario escribe una URL y presiona Enter. Este proceso se llama **Critical Rendering Path** (Ruta Crítica de Renderizado).

## ¿Qué es HTTP?

**HTTP** (HyperText Transfer Protocol) es el "idioma" que usan los navegadores y servidores para comunicarse. Cuando tu navegador quiere una página web, envía un mensaje HTTP al servidor pidiendo esa página, y el servidor responde con otro mensaje HTTP que contiene el contenido.

## El viaje de 6 pasos

### Paso 1: Petición HTTP

El navegador envía una petición al servidor. Por ejemplo, `GET /` significa "dame la página principal".

### Paso 2: Respuesta del servidor

El servidor responde con un archivo HTML — el "esqueleto" de la página.

### Paso 3: Parsing del HTML

**Parsing** significa leer el texto del HTML y convertirlo en una estructura que la computadora entiende. El navegador lee el HTML línea por línea y va construyendo el DOM.

### Paso 4: Construcción del DOM

El **DOM** (Document Object Model) es un árbol de objetos que representa cada elemento de la página. Cada `&lt;div&gt;`, `&lt;p&gt;`, `&lt;h1&gt;` se convierte en un "nodo" de este árbol.

### Paso 5: Carga de CSS y JavaScript

Cuando el navegador encuentra tags `&lt;link&gt;` (CSS) o `&lt;script&gt;` (JavaScript), hace peticiones adicionales para descargar esos archivos.

### Paso 6: Renderizado

Con el DOM y el CSS listos, el navegador ejecuta tres operaciones:

- **Layout/Reflow**: Calcula el tamaño y posición de cada elemento
- **Paint**: Dibuja los píxeles (colores, bordes, sombras, texto)
- **Composite**: Combina las diferentes capas en la imagen final

```
Usuario escribe URL
       ↓
Navegador envía petición HTTP → Servidor
       ↓
Servidor responde con HTML
       ↓
Navegador parsea HTML → construye DOM
       ↓
Navegador descarga CSS y JS
       ↓
Layout → Paint → Composite
       ↓
Usuario ve la página
```

## El problema con sitios tradicionales

En un sitio web tradicional, si quieres cambiar algo en la página, el usuario tiene que hacer **otra petición al servidor**. El servidor genera un HTML completamente nuevo, y el navegador tiene que repetir todo el proceso: parsear, construir el DOM, hacer layout, pintar...

**La pregunta clave:** ¿Y si pudiéramos modificar lo que el usuario ve _sin_ tener que pedirle una nueva página al servidor? ¿Y si JavaScript pudiera encargarse de actualizar solo lo que cambió?
