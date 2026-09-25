Proyecto Invernadero - Arklay Botanics / Umbrella Corps Botanics
Autores: Francisca Quiñones y Oscar Oviedo

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


En el apartado de la página de iniciar sesión, al utilizar cualquier credencial, se redirigira al Dashboard correspondiente (la vista de los usuarios), pero al ingresar las credenciales: correo: "admin@umbrellabotanics.com" y la clave: "admin", se accederá al apartado de administrador.



Opción Alternativa para ingresar a la página web:

En caso de no funcionar el paso a paso anterior, intentar el siguiente:

1. Revisar tener instalado Git (en caso de no tenerlo, ver instrucciones de parte superior)
2. Abrir una terminal en la app "Git Bash"
3. Repetir paso 1 del paso a paso anterior e ingresar el comando "git clone 'URL_COPIADA'" (reemplazando 'URL_COPIADA' por la url de la pagina) en la terminal de "Git Bash"
4. Luego ingresar comando "cd Proyecto_Invernadero"
5. Luego instalar npm con el comando "npm install"
6. Al instalarse, ingresar el comando "npm run dev"
7. Copiar url del apartado "Local" que aparezca al ingresar el comando (ej: "Local: http://localhost:5173" (se debe copiar "http://localhost:5173" en este caso))
8. Pegar url en navegar preferido y navegar en la página
9. IMPORTANTE no cerrar la terminal de "Git Bash" mientras se navega en la página. una vez finalizado, se puede cerrar sin problema o presionar Ctrl + C para pararlo.
