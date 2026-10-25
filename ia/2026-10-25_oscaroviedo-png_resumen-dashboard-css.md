# Organización del resumen en dashboard mediante CSS

- **Fecha:** 2026-10-25
- **Integrante:** Oscar Oviedo (@oscaroviedo-png)
- **Herramienta y modelo:** ChatGPT (GPT-6)
- **Archivos afectados:**
  - Archivo Dashboard.css (organización y adaptación del resumen mediante CSS Grid, además de adaptar vista a otras pantallas) (lineas 1 - 17, 77 - 88, 93 - 109).

## Objetivo

Mejorar la organización visual de la sección de resumen del dashboard mediante CSS Grid, distribuyendo sus elementos de forma ordenada y adaptando la cantidad de columnas según el tamaño de la pantalla, para facilitar su visualización tanto en computadores como en tablets y celulares.

## Conversación (texto completo, sin editar)
### Prompt 1
holi chati, me ayudas con una cosita, tengo una pagina web con un codigo que te dejare al final, necesito que me ayudes con su css, ya que quiero que se vean en columnas distribuidas en horizontal para que se vea mejor visualmente:

<section id="Resumen">

            <h2>Bienvenido al Panel Principal:</h2>
            

            <article>
                <h3>Cantidad Total de Cultivos</h3>
                <p>25</p> <!-- Numeros ficticios, en las siguientes entregas irán números reales -->
            </article>

            <article>
                <h3>Cantidad Total de Sensores</h3>
                <p>80</p> <!-- Numeros ficticios, en las siguientes entregas irán números reales -->
            </article>

            <article>
                <h3>Cantidad Total de Registros</h3>
                <p>777</p> <!-- Numeros ficticios, en las siguientes entregas irán números reales -->
            </article>

        </section>

### Respuesta 1
¡Holiiii! 💚🌱 ¡Siiii, claro que te ayudo! JAJAJA.

Por lo que veo en tu código HTML, tienes una sección llamada Resumen que contiene un título y tres elementos <article> con información sobre cultivos, sensores y registros.

Actualmente quieres que esos tres elementos se distribuyan horizontalmente, uno al lado del otro, en lugar de aparecer uno debajo del otro.

¡Para eso podemos utilizar CSS Grid! Es una herramienta de CSS que permite organizar elementos mediante filas y columnas, sin necesidad de modificar tu HTML.
1. Organizar el resumen en tres columnas
Te recomiendo agregar lo siguiente a tu CSS:

#Resumen {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

#Resumen > h2 {
    grid-column: 1 / -1;
    margin: 0 0 10px;
    font-size: 28px;
    color: #eeeeee;
}



Con esto, los tres artículos se distribuirán en columnas del mismo ancho, mientras que el título aparecerá sobre ellos y ocupará todo el espacio horizontal disponible.
2. ¿Cómo se vería el resultado?
Bienvenido al Panel Principal:
Cantidad Total de Cultivos
25


Cantidad Total de Sensores
80


Cantidad Total de Registros
777



Representación ilustrativa de la distribución con tres tarjetas.
¡Así cada dato tendrá su propio espacio y el resumen se verá mucho más organizado!
3. ¿Qué hace cada propiedad?
Te explico las principales:
Propiedad	Función
display: grid	Convierte la sección en una cuadrícula.
grid-template-columns	Define la cantidad y el tamaño de las columnas.
repeat(3, minmax(0, 1fr))	Crea tres columnas de igual proporción.
gap: 20px	Deja 20 píxeles de separación entre los elementos.
margin-bottom: 30px	Agrega espacio debajo de la sección.
grid-column: 1 / -1	Hace que el título ocupe todas las columnas.
margin: 0 0 10px	Ajusta los márgenes del título.
font-size: 28px	Establece el tamaño del título.
color: #eeeeee	Le da un color gris muy claro.

4. ¿Por qué utilizamos repeat(3, minmax(0, 1fr))?
Esta es probablemente la parte más importante del código.
grid-template-columns: repeat(3, minmax(0, 1fr));


Vamos por partes:
- repeat(3, ...) indica que queremos tres columnas.
- 1fr representa una fracción del espacio disponible.
- minmax(0, 1fr) permite que cada columna pueda reducirse hasta un ancho mínimo de cero y distribuya equitativamente el espacio disponible.
Como tenemos tres columnas de 1fr, cada una recibe la misma proporción del espacio restante después de considerar las separaciones.

Esto es útil porque no necesitamos establecer un ancho fijo en píxeles para cada tarjeta.
5. ¿Y para qué sirve grid-column: 1 / -1?
Esta propiedad se aplica al título:
#Resumen > h2 {
    grid-column: 1 / -1;
}


En CSS Grid, las columnas se delimitan mediante líneas.
- 1 representa la primera línea de la cuadrícula.
- -1 representa la última línea.
Por lo tanto, al utilizar 1 / -1, hacemos que el título se extienda desde el inicio hasta el final de la cuadrícula.

Esto evita que el título ocupe únicamente el espacio de la primera tarjeta y permite que los tres artículos queden organizados en la siguiente fila.
6. ¿Cómo comprobar que funciona?
Una vez agregado el CSS, guarda el archivo y abre la página utilizando Live Server.

Te recomiendo comprobar que:
1. El título «Bienvenido al Panel Principal» aparezca sobre las tarjetas.
2. Las tres tarjetas estén distribuidas horizontalmente.
3. Las columnas tengan el mismo ancho.
4. Exista una separación uniforme entre las tarjetas.
5. Los artículos conserven sus estilos de fondo, bordes y texto, si ya los tienes definidos.
Un detalle importante: por ahora estamos configurando tres columnas para la distribución general. En pantallas pequeñas, como celulares, puede que no exista espacio suficiente para mostrarlas cómodamente. Eso se puede solucionar después mediante @media, sin cambiar la estructura HTML.

¡Y listoooo! 💚🌱 Con estas dos reglas CSS deberías conseguir que el resumen de tu dashboard se vea en tres columnas, con el título ocupando todo el ancho superior y la información mejor organizada.

### Prompt 2
entiendo, me gusto muchisimo como quedo, muchas gracias, ahora me podrias ayudar a que estos cambios hechos se vean bien en pantallas con @media (max-width: 900px) y @media (max-width: 600px), para que cuando se vea en pantallas chicas, cambie la distribucion de las columnas porfis

### Respuesta 2
¡Holiiii! 💚🌱 ¡Siiii, claro que te ayudo! JAJAJA. Me alegra que te haya gustado cómo quedó el resumen.

Y tienes toda la razón: aunque las tres columnas se ven bien en computadores, cuando la pantalla es más pequeña puede que las tarjetas queden demasiado estrechas y el contenido no se vea correctamente.

¡Podemos solucionar eso utilizando las dos media queries que mencionaste, sin modificar el HTML ni los estilos que ya implementamos!
1. Adaptar el resumen a pantallas medianas (900px)
Para pantallas de 900 píxeles o menos, te recomiendo cambiar la distribución de tres columnas a dos columnas.

Además, como tenemos tres tarjetas, podemos hacer que la última ocupe todo el ancho disponible en una segunda fila.

Agrega lo siguiente:

@media (max-width: 900px) {

    #Resumen {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    #Resumen article:last-of-type {
        grid-column: 1 / -1;
    }
}



¿Cómo se vería?
Bienvenido al Panel Principal:
Cultivos
25


Sensores
80


Registros
777



Ejemplo de distribución con dos columnas.
La primera fila contiene dos tarjetas y la segunda contiene una tarjeta que ocupa ambas columnas.

Esto permite aprovechar mejor el espacio disponible.
2. Adaptar el resumen a celulares (600px)
Ahora, para las pantallas de 600 píxeles o menos, lo más recomendable es mostrar las tarjetas una debajo de otra, ocupando una sola columna.

También podemos reducir un poco la separación entre las tarjetas y ajustar el título para que se vea mejor.

Agrega esta segunda media query después de la anterior:

@media (max-width: 600px) {

    #Resumen {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    #Resumen article:last-of-type {
        grid-column: auto;
    }

    #Resumen > h2 {
        font-size: 24px;
        text-align: center;
    }
}



¿Cómo se vería?
Bienvenido al Panel Principal:
Cantidad Total de Cultivos
25

Cantidad Total de Sensores
80

Cantidad Total de Registros
777

Ejemplo de distribución vertical para celulares.
Así las tarjetas tendrán más espacio para mostrar sus títulos y cantidades.
3. ¿Qué hace cada propiedad nueva?
Te explico las más importantes:
Propiedad	Función
repeat(2, minmax(0, 1fr))	Crea dos columnas del mismo ancho.
article:last-of-type	Selecciona el último artículo de su tipo dentro del resumen.
grid-column: 1 / -1	Hace que la última tarjeta ocupe todas las columnas.
grid-template-columns: 1fr	Cambia la cuadrícula a una sola columna.
grid-column: auto	Devuelve la última tarjeta a su distribución automática.
gap: 14px	Reduce la separación entre elementos.
font-size: 24px	Disminuye el tamaño del título.
text-align: center	Centra el texto del título.

Un detalle interesante es el uso de grid-column: auto.

En la primera media query le indicamos a la última tarjeta que ocupe dos columnas. Sin embargo, cuando pasamos a una sola columna en celulares, necesitamos quitar ese comportamiento.

Por eso utilizamos:
#Resumen article:last-of-type {
    grid-column: auto;
}


Así evitamos que la última tarjeta conserve una distribución pensada para pantallas más grandes.
4. ¿Cómo funcionan ambas media queries juntas?
Con los estilos que hemos agregado, el resumen tendrá este comportamiento:
Ancho de pantalla	Distribución
Más de 900px	Tres columnas
Entre 601px y 900px	Dos columnas y la última tarjeta ocupando ambas
600px o menos	Una sola columna

¡Importante! Las media queries deben mantenerse en ese orden: primero la de 900px y después la de 600px.

Esto se debe a que, cuando la pantalla mide 600 píxeles o menos, ambas condiciones se cumplen. Al colocar la de 600 después, sus reglas pueden sobrescribir las anteriores cuando corresponda.
5. ¿Cómo comprobar que funciona?
Una vez agregados los cambios al CSS, guarda el archivo y abre la página mediante Live Server.

Te recomiendo verificar lo siguiente:
1. En pantallas grandes, las tres tarjetas deben aparecer horizontalmente.
2. Al reducir la pantalla a 900 píxeles, deben aparecer dos tarjetas arriba y una ocupando todo el ancho debajo.
3. A 600 píxeles o menos, las tres tarjetas deben aparecer una debajo de otra.
4. El título debe reducir su tamaño y centrarse en celulares.
5. Las tarjetas no deben superponerse ni generar desplazamiento horizontal.
Puedes utilizar las herramientas de desarrollador del navegador (F12) para probar diferentes tamaños de pantalla.

¡Y LISTOOOO! 💚🌱

Con estas dos media queries tu resumen podrá adaptarse a computadores, tablets y celulares sin necesidad de modificar tu HTML.

Además, como estamos utilizando CSS Grid, mantenemos la misma estructura y simplemente cambiamos la distribución de los elementos dependiendo del espacio disponible.

¡Así tu dashboard debería verse mucho más ordenado en diferentes dispositivos! JAJAJA.



## Qué se incorporó al proyecto

Se incorporaron estilos CSS para organizar la sección de resumen del dashboard mediante una cuadrícula adaptable a diferentes tamaños de pantalla.

Utilizando el selector `#Resumen`, se aplicó `display: grid` junto con `grid-template-columns: repeat(3, minmax(0, 1fr))`, permitiendo distribuir las tarjetas del resumen en tres columnas de igual proporción en pantallas grandes.

También se incorporaron las propiedades `gap: 20px` para separar los elementos y `margin-bottom: 30px` para mantener una distancia respecto al contenido ubicado debajo.

Mediante el selector `#Resumen > h2`, se utilizó `grid-column: 1 / -1` para conseguir que el título ocupara todo el ancho de la cuadrícula, además de ajustar su tamaño, color y márgenes.

Para adaptar el resumen a pantallas medianas, se utilizó una media query con `max-width: 900px`, modificando la distribución a dos columnas mediante `grid-template-columns: repeat(2, minmax(0, 1fr))`.

Se utilizó el selector `#Resumen article:last-of-type` junto con `grid-column: 1 / -1` para que la última tarjeta ocupara ambas columnas cuando fuera necesario, evitando una distribución visualmente desequilibrada en el diseño de tres tarjetas.

Finalmente, se incorporó una media query con `max-width: 600px` para adaptar el resumen a celulares. En este caso, se estableció una sola columna mediante `grid-template-columns: 1fr`, se redujo la separación entre tarjetas a `14px` y se utilizó `grid-column: auto` para restablecer el comportamiento normal de la última tarjeta.

También se ajustó el título del resumen, reduciendo su tamaño a `24px` y centrando el texto mediante `text-align: center`.

La implementación permitió organizar las tarjetas del resumen de forma adaptable utilizando únicamente CSS, sin modificar la estructura HTML ni incorporar lógica adicional de JavaScript.

## Verificación

1. Comprobar que las tarjetas del resumen se distribuyan en tres columnas en pantallas grandes.
2. Reducir el ancho de la ventana a 900 píxeles o menos y verificar que las tarjetas se distribuyan en dos columnas.
3. Revisar que cuando existan tres tarjetas, la última ocupe ambas columnas en pantallas medianas.
4. Reducir el ancho de la ventana a 600 píxeles o menos y comprobar que las tarjetas se organicen en una sola columna.
5. Verificar que el título del resumen ocupe todo el ancho de la cuadrícula y se adapte correctamente en celulares.
6. Comprobar que la separación entre tarjetas disminuya correctamente en pantallas pequeñas.
7. Revisar que los elementos no se superpongan ni se genere un desplazamiento horizontal.