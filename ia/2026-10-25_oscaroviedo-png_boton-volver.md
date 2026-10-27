# Implementación de estilos para el botón de volver atrás mediante CSS

- **Fecha:** 2026-10-25
- **Integrante:** Oscar Oviedo (@oscaroviedo-png)
- **Herramienta y modelo:** ChatGPT (GPT-6)
- **Archivos afectados:**
  - `csss/Estilo_Form.css` (estilos de enlaces y del botón de volver atrás, líneas 156 a 196).

## Objetivo

Mejorar la apariencia visual del enlace utilizado para volver a una página anterior, haciendo que se visualice como un botón, se encuentre centrado y cuente con efectos interactivos al pasar el cursor.

## Conversación
### Prompt 1
hola chati, me ayudas con una cosita pequeña respecto al css de una pagina web, mira, tengo un boton para volver atras que lo encuentro un poco soso, siento que le falta algo, podrias ayudarme a modificarlo para que se vea como un botón distinto que indique que es para volver atras, solo necesito un poco de ayuda con el css, pero en html es un section y dentro una etiqueta de a, me ayudas porfis

### Respuesta 1
¡Holiiii! 💚🌱 ¡Siii, claro que te ayudo! JAJAJA.

Por lo que me comentas, tienes un enlace <a> dentro de una sección <section>, pero quieres que se vea más como un botón de navegación para volver atrás, en lugar de un enlace de texto común.

¡Podemos hacerlo solamente con CSS, sin necesidad de cambiar la estructura de tu HTML!
1. Darle apariencia de botón al enlace
Te recomiendo utilizar este código:

section > a {
    display: block;
    width: fit-content;
    max-width: 100%;
    box-sizing: border-box;
    margin: 18px auto 0;
    padding: 10px 18px;
    color: #bbbbbb;
    text-decoration: none;
    text-align: center;
    border: 1px solid #555555;
    border-radius: 6px;
    transition: 0.2s;
}

section > a:hover {
    color: white;
    background-color: #353535;
    border-color: #7a2020;
}

section a:focus-visible {
    outline: 2px solid #7a2020;
    outline-offset: 3px;
}



Con esto tendrás un botón centrado, con bordes redondeados y una apariencia discreta, pero que cambia cuando el usuario interactúa con él.
2. ¿Qué hace cada propiedad?
Te explico las más importantes:
Propiedad	Función
section > a	Selecciona los enlaces que sean hijos directos de una sección.
display: block	Permite tratar el enlace como un bloque.
width: fit-content	Ajusta el ancho del botón al contenido.
max-width: 100%	Evita que el botón supere el ancho disponible del contenedor.
box-sizing: border-box	Incluye los bordes y el relleno dentro del cálculo del ancho.
margin: 18px auto 0	Separa el botón del contenido superior y lo centra horizontalmente.
padding: 10px 18px	Agrega espacio alrededor del texto.
border	Dibuja un borde para diferenciarlo de un enlace normal.
border-radius: 6px	Redondea ligeramente sus esquinas.
transition: 0.2s	Suaviza los cambios de apariencia.

3. ¿Para qué sirve :hover?
Esta parte:
section > a:hover {
    color: white;
    background-color: #353535;
    border-color: #7a2020;
}


Se activa cuando colocas el cursor encima del botón.

El texto cambia a blanco, el fondo se vuelve gris oscuro y el borde adquiere un tono rojizo.

De esta manera, el usuario recibe una señal visual de que puede interactuar con el botón.
4. ¿Y qué significa :focus-visible?
section a:focus-visible {
    outline: 2px solid #7a2020;
    outline-offset: 3px;
}


Esto permite que, cuando alguien navega por la página utilizando el teclado, aparezca un contorno alrededor del enlace que tiene seleccionado.

Es una pequeña mejora de accesibilidad, porque ayuda a identificar qué elemento está recibiendo el foco.
5. ¿Qué pasa si también tengo enlaces dentro de párrafos?
Si tienes otros enlaces dentro de la sección y no quieres que tengan apariencia de botón, puedes diferenciarlos utilizando otro selector:
section p a {
    color: #b12d2d;
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: 0.2s;
}

section p a:hover {
    color: #ee3737;
}


Así, los enlaces dentro de los párrafos conservarán una apariencia de texto, mientras que los enlaces que sean hijos directos de section tendrán apariencia de botón.

¡Ojo con un detalle! El selector section > a solamente funcionará si el enlace está directamente dentro del section. Si está dentro de un <p> o de un <div>, necesitaremos adaptar el selector.
6. ¿Cómo comprobar que funciona?
Una vez agregado el código, guarda tu CSS y abre la página utilizando Live Server.

Te recomiendo comprobar que:
1. El enlace de volver atrás tenga apariencia de botón y esté centrado.
2. Al pasar el cursor, cambien sus colores suavemente.
3. Al utilizar la tecla Tab, se pueda identificar el enlace mediante el contorno.
4. En pantallas pequeñas, el botón no sobresalga de su sección.
5. Al hacer clic, el enlace siga llevando a la página indicada por su atributo href.
Importante: este código modifica solamente la apariencia del enlace. La navegación sigue dependiendo de su href, por lo que no necesitas incorporar JavaScript para darle estilo.

¡Y listooo! 💚🌱 Con estos cambios tendrás un botón de volver atrás más distinguible y agradable visualmente, sin modificar el funcionamiento de tu página.

## Qué se incorporó al proyecto

Se incorporaron estilos CSS para mejorar la presentación de los enlaces de navegación presentes en las secciones de los formularios.

Mediante el selector `section > a`, se definió la apariencia del enlace utilizado como botón de volver atrás. Se empleó `display: block` junto con `width: fit-content` y `margin: 18px auto 0` para permitir que el botón se ajuste al tamaño de su contenido y quede centrado horizontalmente.

También se utilizaron propiedades como `padding`, `border`, `border-radius` y `text-align` para mejorar la presentación visual del botón, manteniendo una apariencia acorde con el diseño de los formularios.

Se incorporó el selector `section > a:hover` para modificar los colores del botón cuando el usuario posiciona el cursor sobre él, utilizando `transition: 0.2s` para suavizar los cambios visuales.

Se agregó el selector `section a:focus-visible`, que permite mostrar un contorno alrededor de los enlaces cuando reciben el foco mediante navegación por teclado, facilitando su identificación.

Por último, se incluyeron estilos mediante `section p a` y `section p a:hover` para diferenciar visualmente los enlaces contenidos dentro de párrafos de aquellos utilizados como botones de navegación.

La modificación consistió en mejorar la presentación e interacción visual de los enlaces mediante CSS, sin incorporar lógica adicional de navegación.

## Verificación

Para comprobar el funcionamiento de la solución, se consideran las siguientes pruebas:

1. Comprobar que el enlace utilizado para volver atrás se visualice como un botón.
2. Verificar que el botón se encuentre centrado horizontalmente dentro de la sección correspondiente.
3. Posicionar el cursor sobre el botón para comprobar que cambien sus colores.
4. Verificar que la transición entre los estados del botón se visualice correctamente.
5. Revisar que el botón no sobresalga de su contenedor en pantallas pequeñas.
6. Comprobar que el enlace dirija a la página correspondiente al hacer clic.