const FormLogin = document.getElementById("Form_Login"); //Crea variable del formulario de login
if (FormLogin) { // "Si existe la variable" (evita que hayan problemas en otras paginas pq no existe)

    FormLogin.addEventListener("submit", function(E) {

        E.preventDefault(); //Evita qe se recargue la pagina

        const Correo = document.getElementById("Correo").value.trim();
        const Contra = document.getElementById("Contrasena").value;

        if (Correo === "" || Contra.trim() === "") {

            alert("Debes ingresar un correo electrónico y contraseña válidos.");
            return;

        }

        if (
            Correo === "admin@umbrellabotanics.com" &&
            Contra === "admin"
        ) { // Esto simula el inicio de un admin, pero no será implementado en la versión final pq es inseguro.
            window.location.href = "admin.html";
        }
        else {
            window.location.href = "dashboard.html";
        }

    });

}

const FormRegistro = document.getElementById("Form_Reg");
if (FormRegistro) {

    FormRegistro.addEventListener("submit", function(E) {

        E.preventDefault();

        const Nombre = document.getElementById("Nombre").value.trim();
        const Apellido = document.getElementById("Apellido").value.trim();
        const Correo = document.getElementById("Correo").value.trim();
        const Contra = document.getElementById("Contrasena").value;
        const ConfirmarContra = document.getElementById("Confirmar_Contrasena").value;

        if (Nombre === "" || Apellido === "" || Correo === "" || Contra.trim() === "" || ConfirmarContra.trim() === "") 
        {
            alert("Debes completar todos los campos.");
            return;
        }

        if (Contra !== ConfirmarContra) {

            alert("Las contraseñas no coinciden.");
            return;

        }
        
        alert("Bienvenido " + Nombre + ", tu cuenta ha sido creada con éxito. Será redirigido para iniciar sesión.");
        window.location.href = "login.html";

    });

}