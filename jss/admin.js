import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.17.5/dist/module.esm.js";
import { obtenerUsuarios, obtenerSesion, obtenerRecursosUsuario, obtenerEstadisticasGlobales, eliminarUsuario } from "./api.js";
Alpine.data("usuariosAdmin", function() {
    return {
        cargando: false,
        errorCarga: "",
        usuarios: [],
        administradorId: "",
        estadisticas: null,
        cargandoEstadisticas: false,
        errorEstadisticas: "",
        recursos: null,
        usuarioSeleccionado: null,
        cargandoRecursos: false,
        errorRecursos: "",
        confirmando: false,
        eliminando: false,
        errorEliminacion: "",
        mensajeExito: "",
        filtros: {
            busqueda: "",
            rol: "",
            estado: ""
        },
        revisarAcceso(Respuesta) {
            if (Respuesta.status === 401) {
                window.location.replace("login.html");
            }
            if (Respuesta.status === 403) {
                window.location.replace("dashboard.html");
            }
        },
        async cargarPanel() {
            try {
                const Respuesta = await obtenerSesion();
                if (Respuesta.ok) {
                    this.administradorId = Respuesta.data.id;
                }
                else {
                    this.revisarAcceso(Respuesta);
                }
            }
            catch {
                // La comprobación común de main.js permite reintentar la sesión.
                this.administradorId = "";
            }
            await this.cargarUsuarios();
            await this.cargarEstadisticas();
        },
        async cargarEstadisticas() {
            if (this.cargandoEstadisticas) return;
            this.cargandoEstadisticas = true;
            this.errorEstadisticas = "";
            this.estadisticas = null;
            try {
                const Respuesta = await obtenerEstadisticasGlobales();
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorEstadisticas = Respuesta.error;
                    return;
                }
                this.estadisticas = Respuesta.data;
            }
            catch {
                this.errorEstadisticas = "No se pudieron cargar las estadísticas. Intenta nuevamente.";
            }
            finally {
                this.cargandoEstadisticas = false;
            }
        },
        async verRecursos(Usuario) {
            if (this.cargandoRecursos || this.eliminando) return;
            this.usuarioSeleccionado = Usuario;
            this.recursos = null;
            this.confirmando = false;
            this.errorEliminacion = "";
            this.mensajeExito = "";
            this.errorRecursos = "";
            this.cargandoRecursos = true;

            try {
                const Respuesta = await obtenerRecursosUsuario(Usuario.id);
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorRecursos = Respuesta.error;
                    return;
                }
                this.recursos = Respuesta.data;
            }
            catch {
                this.errorRecursos = "No se pudieron cargar los recursos. Intenta nuevamente.";
            }
            finally {
                this.cargandoRecursos = false;
            }
        },
        prepararEliminacion() {
            if (!this.recursos || !this.administradorId || this.eliminando || this.cargando || this.cargandoEstadisticas) return;
            if (this.recursos.usuario.id === this.administradorId) return;
            this.errorEliminacion = "";
            this.confirmando = true;
        },
        cancelarEliminacion() {
            if (this.eliminando) return;
            this.confirmando = false;
            this.errorEliminacion = "";
        },
        async confirmarEliminacion() {
            if (!this.confirmando || !this.recursos || this.eliminando) return;
            if (this.cargando || this.cargandoEstadisticas || this.cargandoRecursos) return;
            if (!this.administradorId || this.recursos.usuario.id === this.administradorId) return;
            this.eliminando = true;
            this.errorEliminacion = "";
            const Usuario = this.recursos.usuario;
            try {
                const Respuesta = await eliminarUsuario(Usuario.id);
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorEliminacion = Respuesta.error;
                    return;
                }
                this.confirmando = false;
                this.recursos = null;
                this.usuarioSeleccionado = null;
                this.mensajeExito = "Se eliminó la cuenta de " + Usuario.nombre + " " + Usuario.apellido + " y sus recursos asociados.";
                // El borrado ya terminó; cada consulta muestra su propio error si falla.
                await this.cargarUsuarios();
                await this.cargarEstadisticas();
            }
            catch {
                this.errorEliminacion = "No se pudo eliminar la cuenta. Intenta nuevamente.";
            }
            finally {
                this.eliminando = false;
            }
        },
        async cargarUsuarios() {
            if (this.cargando) {
                return;
            }
            this.cargando = true;
            this.errorCarga = "";
            this.usuarios = [];
            try {
                const Opciones = {
                    busqueda: this.filtros.busqueda,
                    rol: this.filtros.rol,
                    estado: this.filtros.estado
                };
                const Respuesta = await obtenerUsuarios(Opciones);
                if (!Respuesta.ok) {
                    if (Respuesta.status === 401) {
                        window.location.replace("login.html");
                        return;
                    }
                    if (Respuesta.status === 403) {
                        window.location.replace("dashboard.html");
                        return;
                    }
                    this.errorCarga = Respuesta.error;
                    return;
                }
                this.usuarios = Respuesta.data;
            }
            catch {
                this.errorCarga = "No se pudieron cargar los usuarios. Intenta nuevamente.";
            }
            finally {
                this.cargando = false;
            }
        },
        limpiarFiltros() {
            if (this.cargando) {
                return;
            }
            this.filtros = {
                busqueda: "",
                rol: "",
                estado: ""
            };
            return this.cargarUsuarios();
        }
    };
});
Alpine.start();