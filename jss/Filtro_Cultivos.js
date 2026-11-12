import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.17.5/dist/module.esm.js";
import { obtenerCultivos, crearCultivo, editarCultivo, eliminarCultivo } from "./api.js";

Alpine.data("cultivosUsuario", function() {

    return {

        cultivos: [],
        cargando: false,
        guardando: false,
        errorCarga: "",
        errorGuardado: "",
        mensajeExito: "",
        formularioAbierto: false,
        editandoId: null,
        cultivoEliminar: null,
        consultaActual: 0,
        filtros: { busqueda: "", tipo: "Todos", estado: "Todos", orden: "Original" },
        formulario: { nombre: "", tipo: "", estado: "", nivelCuarentena: "", fechaIncubacion: "" },
        errores: {},

        revisarAcceso(Respuesta) {
            if (Respuesta.status === 401 || Respuesta.status === 403) {
                window.location.replace("login.html");
            }
        },

        async cargarCultivos() {

            // Una respuesta antigua no debe reemplazar una búsqueda más reciente.
            const Consulta = ++this.consultaActual;
            this.cargando = true;
            this.errorCarga = "";
            this.cultivos = [];

            try {
                const Respuesta = await obtenerCultivos({ ...this.filtros });
                if (Consulta !== this.consultaActual) return;
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorCarga = Respuesta.error;
                    return;
                }
                this.cultivos = Respuesta.data;
            }
            catch {
                if (Consulta === this.consultaActual) {
                    this.errorCarga = "No se pudieron cargar los cultivos. Intenta nuevamente.";
                }
            }
            finally {
                if (Consulta === this.consultaActual) this.cargando = false;
            }

        },

        limpiarFiltros() {
            if (this.guardando) return;
            this.filtros = { busqueda: "", tipo: "Todos", estado: "Todos", orden: "Original" };
            return this.cargarCultivos();
        },

        abrirFormulario(Cultivo = null) {

            if (this.guardando) return;
            this.editandoId = Cultivo ? Cultivo.id : null;
            this.formulario = Cultivo ? {
                nombre: Cultivo.nombre, tipo: Cultivo.tipo, estado: Cultivo.estado,
                nivelCuarentena: Cultivo.nivelCuarentena, fechaIncubacion: Cultivo.fechaIncubacion
            } : { nombre: "", tipo: "", estado: "", nivelCuarentena: "", fechaIncubacion: "" };
            this.errores = {};
            this.errorGuardado = "";
            this.mensajeExito = "";
            this.cultivoEliminar = null;
            this.formularioAbierto = true;

        },

        cancelarFormulario() {
            if (this.guardando) return;
            this.formularioAbierto = false;
            this.editandoId = null;
            this.errores = {};
            this.errorGuardado = "";
        },

        validarFormulario() {

            this.errores = {};
            const Datos = this.formulario;
            if (!Datos.nombre.trim() || Datos.nombre.trim().length > 120) {
                this.errores.nombre = "Ingresa un nombre de entre 1 y 120 caracteres.";
            }
            if (!["Virus", "Biológico", "Parásito", "Hongo"].includes(Datos.tipo)) {
                this.errores.tipo = "Selecciona un tipo de cultivo.";
            }
            if (!["Activo", "En Desarrollo", "Experimental", "Finalizado"].includes(Datos.estado)) {
                this.errores.estado = "Selecciona un estado.";
            }
            const Nivel = Number(Datos.nivelCuarentena);
            if (String(Datos.nivelCuarentena).trim() === "" || !Number.isInteger(Nivel) || Nivel < 0 || Nivel > 10) {
                this.errores.nivelCuarentena = "Ingresa un entero entre 0 y 10.";
            }
            const Fecha = new Date(Datos.fechaIncubacion + "T00:00:00Z");
            if (!/^\d{4}-\d{2}-\d{2}$/.test(Datos.fechaIncubacion) || !Number.isFinite(Fecha.getTime()) || Fecha.toISOString().slice(0, 10) !== Datos.fechaIncubacion) {
                this.errores.fechaIncubacion = "Ingresa una fecha válida.";
            }
            return Object.keys(this.errores).length === 0;

        },

        async guardarCultivo() {

            if (this.guardando || !this.formularioAbierto) return;
            this.errorGuardado = "";
            if (!this.validarFormulario()) return;
            this.guardando = true;

            try {
                const Datos = { ...this.formulario };
                const Respuesta = this.editandoId ? await editarCultivo(this.editandoId, Datos) : await crearCultivo(Datos);
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorGuardado = Respuesta.error;
                    return;
                }
                this.mensajeExito = this.editandoId ? "Cultivo actualizado correctamente." : "Cultivo creado correctamente.";
                this.formularioAbierto = false;
                this.editandoId = null;
                // Conservamos los filtros, aunque el cultivo quede fuera de la selección.
                await this.cargarCultivos();
            }
            catch {
                this.errorGuardado = "No se pudo guardar el cultivo. Intenta nuevamente.";
            }
            finally {
                this.guardando = false;
            }

        },

        prepararEliminacion(Cultivo) {
            if (this.guardando) return;
            this.cancelarFormulario();
            this.cultivoEliminar = Cultivo;
            this.errorGuardado = "";
            this.mensajeExito = "";
        },

        cancelarEliminacion() {
            if (this.guardando) return;
            this.cultivoEliminar = null;
            this.errorGuardado = "";
        },

        async confirmarEliminacion() {

            if (this.guardando || !this.cultivoEliminar) return;
            this.guardando = true;
            this.errorGuardado = "";

            try {
                const Respuesta = await eliminarCultivo(this.cultivoEliminar.id);
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorGuardado = Respuesta.error;
                    return;
                }
                this.cultivoEliminar = null;
                this.mensajeExito = "Cultivo eliminado correctamente.";
                await this.cargarCultivos();
            }
            catch {
                this.errorGuardado = "No se pudo eliminar el cultivo. Intenta nuevamente.";
            }
            finally {
                this.guardando = false;
            }

        }

    };

});

Alpine.start();