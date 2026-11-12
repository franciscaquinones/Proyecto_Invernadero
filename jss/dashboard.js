import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.17.5/dist/module.esm.js";
import { obtenerResumen } from "./api.js";

Alpine.data("resumenDashboard", function() {

    return {
        cargando: true,
        errorCarga: "",
        resumen: null,

        async cargarResumen() {
            this.cargando = true;
            this.errorCarga = "";
            this.resumen = null;

            try {
                const Respuesta = await obtenerResumen();

                if (!Respuesta.ok) {
                    if (Respuesta.status === 401 || Respuesta.status === 403) {
                        window.location.replace("login.html");
                        return;
                    }
                    this.errorCarga = Respuesta.error;
                    return;

                }
                this.resumen = Respuesta.data;
            }
            catch {
                this.errorCarga = "No se pudo cargar el resumen. Intenta nuevamente.";
            }
            finally {
                this.cargando = false;
            }
        }
    };
}); 
Alpine.start();