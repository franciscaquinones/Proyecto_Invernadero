import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.17.5/dist/module.esm.js";
import "https://cdn.jsdelivr.net/npm/chart.js@4.6.1/dist/chart.umd.min.js";
import { obtenerRegistros, obtenerSensores, obtenerResumen, obtenerDatosGrafico } from "./api.js";
const Chart = window.Chart; // La versión del CDN deja Chart disponible en window.
Alpine.data("historialSensores", function() {
    // La instancia de Chart.js queda fuera de los datos reactivos de Alpine.
    let Grafico = null;
    return {
        cargando: true,
        errorCarga: "",
        registros: [],
        resumen: null,
        sensores: [],
        datosGrafico: null,
        filtros: {
            sensorId: "",
            desde: "",
            hasta: ""
        },
        async cargarHistorial() {
            this.cargando = true;
            this.errorCarga = "";
            this.registros = [];
            this.resumen = null;
            this.datosGrafico = null;
            this.borrarGrafico();
            try {
                // Usamos la misma selección para la tabla y los promedios.
                const Opciones = {
                    sensorId: this.filtros.sensorId,
                    desde: this.filtros.desde,
                    hasta: this.filtros.hasta
                };
                const Consultas = [
                    obtenerRegistros(Opciones), obtenerSensores(), obtenerResumen(Opciones)
                ];
                // Un solo sensor evita mezclar unidades diferentes en el gráfico.
                if (Opciones.sensorId !== "") {
                    Consultas.push(obtenerDatosGrafico(Opciones.sensorId, Opciones));
                }
                const Respuestas = await Promise.all(Consultas);
                // Revisamos las respuestas antes de mostrar la tabla o el resumen.
                for (const Respuesta of Respuestas) {
                    if (!Respuesta.ok) {
                        if (Respuesta.status === 401 || Respuesta.status === 403) {
                            window.location.replace("login.html");
                            return;
                        }
                        this.errorCarga = Respuesta.error;
                        return;
                    }
                }
                const Registros = Respuestas[0].data;
                const Sensores = Respuestas[1].data;
                this.sensores = Sensores; // Conservamos todos los sensores para el desplegable.
                const Filas = [];
                for (const Registro of Registros) {
                    // El registro tiene el valor; su sensor aporta el nombre y la unidad.
                    const Sensor = Sensores.find(function(S) { return S.id === Registro.sensorId; });
                    if (!Sensor) {
                        this.errorCarga = "No se encontró el sensor de una medición. Intenta nuevamente.";
                        return;
                    }
                    Filas.push({
                        id: Registro.id, fecha: Registro.fecha, hora: Registro.hora,
                        sensor: Sensor.nombre, tipo: Sensor.tipo, ubicacion: Sensor.ubicacion,
                        valor: Registro.valor, unidad: Sensor.unidad
                    });
                }
                this.registros = Filas;
                this.resumen = Respuestas[2].data;
                if (Opciones.sensorId !== "") {
                    await this.dibujarGrafico(Respuestas[3].data);
                }
            }
            finally {
                this.cargando = false;
            }
        },
        async dibujarGrafico(Datos) {

            this.datosGrafico = Datos;
            if (Datos.valores.length === 0) {
                return;
            }
            // Esperamos a que Alpine muestre el contenedor antes de medir el canvas.
            await this.$nextTick();

            Grafico = new Chart(this.$refs.GraficoHistorial, {
                type: "line",
                data: {
                    labels: Datos.etiquetas,
                    datasets: [{
                        label: Datos.sensor.tipo + " (" + Datos.unidad + ")",
                        data: Datos.valores,
                        borderColor: "#f87171",
                        backgroundColor: "#f87171",
                        pointRadius: 4,
                        borderWidth: 2,
                        tension: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: {
                            title: { display: true, text: "Fecha y hora", color: "#eeeeee" },
                            ticks: { color: "#cccccc", maxTicksLimit: 6, maxRotation: 0 },
                            grid: { color: "#23262c" }
                        },
                        y: {
                            title: { display: true, text: Datos.sensor.tipo + " (" + Datos.unidad + ")", color: "#eeeeee" },
                            ticks: { color: "#cccccc" },
                            grid: { color: "#23262c" }
                        }
                    }
                }
            });

        },
        borrarGrafico() {

            if (Grafico) {
                Grafico.destroy(); // Libera el canvas antes de dibujar otro gráfico.
                Grafico = null;
            }
        },
        destroy() {
            this.borrarGrafico(); // Alpine lo llama si se retira este componente.
        },
        limpiarFiltros() {
            this.filtros = {
                sensorId: "",
                desde: "",
                hasta: ""
            };
            return this.cargarHistorial(); // Volvemos a pedir el historial sin filtros.
        },
        mostrarPromedio(Tipo) {
            const Promedio = this.resumen.promedios[Tipo];
            if (Promedio.valor === null) {
                return "Sin datos";
            }
            return Promedio.valor + " " + Promedio.unidad;
        }
    };
});