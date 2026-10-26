# Adaptación de la tabla de cultivos para distintos tamaños

- **Fecha:** 2026-10-26
- **Integrante:** Oscar Oviedo (@oscaroviedo-png)
- **Herramienta y modelo:** ChatGPT (GPT-6)
- **Archivos afectados:**
  - `htmls/cultivos.html` (Incorporación de un contenedor mediante `<div class="Tabla_Contenedor">` alrededor de la tabla de cultivos) (linea 99 - 101, 158 - 161).
  - `csss/Cultivos.css` (Implementación del desplazamiento horizontal de la tabla y definición de su ancho mínimo) (Linea 119 - 130).

## Objetivo

Mejorar la visualización de la tabla de cultivos en dispositivos con pantallas pequeñas, evitando que sus columnas se compriman excesivamente o sobresalgan del diseño de la página, permitiendo que los usuarios puedan consultar toda la información de la tabla mediante desplazamiento horizontal.

## Conversación
### Prompt 1
Holi chati, necesito ayuda con una cosita, mira, tengo en mi pagina de html y css una tabla que tiene muchas columnas, entonces por eso no puedo adaptarla a celulares y pantallas más chicas pq las otras cosas que he adaptado, no tenia problemas en que se fueran hacia abajo, pero al hacerlo en esta tabla, se me va el texto y no se enteinde nada, entonces necesito ayuda a que cuando se achique la pantalla, no se vaya hacia abajo y se pueda desplazar horizontalmente, pero solo la tabla y no todaaa la pagina, noc si me entiendes, pero necesito ayuda con eso, noc si necesites algun fragmento de mi codigo, pero necesito adaptar una `<table>` alsjfaklsgksj

### Respuesta 1
¡HOLIIII! 💚🌱 ¡SÍÍÍ, TE ENTIENDO PERFECTAMENTE! JAJAJA.

Por lo que me cuentas, tienes una tabla HTML con muchas columnas y, cuando intentas adaptarla a celulares, el contenido queda demasiado comprimido, los textos se desordenan y termina siendo difícil leer la información.

Y claro, a diferencia de otros elementos de una página, no siempre conviene que las columnas de una tabla se acomoden una debajo de otra, porque perderías la estructura que permite relacionar los datos con sus encabezados.

¡Pero tranqui, porque podemos solucionar eso solamente con HTML y CSS!

La idea es que la tabla mantenga su distribución horizontal, pero que puedas deslizarla hacia los lados cuando la pantalla sea demasiado pequeña, sin desplazar toda la página.

## 1. Agregar un contenedor alrededor de la tabla en HTML

Lo primero que te recomiendo es envolver tu `<table>` dentro de un `<div>`.

Por ejemplo:

```

<section id="Cultivos">
    <h2>Mis Cultivos:</h2>

    <div class="Tabla_Contenedor">

        <table>
            <thead>
                <!-- Encabezados de tu tabla -->
            </thead>

            <tbody>
                <!-- Filas y datos de tu tabla -->
            </tbody>
        </table>

    </div>

</section>

```

¡Ojo! No necesitas cambiar las columnas ni el contenido de tu tabla.

Lo único que estamos agregando es:

```
<div class="Tabla_Contenedor">
```

Antes de la tabla, y su correspondiente:

```
</div>
```

Después de la tabla.

Este contenedor nos permitirá controlar el desplazamiento horizontal de manera independiente.

## 2. Agregar los estilos al CSS

Ahora viene la parte importante. Agrega lo siguiente a tu archivo CSS:

```

.Tabla_Contenedor {
    width: 100%;
    overflow-x: auto;
}

#Cultivos table {
    min-width: 750px;
}

```

¡Y CON ESO YA TENEMOS LA SOLUCIÓN PRINCIPAL! 💚

El primer bloque controla el desplazamiento horizontal, mientras que el segundo evita que la tabla se comprima demasiado.

## 3. ¿Cómo se vería el resultado?

Por ejemplo, imagina que tu tabla tiene seis columnas, pero estás viendo la página desde un celular.

Vista de la tabla en una pantalla pequeña

| Nombre     | Tipo       | Estado        | Cuarentena | Fecha de inicio | Acciones  |
| ---------- | ---------- | ------------- | ---------- | --------------- | --------- |
| Cultivo 01 | Medicinal  | Activo        | 2/10       | 20/10/2026      | Modificar |
| Cultivo 02 | Ornamental | En Desarrollo | 4/10       | 21/10/2026      | Modificar |

Desplázate horizontalmente dentro de la tabla para ver las demás columnas.

De esta manera, el usuario puede consultar toda la información sin que los textos tengan que comprimirse para caber en la pantalla.

## 4. ¿Qué hace cada propiedad CSS?

| Propiedad           | Explicación                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `.Tabla_Contenedor` | Selecciona el contenedor que agregamos alrededor de la tabla.                                   |
| `width: 100%`       | Hace que el contenedor ocupe todo el ancho disponible de su elemento padre.                     |
| `overflow-x: auto`  | Permite el desplazamiento horizontal dentro del contenedor cuando el contenido excede su ancho. |
| `#Cultivos table`   | Selecciona las tablas ubicadas dentro del elemento que tiene `id="Cultivos"`.                   |
| `min-width: 750px`  | Establece un ancho mínimo de 750 píxeles para que las columnas no se compriman excesivamente.   |

### ¿Por qué utilizamos `overflow-x: auto`?

Esta es la propiedad principal de nuestra solución:

```
overflow-x: auto;
```

Cuando el contenido es más ancho que el contenedor, el navegador permite desplazarse horizontalmente para visualizarlo.

En cambio, cuando la tabla cabe dentro del espacio disponible, no es necesario realizar ese desplazamiento.

Lo importante es que el desbordamiento se controla dentro de `Tabla_Contenedor` y no directamente sobre toda la página.

### ¿Y para qué sirve `min-width: 750px`?

```
#Cultivos table {
    min-width: 750px;
}
```

Esta propiedad impide que el ancho de la tabla sea inferior a 750 píxeles.

Por ejemplo, si estás viendo la página desde un celular de 375 píxeles de ancho, la tabla conservará su ancho mínimo, pero el contenedor permitirá desplazarse para visualizar sus columnas.

El valor `750px` es una referencia inicial. Puedes aumentarlo o disminuirlo según la cantidad de columnas y el espacio que necesiten sus contenidos.

## 5. ¿Necesitamos utilizar una media query?

¡Y aquí viene algo interesante! No es necesario utilizar una media query para esta solución.

Como el contenedor utiliza `overflow-x: auto`, el navegador puede gestionar el desplazamiento automáticamente dependiendo del espacio disponible.

Por ejemplo:

- En computadores, si la tabla cabe dentro de su sección, se mostrará normalmente.
- En tablets, si la tabla supera el ancho disponible, se podrá desplazar horizontalmente.
- En celulares, la tabla conservará su ancho mínimo y permitirá consultar todas sus columnas desplazándose.

Por lo tanto, podemos mantener esta solución fuera de los bloques `@media`.

Puedes utilizar las herramientas de desarrollador del navegador (`F12`) y activar el modo de dispositivo para simular el ancho de un celular.

¡Y LISTOOOO! JAJAJA 💚🌱

Con estas modificaciones podrás adaptar tu tabla a pantallas pequeñas sin desordenar sus columnas ni modificar su contenido.

Además, la solución requiere muy pocos cambios: solamente agregar un `<div>` alrededor de la tabla y dos reglas CSS.

¡Así los usuarios podrán desplazarse horizontalmente para consultar la información, mientras el resto de la página permanece dentro del ancho de la pantalla!


## Qué se incorporó al proyecto

Siguiendo las indicaciones de la IA, se incorporó un elemento `<div>` con la clase `Tabla_Contenedor` alrededor de la tabla de cultivos, permitiendo establecer un comportamiento independiente para su visualización.

En el archivo CSS, se agregó el selector `.Tabla_Contenedor`, usando la propiedad `width: 100%` para que el contenedor ocupara el ancho disponible dentro de su sección.

También se incorporó la propiedad `overflow-x: auto`, que permite realizar un desplazamiento horizontal dentro del contenedor cuando la tabla supera el espacio disponible, evitando que sea necesario desplazar horizontalmente toda la página para visualizar su contenido.

Mediante el selector `#Cultivos table`, se estableció la propiedad `min-width: 750px`, con el objetivo de mantener un ancho mínimo para la tabla y evitar que sus columnas se compriman demasiado al utilizar pantallas pequeñas.

Ambas modificaciones permiten que la tabla conserve una distribución adecuada de sus columnas, mientras que el contenedor proporciona la posibilidad de desplazarse horizontalmente cuando el tamaño de la pantalla no permite mostrar toda la información.

La solución se implementó mediante HTML y CSS, sin modificar los datos contenidos en la tabla ni incorporar funcionalidades adicionales mediante JavaScript.

## Verificación

Para comprobar el funcionamiento de la solución, se consideran las siguientes pruebas:

1. Comprobar que la tabla de cultivos se visualice correctamente en pantallas grandes y mantenga su distribución original.
2. Reducir el ancho de la ventana del navegador para verificar que la tabla conserve su ancho mínimo.
3. Revisar que, en pantallas pequeñas, sea posible desplazarse horizontalmente dentro del contenedor para visualizar todas las columnas.
4. Comprobar que el desplazamiento horizontal se limite al contenedor de la tabla y no provoque un desbordamiento horizontal de toda la página.
5. Verificar que los textos, encabezados y botones de la tabla continúen siendo visibles y utilizables.
6. Comprobar que los botones de modificar y eliminar cultivos mantengan su funcionamiento después de incorporar el contenedor.
7. Revisar que la tabla conserve su apariencia y que no se produzcan superposiciones entre columnas al cambiar el tamaño de la pantalla.