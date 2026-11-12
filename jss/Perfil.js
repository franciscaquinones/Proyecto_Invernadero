import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.17.5/dist/module.esm.js";
import { obtenerPerfil, actualizarPerfil } from "./api.js";

Alpine.data("perfilUsuario", function () {

    return {

        editando: false,
        usuario: null,
        instalacion: null,
        cargando: true,
        errorCarga: "",

        formulario: {
            nombre: "",
            apellido: "",
            correo: ""
        },

        errores: {
            nombre: "",
            apellido: "",
            correo: ""
        },

        mensajeExito: "",
        guardando: false,
        errorGuardado: "",
        async cargarPerfil() {
            this.cargando = true;
            this.errorCarga = "";
            try {
                const Respuesta = await obtenerPerfil();
                if (!Respuesta.ok) {
                    if (Respuesta.status === 401 || Respuesta.status === 403) {
                        window.location.replace("login.html");
                        return;
                    }
                    this.errorCarga = Respuesta.error;
                    return;
                }
                this.usuario = Respuesta.data.usuario;
                this.instalacion = Respuesta.data.invernadero;
            }
            catch {
                this.errorCarga = "No se pudo cargar el perfil. Intenta nuevamente.";
            }
            finally {
                this.cargando = false;
            }
        },

        iniciarEdicion() {

            this.errores = {
                nombre: "",
                apellido: "",
                correo: ""
            };

            this.mensajeExito = "";
            this.errorGuardado = "";

            this.formulario = {
                nombre: this.usuario.nombre,
                apellido: this.usuario.apellido,
                correo: this.usuario.correo
            };

            this.editando = true;

        },

        cancelarEdicion() {

            this.errores = {
                nombre: "",
                apellido: "",
                correo: ""
            };

            this.mensajeExito = "";
            this.errorGuardado = "";

            this.editando = false;

            this.formulario = {
                nombre: "",
                apellido: "",
                correo: ""
            };

        },

        async guardarPerfil() {
            if (this.guardando) {return;}
            this.errorGuardado = "";

            const Nombre = this.formulario.nombre.trim();
            const Apellido = this.formulario.apellido.trim();
            const Correo = this.formulario.correo.trim();

            this.errores = {
                nombre: "",
                apellido: "",
                correo: ""
            };

            this.mensajeExito = "";

            if (Nombre === "") {
                this.errores.nombre = "Ingresa tu nombre.";
            }

            if (Apellido === "") {
                this.errores.apellido = "Ingresa tu apellido.";
            }

            if (Correo === "") {
                this.errores.correo = "Ingresa tu correo electrónico.";
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Correo)) {
                this.errores.correo = "Ingresa un correo con formato válido.";
            }

            if (
                this.errores.nombre ||
                this.errores.apellido ||
                this.errores.correo
            ) {
                return;
            }

            this.guardando = true;
            try {
                const Respuesta = await actualizarPerfil({
                    nombre: Nombre, apellido: Apellido, correo: Correo
                });
                if (!Respuesta.ok) {
                    if (Respuesta.status === 401 || Respuesta.status === 403) {
                        window.location.replace("login.html");
                        return;
                    }
                    if (Respuesta.status === 409) {
                        this.errores.correo = Respuesta.error;
                    }
                    else {
                        this.errorGuardado = Respuesta.error;
                    }
                    return;

                }
                this.usuario = Respuesta.data;
                this.editando = false;
                this.mensajeExito = "Perfil actualizado correctamente.";

                const EnlacesPerfil = document.querySelectorAll("[data-nombre-usuario]");

                EnlacesPerfil.forEach(function(Enlace) {
                    Enlace.textContent = Respuesta.data.nombre + " " + Respuesta.data.apellido;
                });
            }
            catch {
                this.errorGuardado = "No se pudieron guardar los cambios. Intenta nuevamente.";
            }
            finally {
                this.guardando = false;
            }

        }

    };

});

Alpine.start();