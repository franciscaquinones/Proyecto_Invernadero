import { cerrarSesion, obtenerSesion } from "./api.js";

const BotonesSalir = document.querySelectorAll("[data-cerrar-sesion]");
const MensajeSesion = document.getElementById("Mensaje_Sesion");
let CerrandoSesion = false;

BotonesSalir.forEach(function(Boton) {
    Boton.addEventListener("click", async function(E) {
        E.preventDefault();

        if (CerrandoSesion) {return;}

        CerrandoSesion = true;
        MensajeSesion.textContent = "Cerrando sesión...";

        try {
            const Respuesta = await cerrarSesion();

            if (!Respuesta.ok) {
                MensajeSesion.textContent = Respuesta.error;
                return;
            }

            window.location.replace("login.html");
        }
        catch {
            MensajeSesion.textContent = "No se pudo cerrar la sesión. Intenta nuevamente.";
        }
        finally {
            CerrandoSesion = false;
        }
    });
});

const Contenido = document.querySelector("main");
const BotonReintentar = document.getElementById("Reintentar_Sesion");

async function comprobarSesion() {

    Contenido.hidden = true;
    BotonReintentar.hidden = true;
    MensajeSesion.textContent = "Comprobando sesión...";

    try {
        const Respuesta = await obtenerSesion();

        if (!Respuesta.ok) {
            if (Respuesta.status === 401 || Respuesta.status === 403) {
                window.location.replace("login.html");
                return;
            }
            MensajeSesion.textContent = Respuesta.error;
            BotonReintentar.hidden = false;
            return;
        }

        const Usuario = Respuesta.data;
        const RolNecesario = document.body.dataset.rol;
        const EsAdministrador = Usuario.rol === "administrador";
        const PaginaInicio = EsAdministrador ? "admin.html" : "dashboard.html";
        if (RolNecesario && Usuario.rol !== RolNecesario) {
            window.location.replace(PaginaInicio);
            return;
        }// El perfil comparte página, pero cada rol tiene su propio inicio y menu
        const EnlacesInicio = document.querySelectorAll("[data-inicio-usuario]");
        EnlacesInicio.forEach(function(Enlace) {
            Enlace.href = PaginaInicio;
            Enlace.textContent = EsAdministrador ? "Panel administrativo" : "Inicio";
            Enlace.hidden = false;
        });

        const EnlacesPorRol = document.querySelectorAll("[data-rol-enlace]");
        EnlacesPorRol.forEach(function(Enlace) {
            Enlace.hidden = Enlace.dataset.rolEnlace !== Usuario.rol;
        });

        const EnlacesPerfil = document.querySelectorAll("[data-nombre-usuario]");
        EnlacesPerfil.forEach(function(Enlace) {
            Enlace.textContent = Usuario.nombre + " " + Usuario.apellido;
        });

        MensajeSesion.textContent = "";
        Contenido.hidden = false;
    }
    catch {
        MensajeSesion.textContent = "No se pudo comprobar la sesión.";
        BotonReintentar.hidden = false;
    }
}

BotonReintentar.addEventListener("click", comprobarSesion);
comprobarSesion();