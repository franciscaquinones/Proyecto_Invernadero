import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.17.5/dist/module.esm.js";
import { obtenerSensores, crearSensor, editarSensor, eliminarSensor } from "./api.js";
Alpine.data("sensoresUsuario", function() {
    return {
        sensores: [],
        cargando: false,
        guardando: false,
        errorCarga: "",
        errorGuardado: "",
        mensajeExito: "",
        formularioAbierto: false,
        editandoId: null,
        sensorEliminar: null,
        consultaActual: 0,
        filtros: { busqueda: "", tipo: "Todos", estado: "Todos", ubicacion: "Todos", orden: "Nombre_ASC" },
        formulario: { nombre: "", tipo: "", estado: "", ubicacion: "" },
        errores: {},
        revisarAcceso(Respuesta) {
            if (Respuesta.status === 401 || Respuesta.status === 403) {
                window.location.replace("login.html");
            }
        },
        async cargarSensores() {
            // Una respuesta antigua no debe reemplazar una búsqueda más reciente.
            const Consulta = ++this.consultaActual;
            this.cargando = true;
            this.errorCarga = "";
            this.sensores = [];
            try {
                const Respuesta = await obtenerSensores({ ...this.filtros });
                if (Consulta !== this.consultaActual) return;
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorCarga = Respuesta.error;
                    return;
                }
                this.sensores = Respuesta.data;
            }
            catch {
                if (Consulta === this.consultaActual) {
                    this.errorCarga = "No se pudieron cargar los sensores. Intenta nuevamente.";
                }
            }
            finally {
                if (Consulta === this.consultaActual) this.cargando = false;
            }

        },
        limpiarFiltros() {
            if (this.guardando) return;
            this.filtros = { busqueda: "", tipo: "Todos", estado: "Todos", ubicacion: "Todos", orden: "Nombre_ASC" };
            return this.cargarSensores();
        },
        abrirFormulario(Sensor = null) {
            if (this.guardando) return;
            this.editandoId = Sensor ? Sensor.id : null;
            this.formulario = Sensor ? {
                nombre: Sensor.nombre, tipo: Sensor.tipo, estado: Sensor.estado,
                ubicacion: Sensor.ubicacion
            } : { nombre: "", tipo: "", estado: "", ubicacion: "" };
            this.errores = {};
            this.errorGuardado = "";
            this.mensajeExito = "";
            this.sensorEliminar = null;
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
            if (!["Temperatura", "Humedad", "Luminosidad"].includes(Datos.tipo)) {
                this.errores.tipo = "Selecciona un tipo de sensor.";
            }
            if (!["Activo", "Inactivo", "Mantenimiento"].includes(Datos.estado)) {
                this.errores.estado = "Selecciona un estado.";
            }
            if (!["Sector Alpha", "Sector Beta", "Sector Falco", "Sector Delta", "Sector Gamma"].includes(Datos.ubicacion)) {
                this.errores.ubicacion = "Selecciona un sector.";
            }
            return Object.keys(this.errores).length === 0;

        },

        async guardarSensor() {
            if (this.guardando || !this.formularioAbierto) return;
            this.errorGuardado = "";
            if (!this.validarFormulario()) return;
            this.guardando = true;
            try {
                const Datos = { ...this.formulario };
                const Respuesta = this.editandoId ? await editarSensor(this.editandoId, Datos) : await crearSensor(Datos);
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorGuardado = Respuesta.error;
                    return;
                }
                this.mensajeExito = this.editandoId ? "Sensor actualizado correctamente." : "Sensor creado correctamente.";
                this.formularioAbierto = false;
                this.editandoId = null;
                // Conservamos los filtros, aunque el sensor quede fuera de la selección.
                await this.cargarSensores();
            }
            finally {
                this.guardando = false;
            }
        },
        prepararEliminacion(Sensor) {
            if (this.guardando) return;
            this.cancelarFormulario();
            this.sensorEliminar = Sensor;
            this.errorGuardado = "";
            this.mensajeExito = "";
        },
        cancelarEliminacion() {
            if (this.guardando) return;
            this.sensorEliminar = null;
            this.errorGuardado = "";
        },
        async confirmarEliminacion() {
            if (this.guardando || !this.sensorEliminar) return;
            this.guardando = true;
            this.errorGuardado = "";
            try {
                const Respuesta = await eliminarSensor(this.sensorEliminar.id);
                if (!Respuesta.ok) {
                    this.revisarAcceso(Respuesta);
                    this.errorGuardado = Respuesta.error;
                    return;
                }
                this.sensorEliminar = null;
                this.mensajeExito = "Sensor eliminado correctamente.";
                await this.cargarSensores();
            }
            finally {
                this.guardando = false;
            }
        }
    };
});
Alpine.start();
