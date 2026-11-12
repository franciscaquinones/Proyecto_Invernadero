import { iniciarSesion, registrarUsuario } from "./api.js"; // Llamamos a las funciones de la api

const FormLogin = document.getElementById("Form_Login");

if (FormLogin) {

    const Mensaje = document.getElementById("Mensaje_Login"); // Para ponerle texto abajo
    const Boton = FormLogin.querySelector('input[type="submit"]'); // Toma el boton de enviar

    FormLogin.addEventListener("submit", async function(E) { // Cacha cuando se envia

        E.preventDefault(); // Evita que se recargue la página

        if (Boton.disabled) {
            return;
        } // evita los spameos al enviar

        const Correo = document.getElementById("Correo").value.trim();
        const Contra = document.getElementById("Contrasena").value; 
        // sacamos los valores y al correo le sacamos los espacios de inicio o fin

        if (Correo === "" || Contra.trim() === "") {
            Mensaje.textContent = "Debes completar el correo y la contraseña.";
            return;
        } // si estan vacios tira error

        Boton.disabled = true; // Apaga el boton para que no se spamee
        Mensaje.textContent = "Comprobando credenciales..."; // Mensaje de carga

        try {

            const Respuesta = await iniciarSesion({ correo: Correo, contrasena: Contra });
            // Comprueba las credenciales con los mocks o el local

            if (!Respuesta.ok) {
                Mensaje.textContent = Respuesta.error;
                return;
            } // devuelve mensaje en caso de error

            Mensaje.textContent = "Sesión iniciada correctamente.";

            if (Respuesta.data.rol === "administrador") {
                window.location.href = "admin.html";
            }
            else {
                window.location.href = "dashboard.html";
            } // redirecciones 

        }
        catch {
            Mensaje.textContent = "No se pudo iniciar sesión. Intenta nuevamente.";
        } // en caso de que algo falle te muestra esto

        finally {
            Boton.disabled = false;
        } // activa denuevo el boton en caso de que algo falle

    });

}


const FormRegistro = document.getElementById("Form_Reg");

if (FormRegistro) {

    const Mensaje = document.getElementById("Mensaje_Registro");
    const Boton = FormRegistro.querySelector('input[type="submit"]');

    FormRegistro.addEventListener("submit", async function(E) {
        E.preventDefault();
        if (Boton.disabled) {return;}
        const Nombre = document.getElementById("Nombre").value.trim();
        const Apellido = document.getElementById("Apellido").value.trim();
        const Correo = document.getElementById("Correo").value.trim();
        const Contra = document.getElementById("Contrasena").value;
        const ConfirmarContra = document.getElementById("Confirmar_Contrasena").value;

        if (Nombre === "" || Apellido === "" || Correo === "" || Contra.trim() === "" || ConfirmarContra.trim() === "") {
            Mensaje.textContent = "Debes completar todos los campos.";
            return;
        }

        if (Contra !== ConfirmarContra) {
            Mensaje.textContent = "Las contraseñas no coinciden.";
            return;
        }

        Boton.disabled = true;
        Mensaje.textContent = "Creando cuenta...";

        try {

            const Respuesta = await registrarUsuario({
                nombre: Nombre, apellido: Apellido, correo: Correo,
                contrasena: Contra, confirmarContrasena: ConfirmarContra
            });

            if (!Respuesta.ok) {
                Mensaje.textContent = Respuesta.error;
                return;
            }

            Mensaje.textContent = "Cuenta creada correctamente. Ya puedes ingresar desde el enlace Iniciar sesión.";
            FormRegistro.reset();

        }
        catch {
            Mensaje.textContent = "No se pudo crear la cuenta. Intenta nuevamente.";
        }
        finally {
            Boton.disabled = false;
        }

    });

}