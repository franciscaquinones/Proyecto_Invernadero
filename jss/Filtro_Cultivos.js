/* BUSQUEDA, FILTROS Y ORDENAMIENTO DE CULTIVOS */

const ListaDeCultivos = document.getElementById("LISTA_DE_CULTIVOS");
const BotonDeFiltro = document.getElementById("Boton_De_Filtro");
const BotonDeLimpiarFiltros = document.getElementById("Boton_De_Limpiar_Filtros");
const FormularioFiltros = document.getElementById("Formulario_Filtros");
const CampoBusqueda = document.getElementById("Búsqueda");

if (ListaDeCultivos && BotonDeFiltro && FormularioFiltros && CampoBusqueda) {
    // Permite comparar textos sin importar tildes o mayusculas.
    function NormalizarTexto(Texto) {
        return Texto.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function AplicarFiltros() {

        const Busqueda = NormalizarTexto(
            CampoBusqueda.value
        );

        const Fase = document.getElementById("Fase").value;
        const Tipo = NormalizarTexto(
            document.getElementById("Tipo").value
        );
        const Orden = document.getElementById("Orden").value;

        const Filas = Array.from(
            ListaDeCultivos.querySelectorAll("tr")
        );
        // ORDENAMIENTO
        Filas.sort(function (FilaA, FilaB) {

            const NombreA = FilaA.cells[0].textContent.trim();
            const NombreB = FilaB.cells[0].textContent.trim();

            if (Orden === "Nombre_Asc") {
                return NombreA.localeCompare(NombreB, "es", {
                    sensitivity: "base"
                });
            }

            if (Orden === "Nombre_Des") {
                return NombreB.localeCompare(NombreA, "es", {
                    sensitivity: "base"
                });
            }

            return 0;

        });

        // BUSQUEDA Y FILTRADO
        Filas.forEach(function (Fila) {

            const NombreCultivo = NormalizarTexto(
                Fila.cells[0].textContent
            );

            const TipoCultivo = NormalizarTexto(
                Fila.cells[1].textContent
            );

            const EstadoCultivo = Fila.cells[2].textContent.trim();

            const CoincideNombre = NombreCultivo.includes(Busqueda);

            const CoincideEstado =
                Fase === "Todos" || EstadoCultivo === Fase;

            const CoincideTipo =
                Tipo === "todos" || TipoCultivo === Tipo;

            if (CoincideNombre && CoincideEstado && CoincideTipo) {
                Fila.style.display = "";
            }
            else {
                Fila.style.display = "none";
            }

            ListaDeCultivos.appendChild(Fila);
        });

    }
    //Implementamos la búsqueda dinámica 
    CampoBusqueda.addEventListener("input", AplicarFiltros);
    // BOTON APLICAR FILTROS
    BotonDeFiltro.addEventListener("click", AplicarFiltros);

    // Evita que Enter recargue la pagina.
    FormularioFiltros.addEventListener("submit", function (E) {
        E.preventDefault();
        AplicarFiltros();
    });

    // BOTON LIMPIAR FILTROS
    if (BotonDeLimpiarFiltros) {

        BotonDeLimpiarFiltros.addEventListener("click", function (E) {

            E.preventDefault();

            FormularioFiltros.reset();
            AplicarFiltros();

        });

    }

    // Muestra inicialmente todos los cultivos.
    AplicarFiltros();

}


//Función de agregar cultivo abajito...
const BotonDeAgregar = document.getElementById("Boton_De_Agregar");

if (BotonDeAgregar && ListaDeCultivos) {

    BotonDeAgregar.addEventListener("click", function () {

        const Nombre = prompt("Ingrese el nombre del cultivo:");

        if (!Nombre) {
            return;
        }

        const Tipo = prompt("Ingrese el tipo del cultivo:");

        if (!Tipo) {
            return;
        }

        const Estado = prompt("Ingrese el estado: Activo, En Desarrollo, Experimental o Finalizado");

        if (!Estado) {
            return;
        }

        const Cuarentena = prompt("Ingrese el nivel de cuarentena (de 0 a 10):");

        if (!Cuarentena) {
            return;
        }

        const Fecha = prompt("Ingrese la fecha de inicio (formato dd/mm/aaaa):");

        if (!Fecha) {
            return;
        }

        const Fila = document.createElement("tr");

        const NombreCelda = Fila.insertCell();
        NombreCelda.textContent = Nombre;

        const TipoCelda = Fila.insertCell();
        TipoCelda.textContent = Tipo;

        const EstadoCelda = Fila.insertCell();
        EstadoCelda.textContent = Estado;

        const CuarentenaCelda = Fila.insertCell();
        CuarentenaCelda.textContent = Cuarentena + "/10";

        const FechaC = Fila.insertCell();
        FechaC.textContent = Fecha;


        const Acciones = Fila.insertCell();

        Acciones.innerHTML = `<button type="button" class="Boton_De_Editar">Modificar</button>
            <button type="button" class="Boton_De_Eliminar">Purgar</button>`;
        ListaDeCultivos.appendChild(Fila);
        BotonDeFiltro.click();

    });

}

//Eliminar y editar cultivo,,,
if (ListaDeCultivos) {

    ListaDeCultivos.addEventListener("click", function (E) {

        const Boton = E.target;

        const Fila = Boton.closest("tr");


        // Lo de abajo elimina el cultivo

        if (Boton.classList.contains("Boton_De_Eliminar")) {

            const Nombre = Fila.cells[0].textContent;

            const Confirmar = confirm(
                "¿Estás seguro de que deseas purgar el cultivo " + Nombre + "?"
            );

            if (Confirmar) {

                Fila.remove();

                alert("Cultivo purgado correctamente.");

            }

        }


        // Lo de abajo sirve pa editar el cultivo

        if (Boton.classList.contains("Boton_De_Editar")) {

            const NombreActual = Fila.cells[0].textContent;
            const TipoActual = Fila.cells[1].textContent;
            const EstadoActual = Fila.cells[2].textContent;
            const CuarentenaActual = Fila.cells[3].textContent.replace("/10", "").trim();
            const FechaActual = Fila.cells[4].textContent;


            const NuevoNombre = prompt(
                "Nombre del cultivo:",
                NombreActual
            );

            const NuevoTipo = prompt(
                "Tipo:",
                TipoActual
            );

            const NuevoEstado = prompt(
                "Estado:",
                EstadoActual
            );

            const NuevaCuarentena = prompt(
                "Nivel de cuarentena:",
                CuarentenaActual
            );

            const NuevaFecha = prompt(
                "Fecha:",
                FechaActual
            );


            if (NuevoNombre) {
                Fila.cells[0].textContent = NuevoNombre;
            }

            if (NuevoTipo) {
                Fila.cells[1].textContent = NuevoTipo;
            }

            if (NuevoEstado) {
                Fila.cells[2].textContent = NuevoEstado;
            }

            if (NuevaCuarentena) {
                Fila.cells[3].textContent = NuevaCuarentena + "/10";
            }

            if (NuevaFecha) {
                Fila.cells[4].textContent = NuevaFecha;
            }

        }

    });

}