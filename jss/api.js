const CLAVE_DATOS = "api_de_arklay"; // Nombre para identificar en localStorage
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

function filtrar(Lista, Opciones, Campos) {
    const Busqueda = normalizar(Opciones.busqueda || "");
    const Resultado = Lista.filter(function (Item) {
        if (!normalizar(Item.nombre).includes(Busqueda)) {
            return false;
        }
        for (const Campo of Campos) {
            const Valor = Opciones[Campo];
            if (Valor && normalizar(Valor) !== "todos" && normalizar(Item[Campo]) !== normalizar(Valor)) {
                return false;
            }
        }
        return true;
    });
    const Orden = Opciones.orden || "Original";
    if (!["Original", "Nombre_ASC", "Nombre_DESC"].includes(Orden)) {
        fallar(422, "Selecciona un orden válido: Original, Nombre_ASC o Nombre_DESC.");
    }
    if (Orden !== "Original") {
        Resultado.sort(function (A, B) {
            return A.nombre.localeCompare(B.nombre, "es", { sensitivity: "base", numeric: true }) * (Orden === "Nombre_DESC" ? -1 : 1);
        });
    }
    return Resultado;
}

function validarPersona(Base, Datos, Id = null) {
    objeto(Datos);
    const Persona = {
        nombre: texto(Datos.nombre, "Nombre", 80),
        apellido: texto(Datos.apellido, "Apellido", 80),
        correo: correo(Datos.correo)
    };
    if (Base.usuarios.some(function (U) { return U.id !== Id && U.correo.toLowerCase() === Persona.correo; })) {
        fallar(409, "El correo ya está registrado por otra cuenta.");
    }
    return Persona;
}

function validarRecurso(Recurso, Datos) {
    const Comun = { nombre: texto(Datos.nombre, "Nombre") };
    if (Recurso === "cultivos") {
        const Nivel = numero(Datos.nivelCuarentena, "Nivel de cuarentena");
        if (!Number.isInteger(Nivel) || Nivel < 0 || Nivel > 10) {
            fallar(422, "El nivel de cuarentena debe ser un entero entre 0 y 10.");
        }
        return {
            ...Comun,
            tipo: opcion(Datos.tipo, TIPOS_CULTIVO, "Tipo"),
            estado: opcion(Datos.estado, ESTADOS_CULTIVO, "Estado"),
            nivelCuarentena: Nivel, fechaIncubacion: fecha(Datos.fechaIncubacion)
        };
    }
    const Tipo = opcion(Datos.tipo, Object.keys(UNIDADES), "Tipo");
    return {
        ...Comun, tipo: Tipo, unidad: UNIDADES[Tipo],
        estado: opcion(Datos.estado, ESTADOS_SENSOR, "Estado"),
        ubicacion: opcion(Datos.ubicacion, SECTORES, "Ubicación")
    };
}

function validarBase(Base) {
    if (!Base || !(Base.sesion === null || typeof Base.sesion === "string")) {
        fallar(500, "Los datos guardados no tienen un formato compatible. No se han sobrescrito.");
    }
    // [IA] inicio · ia/2026-11-11_oscaroviedo-png_validacion-carga-json.md
    for (const Recurso of Object.keys(ARCHIVOS)) {
        const Lista = Base[Recurso];
        // [IA] fin
        if (!Array.isArray(Lista)) {
            fallar(500, "Falta una lista de datos. No se han sobrescrito.");
        }
        const Ids = [];
        for (const Item of Lista) {
            if (!Item || typeof Item.id !== "string" || Ids.includes(Item.id)) {
                fallar(500, "Hay identificadores inválidos o repetidos. No se han sobrescrito.");
            }
            Ids.push(Item.id);
        }
    }
    // Revisamos las relaciones antes de usar o guardar los datos
    const Propietarios = [];
    for (const Invernadero of Base.invernaderos) {
        const Usuario = Base.usuarios.find(function (U) { return U.id === Invernadero.usuarioId; });
        if (!Usuario || Propietarios.includes(Invernadero.usuarioId)) {
            fallar(500, "Hay una instalación sin usuario o un usuario con instalaciones repetidas.");
        }
        Propietarios.push(Invernadero.usuarioId);
    }
    for (const Item of [...Base.cultivos, ...Base.sensores]) { // los deja como solo una lista para poder recorrerlo todo junto (...)
        const Invernadero = Base.invernaderos.find(function (I) { return I.id === Item.invernaderoId; });
        if (!Invernadero) {
            fallar(500, "Hay un cultivo o sensor sin instalación.");
        }
    }
    for (const Registro of Base.registros) {
        const Sensor = Base.sensores.find(function (S) { return S.id === Registro.sensorId; });
        if (!Sensor) {
            fallar(500, "Hay una medición sin sensor.");
        }
    }
    return Base;
}

async function cargarBase() {
    // [IA] inicio · ia/2026-11-11_oscaroviedo-png_validacion-carga-json.md
    const Guardado = localStorage.getItem(CLAVE_DATOS);
    // [IA] fin
    if (Guardado !== null) {
        return validarBase(JSON.parse(Guardado));
    }
    const Base = { sesion: null };
    // Solo se leen los JSON cuando todavía no hay una copia guardada
    for (const Recurso of Object.keys(ARCHIVOS)) {
        const Archivo = ARCHIVOS[Recurso];
        // [IA] inicio · ia/2026-11-11_oscaroviedo-png_validacion-carga-json.md
        let Respuesta;
        try {
            Respuesta = await fetch(new URL("../mocks/" + Archivo, import.meta.url));
        }
        // [IA] fin
        catch {
            fallar(503, "No se pudieron cargar los datos iniciales. Intenta nuevamente.");
        }
        if (!Respuesta.ok) {
            fallar(503, "No se pudieron cargar los datos iniciales. Intenta nuevamente.");
        }
        Base[Recurso] = await Respuesta.json();
    }
    validarBase(Base);
    // [IA] inicio · ia/2026-11-11_oscaroviedo-png_validacion-carga-json.md
    localStorage.setItem(CLAVE_DATOS, JSON.stringify(Base));
    // [IA] fin
    return Base;
}
