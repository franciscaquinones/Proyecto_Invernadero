# Validación y carga de archivos JSON mediante JS

- **Fecha:** 2026-11-11
- **Integrante:** Oscar Oviedo (@oscaroviedo-png)
- **Herramienta y modelo:** ChatGPT (GPT-6)
- **Archivos afectados:**
  - `jss/api.js` (funciones validarBase() y cargarBase()) (Lineas 169 - 172, 209 - 211, 219 - 224 y 234 - 236).

## Objetivo

Implementar algunos mecanismos necesarios para la validación y carga de los datos de la API simulada mediante JavaScript, usando los archivos JSON (mocks), para obtener los datos de los JSON y conservarlos en localStorage

## Conversación
### Prompt 1

holi chati, necesito ayuda con una cosita de javascript, mira, estoy haciendo una api simulada para mi pagina web y tengo un objeto llamado ARCHIVOS que contiene los nombres de los archivos JSON que utilizare en el proyecto:

const ARCHIVOS = {
    usuarios: "Usuarios.json",
    invernaderos: "Invernaderos.json",
    cultivos: "Cultivos.json",
    sensores: "Sensores.json",
    registros: "Registros_Sensores.json"
};

el tema es que estoy haciendo una funcion llamada validarBase(Base), donde necesito revisar que los datos de cada recurso existan y que sean arreglos, pero no quiero tener que escribir un if para usuarios, otro para cultivos, otro para sensores y asi con cada uno, pq siento que estaria repitiendo mucho codigo.

entonces queria preguntarte si existe alguna forma de recorrer las propiedades del objeto ARCHIVOS y utilizar esos nombres para acceder a las listas correspondientes dentro de Base, para poder validarlas con un mismo ciclo.

me podrias ayudar con esa parte del codigo y explicarme como funciona porfis, pq todavia me confundo un poco con los objetos en javascript KJSHDKJSH

### Respuesta 1

¡HOLIIII! 💚🌱 ¡SÍÍÍ, CLARO QUE TE AYUDO! JAJAJA.

Entiendo lo que necesitas. Tienes un objeto llamado `ARCHIVOS` con los nombres de tus recursos y quieres comprobar que cada uno tenga su correspondiente arreglo dentro de `Base`, pero sin escribir una condición distinta para usuarios, cultivos, sensores, etc.

¡Y sí, existe una forma mucho más práctica de hacerlo utilizando `Object.keys()` junto con un ciclo `for...of`!

## 1. ¿Cómo podemos recorrer los recursos?

Te recomiendo utilizar este código dentro de tu función `validarBase(Base)`:

```

for (const Recurso of Object.keys(ARCHIVOS)) {
    const Lista = Base[Recurso];

    // Resto de validaciones
}

```

Con esto puedes comprobar que todos los recursos definidos en `ARCHIVOS` tengan un arreglo correspondiente dentro de `Base`, sin tener que repetir la misma validación cinco veces.

## 2. ¿Cómo funciona `Object.keys()`?

Partamos por tu objeto:

```
const ARCHIVOS = {
    usuarios: "Usuarios.json",
    invernaderos: "Invernaderos.json",
    cultivos: "Cultivos.json",
    sensores: "Sensores.json",
    registros: "Registros_Sensores.json"
};
```

Cuando escribimos:

```
Object.keys(ARCHIVOS)
```

JavaScript obtiene los nombres de las propiedades del objeto y los devuelve como un arreglo:

```
[
    "usuarios",
    "invernaderos",
    "cultivos",
    "sensores",
    "registros"
]
```

¡Ojo! No devuelve los nombres de los archivos JSON, sino las claves del objeto.

Por eso, al utilizar:

```
for (const Recurso of Object.keys(ARCHIVOS)) {
```

El ciclo `for...of` recorre esas claves una por una.

## 3. ¿Y qué significa `Base[Recurso]`?

Esta es otra parte importante:

```
const Lista = Base[Recurso];
```

En JavaScript podemos acceder a las propiedades de un objeto utilizando corchetes `[]`.

Por ejemplo, si durante la primera iteración `Recurso` contiene `"usuarios"`, entonces:

```
Base[Recurso]
```

Equivale a escribir:

```
Base.usuarios
```

Y cuando `Recurso` contiene `"cultivos"`, equivale a:

```
Base.cultivos
```

Mira cómo cambia en cada iteración:

| Iteración | Valor de `Recurso` | Acceso realizado    |
| --------- | ------------------ | ------------------- |
| 1         | `"usuarios"`       | `Base.usuarios`     |
| 2         | `"invernaderos"`   | `Base.invernaderos` |
| 3         | `"cultivos"`       | `Base.cultivos`     |
| 4         | `"sensores"`       | `Base.sensores`     |
| 5         | `"registros"`      | `Base.registros`    |

De esta manera, la variable `Lista` va recibiendo los datos de cada recurso para que puedas validarlos.

## 4. ¿Por qué conviene hacerlo de esta forma?

La principal ventaja es que evitas repetir código.

En lugar de escribir cinco condiciones similares, utilizas un único ciclo que comprueba todos los recursos definidos en `ARCHIVOS`.

Además, si posteriormente agregas otro recurso al objeto, el ciclo también intentará validarlo automáticamente.

Eso sí, esta comprobación solamente verifica que cada recurso sea un arreglo. No comprueba todavía si sus elementos tienen identificadores válidos, campos obligatorios o relaciones correctas. Esas validaciones puedes realizarlas después.

¡Y LISTOOOO! JAJAJA 💚🌱

Para tu función `validarBase(Base)`, yo utilizaría esta combinación:

```
for (const Recurso of Object.keys(ARCHIVOS)) {
    const Lista = Base[Recurso];
```

Porque te permite recorrer los recursos y acceder dinámicamente a sus listas sin repetir el mismo código.

La idea principal que debes recordar es:

- `Object.keys(ARCHIVOS)` obtiene los nombres de las propiedades.
- `for...of` recorre esos nombres.
- `Base[Recurso]` obtiene los datos correspondientes a cada nombre.

¡Y así ya tienes una base para continuar con las validaciones de tu API simulada! 🌱💚

### Prompt 2

holi chati, siguiendo con mi api simulada de javascript, ahora tengo otra duda con una funcion llamada cargarBase() que estoy haciendo

mira, mi idea es que la primera vez que alguien abra la pagina, los datos se carguen desde los archivos JSON que tengo en la carpeta mocks, pero despues, cuando el usuario haga cambios en los datos, quiero que esos cambios se conserven aunque recargue la pagina

el tema es que no estoy utilizando una base de datos real ni un servidor para guardar los cambios, pq por ahora el proyecto funciona con datos simulados

entonces queria preguntarte si existe alguna forma de revisar desde javascript si el navegador ya tiene una copia de los datos guardada anteriormente, para que la funcion cargarBase() pueda utilizarla en lugar de volver a cargar los archivos JSON

tengo definida una constante llamada CLAVE_DATOS con el valor "api_de_arklay", que quiero utilizar para identificar los datos de mi proyecto

me podrias mostrar como comprobar si existen datos guardados usando esa constante y explicarme como funciona porfis?

### Respuesta 2

¡HOLIIII, OSKARRR! JAJAJA 💚🌱 ¡SÍÍÍ! Lo que quieres hacer es totalmente posible, y JavaScript tiene una herramienta que te sirve justamente para eso: `localStorage`.

Te explico cómo funciona y cómo puedes utilizarlo dentro de tu función `cargarBase()`.

## 1. ¿Qué es `localStorage`?

`localStorage` permite almacenar información directamente en el navegador del usuario.

Lo interesante es que los datos se conservan aunque la persona recargue la página o cierre y vuelva a abrir el navegador.

Esto te sirve para tu API simulada porque no necesitas una base de datos real para conservar los cambios durante las pruebas.

Eso sí, los datos quedan guardados en ese navegador y origen web, no en un servidor compartido entre usuarios.

## 2. ¿Cómo comprobamos si existen datos guardados?

Como ya tienes esta constante:

```
const CLAVE_DATOS = "api_de_arklay";
```

Puedes utilizar el método `getItem()` de `localStorage`:

```
const Guardado = localStorage.getItem(CLAVE_DATOS);
```

Veamos qué ocurre:

- `localStorage` accede al almacenamiento del navegador.
- `getItem()` busca información utilizando una clave.
- `CLAVE_DATOS` indica qué información queremos recuperar.
- `Guardado` almacena el resultado de esa búsqueda.

Si encuentra información asociada a `"api_de_arklay"`, devuelve el contenido guardado como texto.

Si no encuentra nada, devuelve `null`.

## 3. ¿Cómo sabemos si es la primera vez que se carga la página?

Podemos comprobarlo mediante un `if`:

```
const Guardado = localStorage.getItem(CLAVE_DATOS);

if (Guardado !== null) {
    // Ya existen datos almacenados
}
```

La condición:

```
Guardado !== null
```

Significa:

«Si Guardado es distinto de null, entonces existen datos almacenados con esa clave».

Por lo tanto, podemos distinguir dos situaciones:

Primera carga

`Guardado === null`

No existen datos almacenados, así que `cargarBase()` debe obtener los datos iniciales desde los archivos JSON de la carpeta `mocks/`.

Cargas posteriores

`Guardado !== null`

Ya existe una copia almacenada. Entonces podemos recuperar esos datos sin volver a cargar los archivos JSON.

## 4. ¿Cómo recuperamos los datos para utilizarlos?

Hay un pequeño detalle: `localStorage` guarda información como texto, pero tu API necesita trabajar con objetos y arreglos de JavaScript.

Para convertir ese texto nuevamente en datos de JavaScript podemos utilizar `JSON.parse()`.

Por ejemplo:

```
const Guardado = localStorage.getItem(CLAVE_DATOS);

if (Guardado !== null) {
    return JSON.parse(Guardado);
}
```

Aquí ocurre lo siguiente:

1. Buscamos los datos asociados a `CLAVE_DATOS`.
2. Comprobamos si existen.
3. Utilizamos `JSON.parse()` para convertir el texto JSON en datos de JavaScript.
4. Devolvemos esos datos para que la aplicación pueda utilizarlos.

Como tú tienes una función llamada `validarBase()`, también puedes utilizarla para revisar los datos antes de devolverlos:

```
const Guardado = localStorage.getItem(CLAVE_DATOS);

if (Guardado !== null) {
    return validarBase(JSON.parse(Guardado));
}
```

Así, si existe una copia almacenada, la recuperas y compruebas que tenga el formato esperado.

Ten presente que `JSON.parse()` puede producir un error si el contenido guardado no es JSON válido. Más adelante puedes manejar ese caso para mostrar un mensaje adecuado sin sobrescribir los datos originales.

## 5. ¿Y cómo se relaciona esto con `cargarBase()`?

La idea sería organizar tu función de esta manera:

```
async function cargarBase() {

    // Revisamos si ya hay datos guardados
    const Guardado = localStorage.getItem(CLAVE_DATOS);

    if (Guardado !== null) {
        return validarBase(JSON.parse(Guardado));
    }

    // Si no existen datos guardados,
    // continuamos con la carga inicial de los JSON.

}
```

Fíjate que el `return` es importante.

Si existen datos almacenados, la función devuelve esa información y termina su ejecución. Por lo tanto, no continúa con las instrucciones que cargarían nuevamente los archivos JSON.

En cambio, si `Guardado` es `null`, el `if` no se ejecuta y la función sigue con la carga inicial.

## 6. ¿Y cómo guardamos los cambios?

Para que la recuperación funcione, primero tiene que existir información guardada.

Eso se realiza mediante otro método llamado `localStorage.setItem()`.

Por ejemplo:

```
localStorage.setItem(CLAVE_DATOS, JSON.stringify(Base));
```

Esta instrucción convierte el objeto `Base` en texto JSON y lo almacena utilizando la clave `"api_de_arklay"`.

La diferencia principal es:

| Método                   | ¿Qué hace?                                   |
| ------------------------ | -------------------------------------------- |
| `localStorage.getItem()` | Recupera información guardada.               |
| `localStorage.setItem()` | Guarda o actualiza información.              |
| `JSON.parse()`           | Convierte texto JSON en datos de JavaScript. |
| `JSON.stringify()`       | Convierte datos de JavaScript en texto JSON. |

¡Y eso es justamente lo que necesitas para conservar los cambios de tu API simulada!

### Entonces, ¿qué te recomiendo? 💚

Dentro de `cargarBase()`, comenzaría utilizando:

```
const Guardado = localStorage.getItem(CLAVE_DATOS);
```

Y después comprobaría si existe información:

```
if (Guardado !== null) {
    return validarBase(JSON.parse(Guardado));
}
```

De esta manera, tu función solo necesitará leer los archivos JSON cuando todavía no exista una copia guardada en el navegador.

Recuerda que recuperar los datos es solo una parte: también tendrás que guardarlos después de las operaciones que los modifiquen, para que esos cambios realmente se conserven.

¡Y LISTOOOOO! JAJAJA 🌱💚 Ahora ya sabes cómo comprobar si hay datos almacenados y cómo aprovecharlos sin volver a cargar los mocks cada vez que actualizas la página.

### Prompt 3

holi chati, seguimos con mi api, ahora necesito ayuda con otra parte de mi funcion cargarBase()

recuerda el objeto llamado ARCHIVOS donde guardo los nombres de los archivos JSON

tambien la estructura que tengo es una carpeta llamada mocks donde estan todos esos archivos JSON, en el mismo nivel mi archivo de javascript de la api esta dentro de una carpeta llamada jss

el tema es que necesito que mi funcion cargarBase() lea esos archivos JSON para obtener los datos iniciales de la pagina, pero no se muy bien como hacerlo desde javascript

mi idea es recorrer los recursos que tengo definidos en ARCHIVOS y cargar el archivo correspondiente a cada uno, para despues guardar su contenido dentro de un objeto llamado Base

entonces queria preguntarte como podria cargar esos archivos JSON de manera asincrona, utilizando una ruta que tome como referencia la ubicacion de mi archivo javascript y no la de cada pagina HTML

me podrias mostrar un ejemplo de como hacerlo dentro de un ciclo, y explicarme como funciona cada parte porfis? tambien me gustaria saber como detectar si ocurre un error al intentar cargar alguno de los archivos

### Respuesta 3

¡HOLIIII, OSKARRR! JAJAJA 💚🌱 ¡SÍÍÍ! Vamos con esa parte de tu API.

Lo que necesitas es leer automáticamente los archivos JSON de la carpeta `mocks/`, utilizando sus nombres definidos en `ARCHIVOS`, y guardar su contenido dentro de `Base`.

Para hacerlo, podemos combinar `fetch()`, `await`, `new URL()` e `import.meta.url`.

## 1. ¿Cómo cargar los archivos JSON?

Como ya tienes definido el objeto `ARCHIVOS`, puedes utilizar este código dentro de tu función `cargarBase()`:

```

async function cargarBase() {
    const Base = { sesion: null };

    for (const Recurso of Object.keys(ARCHIVOS)) {
        const Archivo = ARCHIVOS[Recurso];
        let Respuesta;

        try {
            Respuesta = await fetch(
                new URL("../mocks/" + Archivo, import.meta.url)
            );
        }
        catch {
            // En caso de un error
        }

        Base[Recurso] = await Respuesta.json();
    }

    return Base;
}

```

Este ejemplo se concentra solamente en cargar los JSON. Después puedes combinarlo con la recuperación de datos desde `localStorage` que revisamos anteriormente.

## 2. ¿Cómo funciona cada parte?

### A. Obtener el nombre del archivo

```
const Archivo = ARCHIVOS[Recurso];
```

Como estamos recorriendo las propiedades de `ARCHIVOS` mediante `Object.keys()`, podemos obtener el nombre de cada archivo.

Por ejemplo, cuando `Recurso` vale `"cultivos"`:

```
ARCHIVOS[Recurso]
```

Devuelve:

```
"Cultivos.json"
```

### B. Construir la ruta con `new URL()` e `import.meta.url`

Esta es la parte más interesante:

```
new URL("../mocks/" + Archivo, import.meta.url)
```

Supongamos que tu proyecto tiene esta estructura:

Proyecto

`jss/`

`api.js`

`mocks/`

Usuarios.json

Invernaderos.json

Cultivos.json

Sensores.json

Registros_Sensores.json

Aquí ocurre lo siguiente:

- `"../mocks/" + Archivo` construye una ruta relativa, por ejemplo `"../mocks/Cultivos.json"`.
- `import.meta.url` obtiene la URL del archivo JavaScript que está ejecutando el código.
- `new URL()` combina ambas para obtener la dirección completa del archivo JSON.

La ventaja es que la ruta se calcula desde `api.js`, no desde la página HTML que lo utiliza.

Por eso te sirve aunque tengas distintas páginas dentro de `htmls/`.

Un detalle importante: `import.meta.url` requiere que tu código se ejecute como módulo JavaScript, por ejemplo utilizando `type="module"`.

### C. Solicitar el archivo con `fetch()` y `await`

```
Respuesta = await fetch(
    new URL("../mocks/" + Archivo, import.meta.url)
);
```

`fetch()` realiza una solicitud para obtener el archivo.

Como esa operación es asíncrona, utilizamos `await` para esperar a que se resuelva antes de continuar.

Por eso también necesitamos declarar nuestra función con `async`:

```
async function cargarBase() {
```

### D. Detectar si ocurrió un error

Utilizamos dos comprobaciones diferentes.

Primero:

```
try {
    Respuesta = await fetch(
        new URL("../mocks/" + Archivo, import.meta.url)
    );
}
catch {
    fallar(503, "No se pudieron cargar los datos iniciales. Intenta nuevamente.");
}
```

El bloque `catch` permite manejar situaciones en las que la solicitud falla, como un problema de red.

Después tenemos:

```
if (!Respuesta.ok) {
    fallar(503, "No se pudieron cargar los datos iniciales. Intenta nuevamente.");
}
```

`Respuesta.ok` indica si la respuesta HTTP fue exitosa.

Esto es importante porque, por ejemplo, si el archivo `Cultivos.json` no existe, el servidor podría responder con un error `404`, pero `fetch()` no necesariamente ejecutará el `catch`.

Por eso comprobamos ambas situaciones.

### E. Convertir el JSON y guardarlo en `Base`

Finalmente:

```
Base[Recurso] = await Respuesta.json();
```

`Respuesta.json()` lee el contenido de la respuesta y lo convierte en datos JavaScript.

Después, `Base[Recurso]` guarda esos datos en la propiedad correspondiente.

Por ejemplo, si estamos cargando `"Cultivos.json"`, esta instrucción equivale a:

```
Base.cultivos = await Respuesta.json();
```

Así, al terminar el ciclo, el objeto `Base` tendrá las listas de usuarios, invernaderos, cultivos, sensores y registros.

## 3. ¿Qué pasa durante la carga completa?

Recorrido de los archivos JSON

Archivo 4 de 5

Sensores.json

Ruta construida:

`../mocks/{pasos[paso].f}`

Propiedad donde se guardará:

`Base.{pasos[paso].r}`

## 4. Un detalle para tener en cuenta

Hay algo que podrías mejorar más adelante: si el archivo existe, pero contiene JSON inválido, `Respuesta.json()` puede producir un error.

Como esa instrucción está fuera del `try...catch`, ese error no se convertirá en el mensaje personalizado que definiste.

No impide que la carga funcione con archivos válidos, pero es algo que conviene considerar cuando revises el manejo de errores de tu API.

También recuerda ejecutar tu página desde un servidor local, como Live Server de Visual Studio Code, y no abriendo directamente el archivo HTML mediante `file://`.

### En resumen 💚

La instrucción principal que necesitas es:

```
Respuesta = await fetch(
    new URL("../mocks/" + Archivo, import.meta.url)
);
```

Con ella puedes obtener cada JSON utilizando una ruta relativa al módulo JavaScript, mientras que `Respuesta.json()` te permite transformar su contenido en los datos que guardarás en `Base`.

¡Y LISTOOOO, JAJAJA! 🌱💚 Así puedes cargar los archivos de tu carpeta `mocks/` automáticamente, sin escribir una solicitud distinta para cada recurso.

## Qué se incorporó al proyecto

Se incorporaron fragmentos de código JavaScript relacionados con la validación, carga y almacenamiento de los datos utilizados por la API simulada del proyecto.

Recorrido de los recursos en validarBase():

Se utilizó un ciclo for...of junto con Object.keys(ARCHIVOS) para recorrer dinámicamente los nombres de las propiedades en el objeto ARCHIVOS.

Mediante Base[Recurso], se obtiene la lista correspondiente a cada recurso, permitiendo utilizar la misma estructura de validación para usuarios, invernaderos, cultivos, sensores y registros, sin necesidad de acceder manualmente a cada arreglo por separado (forma de revisar que se reutilizo en cargarBase() sin IA).

Recuperación de los datos almacenados:

En la función cargarBase(), se incorporó la instrucción localStorage.getItem(CLAVE_DATOS) para consultar si existe una copia de los datos almacenada previamente en el navegador.

Esto permite distinguir entre una primera carga, cuando todavía no existen datos guardados, y una carga posterior en la que se pueden recuperar los datos utilizados anteriormente.

Carga de los archivos JSON:

Para obtener los datos iniciales de los recursos, se incorporó una operación asíncrona utilizando await fetch().

La función utiliza new URL() junto con import.meta.url para construir la dirección de cada archivo JSON tomando como referencia la ubicación del JavaScript.

También se utilizó una variable Respuesta y un bloque try para realizar la solicitud de los archivos, formando parte del proceso de carga de los recursos definidos en ARCHIVOS.

Almacenamiento de los datos:

Finalmente, se incorporó la instrucción localStorage.setItem(CLAVE_DATOS, JSON.stringify(Base)).

Esta permite convertir el objeto que contiene los datos de la aplicación en una cadena JSON y almacenarla en el navegador, de manera que pueda recuperarse durante posteriores cargas de la aplicación.

La implementación usa las funciones de validación existentes en el proyecto y mantiene separadas las operaciones de comprobación de datos, carga inicial y almacenamiento.

## Verificación

Para comprobar el funcionamiento de los fragmentos incorporados, se consideran las siguientes pruebas:

1. Verificar que Object.keys(ARCHIVOS) permita recorrer todos los recursos definidos en el objeto ARCHIVOS.
2. Comprobar que Base[Recurso] obtenga correctamente los arreglos correspondientes a cada recurso.
3. Revisar que, al no existir datos almacenados, cargarBase() obtenga la información inicial desde los archivos JSON de la carpeta mocks/.
4. Comprobar que las rutas construidas mediante new URL() e import.meta.url permitan localizar correctamente los archivos.
5. Verificar que los datos cargados se almacenen en localStorage utilizando la clave configurada.
6. Recargar la aplicación y comprobar que se recuperen los datos previamente guardados.