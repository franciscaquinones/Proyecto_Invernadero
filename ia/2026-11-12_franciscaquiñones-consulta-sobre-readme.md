# Consulta sobre menu desplegable

- **Fecha:** 2026-11-12
- **Integrante:** Francisca Quiñones
- **Herramienta y modelo:** ChatGPT (GPT-6)
- **Archivos afectados:**
  - Readme.md

## Objetivo

Entender como se podia hacer una tabla en el readme

## Conversación
### Prompt 1
tengo que añadir una tabla en el readme.md como lo hago, como tengo que escribirlo para que me quede como una tabla

### Respuesta 1
Para crear una tabla en tu README.md, debes utilizar la sintaxis de tablas de Markdown. No necesitas instalar nada adicional ni utilizar HTML, ya que GitHub reconoce este formato automáticamente.

Primero debes definir los encabezados de las columnas utilizando barras verticales (|) para separar cada una. Después, debes agregar una segunda fila con guiones (-), que sirve para indicar la separación entre los encabezados y el contenido.

Por ejemplo, si quieres crear una tabla con información de distintas vistas de tu proyecto, puedes escribir:

| Vista | Descripción | Archivo |
|-------|-------------|---------|
| Login | Inicio de sesión | login.html |
| Cultivos | Administración de cultivos | cultivos.html |
| Sensores | Administración de sensores | sensores.html |

En este ejemplo:

La primera fila contiene los nombres de las columnas.

La segunda fila contiene los guiones que separan los encabezados del contenido.

Las siguientes filas contienen la información que quieres mostrar.

Cada barra vertical (|) separa una columna.

Cuando guardes el archivo y lo visualices en GitHub, Markdown transformará ese código en una tabla con filas y columnas.

También puedes agregar tantas filas y columnas como necesites, siempre manteniendo la misma estructura.

### Prompt 2
y puedo hacer mas de una tabla en el mismo readme? no las reconoce solo como una?

### Respuesta 2

¡Sí! Puedes crear todas las tablas que necesites dentro de un mismo archivo README.md. GitHub no las reconoce como una sola tabla automáticamente, sino que identifica cada tabla por separado siempre que estén correctamente separadas.

Por ejemplo, puedes tener una tabla para los requisitos del proyecto y otra para las vistas disponibles:

## Requisitos

| Herramienta | Descripción |
|-------------|-------------|
| Visual Studio Code | Editor de código |
| Git | Control de versiones |

## Vistas disponibles

| Vista | Descripción |
|-------|-------------|
| Login | Inicio de sesión |
| Cultivos | Administración de cultivos |

En este caso, los títulos ## Requisitos y ## Vistas disponibles permiten distinguir las secciones y las tablas.

Lo importante es dejar una línea en blanco entre una tabla y el siguiente contenido. Así Markdown puede reconocer correctamente dónde termina una tabla y dónde comienza la siguiente.

Por lo tanto, puedes organizar tu README con varias tablas sin ningún problema. Te recomiendo separarlas por títulos según la información que quieras presentar, para que la documentación sea más clara y ordenada.
## Qué se incorporó al proyecto
Se incorporo la tabla en el readme.md y se aclararon las dudas sobre como hacerla o si se iban a juntar

## Verificación

Para comprobar el funcionamiento de la solución, se hicieron las siguientes pruebas:

1. se guardaron los datos del readme al realizar la tabla
2. se abrio el archivo haciando click derecho y seleccionando open preview
3. Se comprobó que todo estuviera bien organizado y que las tablas no se hayan juntado

