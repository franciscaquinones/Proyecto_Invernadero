


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

