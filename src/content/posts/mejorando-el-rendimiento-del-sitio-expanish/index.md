---
title: Mejorando el rendimiento del sitio web expanish.com
publishedAt: 2021-11-29
featuredImage: ./featured.png
tags: [performance, web, lighthouse]
seo:
  title: Mejorando el rendimiento del sitio web expanish.com
  description: Descubre las mejoras que se hicieron en el sitio web de Expanish para mejorar su rendimiento y velocidad
  type: article
  image: ./meta.png
  keywords: performance, web, expanish, lighthouse, pagespeed, insights
---
## Problema inicial
Uno de los principales problemas a resolver en este proyecto es el rendimiento del sitio web. Este derivado de los cambios propuestos por Google a través de lo que hoy conocemos como Core Web Vitals, ya que a partir de ahora los algoritmos de búsqueda de Google penalizarán a las páginas que no tengan buenos valores. A su vez, también se realizaron algunos cambios menores a nivel visual para mejorar la experiencia de navegación por parte del usuario.

Estos son los resultados obtenidos desde la herramienta de [medición de rendimiento](https://web.dev/measure/) sobre los valores de la página principal:

![Página principal: Prueba de rendimiento](./expanish-performance-homepage.png)

Y por acá, los resultados de la páginas internas para visualizar las diferentes sedes de las escuelas existentes:
![School Page: Prueba de rendimiento en la página de la sede en Barcelona](./performance-school-page.png)

Algunas de las oportunidades que se encontraron dentro del proyecto están relacionadas con los siguientes puntos:
- Reducir el tiempo de respuesta del servidor.
- Reducir el CSS que no está siendo usado.
- Retrasar la carga de las imágenes que no se ven en pantalla.

![Oportunidades y diagnósticos obtenidos desde web.dev](./expanish-oportunities-diagnostics.png)

También, algunas consideraciones que se deben tomar en cuenta para poder mejorar este resultado son:
- Revisar la afectación a la métrica *Largest Contenful Paint*.
- El tamaño dentro de la estructura web que excede el DOM.
- Y, minimizar las tareas que se ejecutan en el hilo principal de JavaScript.

## Descubrimientos
Después de haber verificado a detalle el proyecto y su comportamiento, llegue a la conclusión de que el problema principal que afectaba el *tiempo de respuesta del servidor* era el uso de Server-Side Rendering para hacer la construcción bajo demanda sobre cada una de las páginas para las sedes, donde además se estaba realizando una solicitud a la API de Prismic para obtener la información a renderear, por lo que agregaba tiempo de carga a la página.

De la misma forma, en la página principal se estaba utilizando la función `getStaticProps` de `next.js` para crear las páginas estáticas con base a los datos obtenidos desde el CMS, por lo que también afectaba a la métrica *Total Blocking Time* y *Time to interactive*.

Para el tema del CSS, se ejecutaron las pruebas de coverage desde las herramientas del navegador para identificar cuantos estilos estaban en uso y nos encontramos que aprox. **63.5%** de los estilos no estaban siendo usados dentro de las páginas, ya que en algunas ocasiones, dichas páginas cargaban incluso estilos que no corresponden a sus secciones o elementos.

Así que como puedes ver, hay mucho que arreglar, así que aquí viene lo bueno.

## Tecnologías a utilizar
La velocidad de carga tiene un impacto fuerte sobre proyectos de e-commerce, ya que es una de las principales razones por la que los usuarios abandonan los sitios web. Por otra parte, el mantener un sitio web rápido y una infraestructura amigable para brindar mantenimiento es parte clave en este proyecto.

El sitio web ya se encuentra construido usando `Next.js` el cual nos brinda herramientas para incrementar el rendimiento de nuestro sitio *out-the-box*, por lo que solo nos concentraremos en cambiar la forma en como se construyen las páginas. Cambiaremos la definición de los estilos de emplear CSS puro a una herramienta `utility-first` como TailwindCSS para aprovechar todas sus ventajas para crear diseños rápidamente, y además, reutilizar los estilos la mayor parte posible.

### De server side a static generation
Dado que la información de las páginas no cambia con frecuencia, todas las páginas están pre-generadas y servidas estáticamente. En ciertos intervalos, los datos se revalidan con el CMS y se actualizan en segundo plano, si es necesario.

Anteriormente, al estar usando `Server Side Rendering` debíamos esperar a que la solicitud a nuestra API resuelva con la información antes de continuar con el proceso de rendering, lo cual provoca que la métrica `Total Blocking Time (TBT)` se vea afectada debido a esa espera.

![Proceso utilizando server-side rendering (Situación actual)](./server-side-rendering-process.png)

Como recordarás tenemos la función `getServerSideProps`, la cual nos permite obtener la información desde el servidor para ser enviada a nuestra aplicación web vía props. Sin embargo, al tener que esperar a que la información esté lista para poder mostrar la página al usuario, afecta a su experiencia y también a que el algoritmo de Google posicione la página.

```js:/pages/[slug].js
// Ejemplo para obtener información de una página por slug
export async function getServerSideProps({ params }) {
  const { data } = await getPageBySlug(params.slug)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page: data,
    }
  }
}
```

Es por ello, que cambiaremos la implementación a utilizar solo páginas estáticas que serán creadas en tiempo de ejecución así cuando el usuario entre a cada una de ellas, las páginas ya estarán creadas brindando una experiencia de carga mucho más amena, y solo si hay la necesidad de crear algún marketplace dentro del sitio, lo haremos utilizando la implementación anterior para separar el propósito de las páginas.

![Proceso utilizando static-site generation (Nueva implementación)](./static-site-generation-process.png)

## Resultados finales
También en el proyecto se realizaron algunas adecuaciones visuales dentro del sitio para reducir la carga visual para el usuario en los menús de navegación, aprovechando de que tenemos un banner en la parte superior del sitio, tuvimos la oportunidad de mover algunos elementos ahí para quitarles un poco de jerarquía y darle más oportunidad al menú principal.

![Mejoras visuales en la navegación del sitio](./expanish-new-navigation.png)

Con los cambios que ocurrieron de `server-side` a `static-generation`, se pudo incrementar hasta un **～40%** la carga del sitio lo cual es increíble, ya que la experiencia del usuario incremento considerablemente, ya que puede interactuar rápidamente con el contenido del sitio.

A su vez, implementamos la estrategia propuesta por Next.js a través de su componente `next/image` para diferir la carga de las imágenes hasta que estás se presenten en pantalla.

![Prueba de rendimiento después de los cambios](./expanish-new-metrics.png)

## Conclusión
El proyecto resultó ser sencillo y complejo a la vez, ya que algunas funcionalidades y estructura del proyecto complicaba en algunas ocasiones brindar un mantenimiento más amigable. Hemos quitado intencionalmente componentes muy pesados e imágenes enormes para simplificar la experiencia, así como también la carga de los recursos utilizados por el widget de búsqueda de cursos. Hasta ahora, podríamos aumentar las tasas de conversión en casi un **30%**.

Por supuesto, todavía hay muchas cosas por mejorar aunque ha sido un gran avance.

![Página principal actual del sitio Expanish](./new-look-and-feel.png)