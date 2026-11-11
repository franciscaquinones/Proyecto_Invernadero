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