// Función de búsqueda y filtrado de sensores
const ListaDeSensores = document.getElementById("LISTA_DE_SENSORES");
const BotonDeFiltroSensor = document.getElementById("Boton_De_Filtro_Sensor");

if (ListaDeSensores && BotonDeFiltroSensor) {

    BotonDeFiltroSensor.addEventListener("click", function () {

        const Busqueda = document.getElementById("Busqueda").value.trim().toLowerCase();
        const Tipo = document.getElementById("Tipo").value;
        const Ubicacion = document.getElementById("Ubicacion").value;
        const Estado = document.getElementById("Estado").value;

        const Filas = ListaDeSensores.querySelectorAll("tr");

        Filas.forEach(function (Fila) {

            const NombreSensor = Fila.cells[0].textContent.trim().toLowerCase();
            const TipoSensor = Fila.cells[1].textContent.trim();
            const UbicacionSensor = Fila.cells[2].textContent.trim();
            const EstadoSensor = Fila.cells[3].textContent.trim();

            const CoincideElNombre = NombreSensor.includes(Busqueda);

            const CoincideElTipo = Tipo === "Todos" || TipoSensor.toLowerCase() === Tipo.toLowerCase();

            const CoincideLaUbicacion = Ubicacion === "Todos" || UbicacionSensor.toLowerCase() === Ubicacion.toLowerCase();

            const CoincideElEstado = Estado === "Todos" || EstadoSensor.toLowerCase() === Estado.toLowerCase();

            if (CoincideElNombre && CoincideElTipo && CoincideLaUbicacion && CoincideElEstado) {
                Fila.style.display = "";
            }
            else {
                Fila.style.display = "none";
            }

        });

    });

}


// Función de agregar sensor
const BotonDeAgregarSensor = document.getElementById("Boton_De_Agregar_Sensor");

if (BotonDeAgregarSensor && ListaDeSensores) {

    BotonDeAgregarSensor.addEventListener("click", function () {

        const Nombre = prompt("Ingrese el nombre del sensor (Ej: S-04):");

        if (!Nombre || !Nombre.trim()) {
            return;
        }

        const Tipo = prompt("Ingrese el tipo del sensor: Temperatura, Humedad o Luminosidad");

        if (!Tipo || !Tipo.trim()) {
            return;
        }

        const Ubicacion = prompt("Ingrese la ubicación del sensor: Sector Alpha, Beta, Falco, Delta o Gamma");

        if (!Ubicacion || !Ubicacion.trim()) {
            return;
        }

        const Estado = prompt("Ingrese el estado del sensor: Activo, Inactivo o Mantenimiento");

        if (!Estado || !Estado.trim()) {
            return;
        }

        const Medicion = prompt("Ingrese la última medición del sensor (Ej: 25 °C, 70%):");

        if (!Medicion || !Medicion.trim()) {
            return;
        }

        const Fila = document.createElement("tr");

        const NombreCelda = Fila.insertCell();
        NombreCelda.textContent = Nombre.trim();

        const TipoCelda = Fila.insertCell();
        TipoCelda.textContent = Tipo.trim();

        const UbicacionCelda = Fila.insertCell();
        UbicacionCelda.textContent = Ubicacion.trim();

        const EstadoCelda = Fila.insertCell();
        EstadoCelda.textContent = Estado.trim();

        const MedicionCelda = Fila.insertCell();
        MedicionCelda.textContent = Medicion.trim();

        const Acciones = Fila.insertCell();

        Acciones.innerHTML = `
            <button type="button" class="Boton_De_Editar">Modificar</button>
            <button type="button" class="Boton_De_Eliminar">Eliminar</button>
        `;

        ListaDeSensores.appendChild(Fila);

        alert("Sensor agregado correctamente.");

    });

}



// Función de eliminar y modificar sensores
if (ListaDeSensores) {

    ListaDeSensores.addEventListener("click", function (E) {

        const Boton = E.target.closest("button");

        if (!Boton) {
            return;
        }

        const Fila = Boton.closest("tr");

        if (!Fila) {
            return;
        }


        // Lo de abajo elimina el sensor

        if (Boton.classList.contains("Boton_De_Eliminar")) {

            const Nombre = Fila.cells[0].textContent;

            const Confirmar = confirm("¿Estás seguro de que deseas eliminar el sensor " + Nombre + "?");

            if (Confirmar) {

                Fila.remove();

                alert("Sensor eliminado correctamente.");

            }

        }


        // Lo de abajo sirve para editar el sensor

        if (Boton.classList.contains("Boton_De_Editar")) {

            const NombreActual = Fila.cells[0].textContent;
            const TipoActual = Fila.cells[1].textContent;
            const UbicacionActual = Fila.cells[2].textContent;
            const EstadoActual = Fila.cells[3].textContent;
            const MedicionActual = Fila.cells[4].textContent;


            const NuevoNombre = prompt("Nombre del sensor:", NombreActual);

            const NuevoTipo = prompt("Tipo:", TipoActual);

            const NuevaUbicacion = prompt("Ubicación:", UbicacionActual);

            const NuevoEstado = prompt("Estado:", EstadoActual);

            const NuevaMedicion = prompt("Última medición:", MedicionActual);


            if (NuevoNombre && NuevoNombre.trim()) {
                Fila.cells[0].textContent = NuevoNombre.trim();
            }

            if (NuevoTipo && NuevoTipo.trim()) {
                Fila.cells[1].textContent = NuevoTipo.trim();
            }

            if (NuevaUbicacion && NuevaUbicacion.trim()) {
                Fila.cells[2].textContent = NuevaUbicacion.trim();
            }

            if (NuevoEstado && NuevoEstado.trim()) {
                Fila.cells[3].textContent = NuevoEstado.trim();
            }

            if (NuevaMedicion && NuevaMedicion.trim()) {
                Fila.cells[4].textContent = NuevaMedicion.trim();
            }

        }

    });

}
