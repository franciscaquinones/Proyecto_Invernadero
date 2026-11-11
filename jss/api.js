const ARCHIVOS = {
    usuarios: "Usuarios.json",
    invernaderos: "Invernaderos.json",
    cultivos: "Cultivos.json",
    sensores: "Sensores.json",
    registros: "Registros_Sensores.json"
}; // Objetos para acceder mejor a los archvios
const TIPOS_CULTIVO = ["Virus", "Biológico", "Parásito", "Hongo"]; // Arreglos (mismos que c++)
const ESTADOS_CULTIVO = ["Activo", "En Desarrollo", "Experimental", "Finalizado"];
const UNIDADES = { Temperatura: "°C", Humedad: "%", Luminosidad: "lux" }; // Objeto para unidades
const ESTADOS_SENSOR = ["Activo", "Inactivo", "Mantenimiento"];
const SECTORES = ["Sector Alpha", "Sector Beta", "Sector Falco", "Sector Delta", "Sector Gamma"];

function fallar(Status, Mensaje) {
    const ErrorApi = new Error(Mensaje);
    ErrorApi.status = Status;
    throw ErrorApi;
} // Avisa cuando algo malio sal, muestra mensaje y frena (se usa en conjunto más adelante)

function objeto(Datos) {
    if (!Datos || typeof Datos !== "object" || Array.isArray(Datos)) {
        fallar(400, "Los datos enviados no tienen un formato válido.");
    }
    return Datos;
} 
// Valida datos (el !Datos evita nulls o 0 o false; el typeof vee que los datos sean objetos)
// El array.isArray da true o false si los datos son un arreglo (nosotros esperamos objetos)
// Si algo sale mal, tira error 400 al tiro; solo devuelve los datos si son validos

function texto(Valor, Campo, Maximo = 120) {
    if (typeof Valor !== "string" || !Valor.trim() || Valor.trim().length > Maximo) {
        fallar(422, Campo + ": ingresa un texto de entre 1 y " + Maximo + " caracteres.");
    }
    return Valor.trim();
} // Valida el largo de los campos con un limite predeterminado (120) o algun valor ingresado

function numero(Valor, Campo) {
    if ((typeof Valor !== "number" && typeof Valor !== "string") || String(Valor).trim() === "" || !Number.isFinite(Number(Valor))) {
        fallar(422, Campo + ": ingresa un número válido.");
    }
    return Number(Valor);
} // Valida que el numero sea valido, no vacio ni infinito

function correo(Valor) {
    const Correo = texto(Valor, "Correo", 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Correo)) {
        fallar(422, "Correo: ingresa una dirección con formato válido.");
    }
    return Correo;
} // Verifica la estructura del correo ingresado

function normalizar(Valor) {
    return String(Valor).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
} // normaliza los mayusculas o tildes y cosas asi para no tener problemas con el como se ingresan

function opcion(Valor, Opciones, Campo) {
    const Encontrado = Opciones.find(function (Item) {
        return normalizar(Item) === normalizar(Valor);
    });
    if (!Encontrado) {
        fallar(422, Campo + ": selecciona una opción válida.");
    }
    return Encontrado;
} // Revisa que la opcion ingresada sea valida (la normaliza para encontrar con el .find)

function fecha(Valor) {
    if (typeof Valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(Valor)) {
        fallar(422, "La fecha debe tener formato AAAA-MM-DD.");
    }
    const Fecha = new Date(Valor + "T00:00:00Z");
    if (!Number.isFinite(Fecha.getTime()) || Fecha.toISOString().slice(0, 10) !== Valor) {
        fallar(422, "La fecha indicada no existe.");
    }
    return Valor;
} // Valida que la fecha este correctamente ingresada y que exista klsajgksdhk (no limita fechas futuras)

function publico(Usuario) {
    return {
        id: Usuario.id, nombre: Usuario.nombre, apellido: Usuario.apellido,
        correo: Usuario.correo, rol: Usuario.rol, estado: Usuario.estado
    };
} // No devolvemos contraseñas, solo el resto de datos del usuario

function buscar(Lista, Id) {
    const Elemento = Lista.find(function (Item) { return Item.id === Id; });
    if (!Elemento) {
        fallar(404, "No se encontró el recurso solicitado.");
    }
    return Elemento;
} // Busca elemento por id

function nuevoId(Lista, Prefijo) {
    let Numero = 1;
    Lista.forEach(function (Item) {
        const Sufijo = Number(Item.id.slice(Prefijo.length));
        if (Number.isInteger(Sufijo)) {
            Numero = Math.max(Numero, Sufijo + 1);
        }
    });
    return Prefijo + String(Numero).padStart(3, "0");
} // Devuelve un nuevo id con su prefijo y numero correspondiente (al revisar la lista)
