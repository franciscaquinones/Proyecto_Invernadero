Proyecto Invernadero - Arklay Botanics / Umbrella Corps Botanics
Autores: Francisca Quiñones y Oscar Oviedo

Descripción del Proyecto:

Proyecto web desarrollado para gestionar y supervisar un invernadero de manera simulada.

La aplicación permite registrar usuarios, iniciar sesión, administrar cultivos y sensores, consultar registros históricos y visualizar información general del invernadero. También cuenta con un apartado administrativo para gestionar usuarios y consultar estadísticas globales del sistema.

Para simular el funcionamiento de un servidor, el proyecto utiliza archivos JSON (mocks) como datos iniciales y una API desarrollada en JavaScript. Esta permite realizar operaciones asíncronas, validar información y conservar los cambios mediante localStorage

(La estetica del proyecto, simula una interzar de colores fuertes y brillantes para el público a modo de fachada y al entrar a las "instalaciones", se definen los tonos rojos y oscuros)

Tecnologías Utilizadas:

| Tecnología | Uso en el Proyecto |
|---|---|
| Html | Estructura de las páginas web |
| CSS | Diseño visual, estilos y adaptación a distintas pantallas |
| JavaScript | Interacciones, formularios y funcionamiento de la aplicación |
| Alpine.js | Gestión de estados y funcionamiento dinámico de información |
| Chart.js | Visualización de gráficos de los registros de sensores |
| .JSON | Almacenamiento de los datos iniciales simulados |
| localStorage | Persistencia de sesiones y modificaciones de datos |
| Live Server | Ejecución del proyecto mediante un servidor local |
| Vite | Alternativa para ejecutar el proyecto utilizando npm |

Alpine.js y Chart.js se incorporan mediante CDN en las páginas que los utilizan. La API simulada se desarrolla mediante módulos JavaScript.
(No requiere instalación previa externa y funciona tanto con Live Server, como con npm)

Requisitos previos para visualizar la página web:


* Se requiere tener instalado "Visual Studio Code" (en caso de no tenerlo, descargarlo de este link: "https://code.visualstudio.com/Download?_exp_download=d53503e735" (para windows o mac, según dispositivo en el que se use))
* Dentro de visual studio code, se requiere la extensión "Live Server" (en caso de no tenerlo, es necesario abrir Visual Studio Code y presionar el atajo "Ctrl + Shift + X" y en el buscador ingresar el siguiente texto: "ritwickdey.LiveServer")
* Se requiere tener instalado "Git" (en caso de no tenerlo, descargarlo de este link: "https://git-scm.com/install/windows" (para windows o mac, según dispositivo en el que se use))

Instrucciones para visualizar la página web:

1. En la presente página ("https://github.com/franciscaquinones/Proyecto_Invernadero"), hacer clic en "<>Code" (Botón verde) y en el apartado de "Local", seleccionar la opción "HTTPS" y copiar el link (en caso de no funcionar, tratar con "https://github.com/franciscaquinones/Proyecto_Invernadero.git").
2. Abrir Visual Studio Code y presionar el botón en la parte superior de los 3 puntos ("..."), luego se debe conducir a "Terminal" y presionar "New terminal" o "Nuevo terminal" según idioma establecido.
3. En la terminal abierta, se debe ingresar el siguiente comando "git clone 'url_Copiada'", reemplazando 'url_Copiada' por la url obtenida en el paso 1, luego enter.
4. En la misma terminal, ingresar el comando "cd Proyecto_Invernadero" para acceder a la carpeta del proyecto.
5. Una vez dentro de la carpeta, ver la barra izquierda desplegada y buscar el archivo llamado "index.html".
6. Una vez encontrado el archivo "index.html", presionar clic derecho encima de él y hacer clic en opción llamada "Open with Live Server" y se abrirá la página web para navegar en ella.
7. EN CASO DE NO APARECER LA OPCIÓN "Open with Live Server": Revisar barra superior y salir del modo seguro, para esto en la notificación abierta en la parte superior ("Restricted Mode is intended..."), se debe presionar la opción "Manage", luego en el apartado de "In a Trusted Folder", presionar en botón azul "Trust". Por último, volver a tratar pasos 5 y 6.


En el apartado de la página de iniciar sesión, para entrar, basta con registrarse con algún correo con estructura valida y se podrá entrar como nuevo usuario. Para entrar con un usuario existente, se recomienda entrar con las siguientes credenciales: correo: "jill@umbrellabotanics.try" y la clave: "Jill123" Una de las credenciales de administrador es: correo: "admin@umbrellabotanics.com" y la clave: "admin", se accederá al apartado de administrador. (Para ver más detalles sobre el resto de usuarios y sus contraseñas, revisar el mock de Usuarios)



Opción Alternativa para ingresar a la página web:

En caso de no funcionar el paso a paso anterior para visualizar la página, intentar el siguiente:

1. Revisar tener instalado Git (en caso de no tenerlo, ver instrucciones de parte superior)
2. Abrir una terminal en la app "Git Bash"
3. Repetir paso 1 del paso a paso anterior e ingresar el comando "git clone 'URL_COPIADA'" (reemplazando 'URL_COPIADA' por la url de la pagina) en la terminal de "Git Bash"
4. Luego ingresar comando "cd Proyecto_Invernadero"
5. Luego instalar npm con el comando "npm install"
6. Al instalarse, ingresar el comando "npm run dev"
7. Copiar url del apartado "Local" que aparezca al ingresar el comando (ej: "Local: http://localhost:5173" (se debe copiar "http://localhost:5173" en este caso))
8. Pegar url en navegar preferido y navegar en la página
9. IMPORTANTE no cerrar la terminal de "Git Bash" mientras se navega en la página. una vez finalizado, se puede cerrar sin problema o presionar Ctrl + C para pararlo.

Vistas disponibles:

| Vista | Ruta | Cómo acceder |
|---|---|---|
| Inicio | index.html | Al ingresar a la página, página pública, la primera página visible |
| Inicio de sesión | htmls/login.html | Al ingresar a la página, en la esquina superior derecha desde el index |
| Registro | htmls/registro.html | Al ingresar a la página de incio de sesion y precionar registro en la parte inferior |
| Dashboard | htmls/dashboard.html | Después de iniciar sesión como usuario |
| Cultivos | htmls/cultivos.html | Desde el menú de navegación de usuario |
| Sensores | htmls/sensores.html | Desde el menú de navegación de usuario |
| Historial | htmls/historial.html | Desde el menú de navegación de usuario |
| Perfil | htmls/perfil.html | Desde cualquier página dentro del invernadero, al presionar el nombre de la persona |
| Administración | htmls/admin.html | Después de iniciar sesión como administrador |

Las vistas privadas requieren una sesión válida. El acceso a las funciones administrativas está restringido según el rol del usuario.


Endpoints:

| Método | Función | Descripción |
|---|---|---|
| POST | registrarUsuario | Registra un usuario y crea su invernadero. |
| POST | iniciarSesion| Verifica las credenciales e inicia sesión. |
| GET | obtenerSesion | Obtiene los datos de la sesión activa. |
| POST | cerrarSesion| Cierra la sesión actual. |
| GET | obtenerPerfil| Consulta el perfil y el invernadero del usuario. |
| PUT | actualizarPerfil | Actualiza nombre, apellido y correo. |
| GET | obtenerInvernadero | Consulta un invernadero al que se tenga acceso. |
| GET | obtenerCultivos | Consulta los cultivos con filtros y ordenamiento. |
| GET | obtenerCultivo| Consulta un cultivo específico. |
| POST | crearCultivo| Registra un nuevo cultivo. |
| PUT | editarCultivo | Modifica un cultivo existente. |
| DELETE | eliminarCultivo | Elimina un cultivo. |
| GET | obtenerSensores| Consulta los sensores y sus últimas mediciones. |
| POST | crearSensor | Registra un nuevo sensor. |
| PUT | editarSensor | Modifica un sensor existente. |
| DELETE | eliminarSensor| Elimina un sensor y sus registros. |
| GET | obtenerRegistros| Consulta los registros según los filtros. |
| GET | obtenerDatosGrafico | Obtiene los datos para generar un gráfico. |
| GET | obtenerResumen | Consulta totales, promedios y actividad reciente. |
| GET | obtenerUsuarios | Consulta y filtra los usuarios registrados. |
| GET | obtenerRecursosUsuario | Consulta los recursos asociados a un usuario. |
| DELETE | eliminarUsuario | Elimina una cuenta y sus recursos asociados. |
| GET | obtenerEstadisticasGlobales | Consulta las estadísticas generales del sistema. |

Uso de IA
Durante el proyecto se utilizaron herramientas de inteligencia artificial para resolver dudas o consultas y los registros respectivos se encuentran en ia/README.md.