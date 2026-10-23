# Implementación de un fondo difuminado mediante CSS

- **Fecha:** 2026-10-22
- **Integrante:** Oscar Oviedo (@oscaroviedo-png)
- **Herramienta y modelo:** ChatGPT (GPT-6)
- **Archivos afectados:**
  - `csss/Estilo_Pub.css` (implementación del fondo difuminado mediante `body::before`, líneas 5 a 23).

## Objetivo

Mejorar la apariencia visual de la página principal de Arklay Botanics mediante la implementación de un fondo con efecto de desenfoque, manteniendo la imagen fija y evitando que el texto y los demás elementos de la página se vean afectados.

## Conversación
### Prompt 1
Holi chati, estoy haciendo una pagina web y le estoy dando estilo con css, pero tengo un problema con el fondo, actualmente esta fijo en una imagen, pero siento que resalta mucho y he intentado difuminarla para que se integre mejor con el fondo, pero no he podido, cuando lo hago se me mueven el resto de elementos de la pagina y se vee peor que antes (probablemente sea porque estoy trabajando en el body directo, pero no entiendo como hacerlo para no romper todo) al configurar el puro fondo, me podrias ayudar porfis, te paso el fragmento de codigo que tengo actualmente:

body {
    min-height: 100vh;
    background-image: url("Fondo.jpeg");
    background-size: cover;
    background-attachment: fixed;
}


### Respuesta 1
¡Holiiii! 💚🌱 ¡Claro que sí! Entiendo lo que te está pasando. Y efectivamente, el problema podría estar relacionado con que estás intentando aplicar el efecto directamente sobre el body.

Cuando utilizas filter: blur() sobre el body, el navegador puede terminar desenfocando todo su contenido, incluyendo textos, imágenes, botones y otros elementos.

Lo que necesitamos es separar visualmente la imagen de fondo del resto de la página, para que solamente se aplique el desenfoque a la imagen.
1. Utilizar body::before para crear un fondo independiente
En CSS existe algo llamado pseudoelemento, que permite crear elementos visuales sin necesidad de agregarlos directamente al HTML.

En este caso utilizaremos body::before para crear una capa que contendrá nuestra imagen de fondo.

Te recomiendo reemplazar tu código actual por el siguiente:
body {
    min-height: 100vh;
}

body::before {
    content: "";
    position: fixed;
    inset: -10px;

    background:
        linear-gradient(
            rgba(10, 40, 20, 0.35),
            rgba(10, 40, 20, 0.35)
        ),
        url("Fondo.jpeg");

    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
}


2. ¿Qué hace cada parte del código?
Te explico las propiedades principales:
Propiedad	Explicación
body::before	Crea una capa visual independiente dentro del body.
content: "";	Permite generar el pseudoelemento sin agregar texto.
position: fixed;	Mantiene la capa fija en la pantalla, incluso cuando haces scroll.
inset: -10px;	Extiende el fondo ligeramente fuera de los bordes de la pantalla para evitar bordes visibles al desenfocarlo.
linear-gradient()	Agrega una capa de color verde semitransparente sobre la imagen.
background-size: cover;	Hace que la imagen cubra todo el fondo disponible.
background-position: center;	Mantiene la imagen centrada.
filter: blur(8px);	Aplica el efecto de desenfoque únicamente a esta capa.
z-index: -1;	Coloca la capa detrás del contenido de la página en el orden de apilamiento.

¿Por qué esto soluciona tu problema?
La diferencia principal está en dónde aplicamos el desenfoque.

Antes: intentabas modificar el fondo desde el body, lo que podía afectar también a los elementos contenidos dentro de él si utilizabas filter directamente.

Ahora: aplicamos el desenfoque al pseudoelemento body::before, que contiene la imagen y funciona como una capa separada.

De esta manera, los textos, botones y secciones pueden mantenerse nítidos mientras la imagen permanece difuminada.
3. ¿Para qué sirve el degradado verde?
Quizás notaste que agregué esta parte:
linear-gradient(
    rgba(10, 40, 20, 0.35),
    rgba(10, 40, 20, 0.35)
)


Esto genera una capa verde semitransparente sobre la fotografía.

El valor 0.35 representa la opacidad de esa capa. Puedes aumentarlo si deseas oscurecer más el fondo o disminuirlo para que la fotografía destaque un poco más.

También puedes ajustar el desenfoque:
filter: blur(8px);


Por ejemplo, blur(4px) genera un efecto más suave, mientras que blur(12px) produce un desenfoque más intenso.
4. ¿Cómo comprobar que funciona?
Una vez reemplazado el código, guarda el archivo CSS y abre la página utilizando Live Server.

Te recomiendo verificar que:
1. La imagen de fondo aparezca difuminada.
2. Los textos, botones y demás elementos conserven su nitidez.
3. El fondo permanezca fijo cuando te desplaces por la página.
4. La imagen cubra toda la pantalla sin dejar bordes visibles.
5. No aparezcan errores relacionados con la carga de la imagen.
No deberías necesitar modificar tu HTML, ya que el pseudoelemento se genera directamente desde CSS.


## Qué se incorporó al proyecto

Originalmente, la imagen de fondo de la página se encontraba aplicada directamente al elemento `body` mediante la propiedad `background-image`, sin ningún efecto de desenfoque.

Siguiendo las indicaciones de la IA, se incorporó un pseudoelemento `body::before` en el archivo `Estilo_Pub.css`, permitiendo crear una capa independiente para mostrar la imagen de fondo.

Se utilizaron las propiedades `position: fixed` para mantener el fondo fijo, `background-size: cover` para adaptar la imagen al tamaño de la pantalla y `filter: blur(8px)` para aplicar el efecto de desenfoque.

Además, se incorporó un degradado verde semitransparente mediante `linear-gradient()` para mantener la identidad visual del proyecto. También se utilizó `inset: -10px` para evitar bordes visibles producidos por el desenfoque y `z-index: -1` para posicionar el fondo detrás del contenido.

La modificación se realizó únicamente en el archivo CSS, sin necesidad de modificar la estructura HTML de la página.

Tambien se adapto la parte de la respuesta relacionada a la ubicación de la imagen, al tener una nueva organización se adapto por nuestra cuenta.

## Verificación

Para comprobar el funcionamiento de la solución, se hicieron las siguientes pruebas:

1. Comprobar que la imagen de fondo se visualice correctamente y presente el efecto de desenfoque.
2. Verificar que el texto, los botones y las secciones de la página mantengan su nitidez.
3. Desplazarse por la página para comprobar que el fondo permanezca fijo.
4. Revisar que la imagen cubra toda la pantalla y que no aparezcan bordes sin fondo debido al desenfoque.

Y todo salio correcto, el fragmento de codigo implementado funciona tal y como se esperaba

(En el apartado de las cosas que se implementaron en el proyecto, se indica la forma en la que se entendieron las modificaciones recomendadas por la IA)