


//Función de busqueda junto con fase abajito...
const ListaDeCultivos = document.getElementById("LISTA_DE_CULTIVOS");
const BotonDeFiltro = document.getElementById("Boton_De_Filtro");

if (ListaDeCultivos && BotonDeFiltro) {

    BotonDeFiltro.addEventListener("click", function () {

        const Busqueda = document.getElementById("Busqueda").value.toLowerCase(); //Lo pasa a minuscula para que no se haga problema con eso
        const Fase = document.getElementById("Fase").value;
        const Filas = ListaDeCultivos.querySelectorAll("tr");

        Filas.forEach(function (Fila) {

            const Nombre = Fila.cells[0].textContent.toLowerCase();
            const Estado = Fila.cells[2].textContent;

            const CoincideElNombre = Nombre.includes(Busqueda);

            const CoincideLaFase = Fase === "Todos" || Estado === Fase;

            if (CoincideElNombre && CoincideLaFase) {
                Fila.style.display = "";
            }
            else {
                Fila.style.display = "none";
            }

        });

    });

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
            const CuarentenaActual = Fila.cells[3].textContent;
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