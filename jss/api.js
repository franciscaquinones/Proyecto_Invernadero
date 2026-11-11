const LATENCIA = 500; // Tiempo de "espera" (simulado)
// [IA] inicio · ia/2026-11-11_oscaroviedo-png_cola-operaciones.md
let Cola = Promise.resolve(); // Evita que se traten de ejecutar 2 operaciones al mismo tiempo
// [IA] fin

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

function esperar(Milisegundos) {
    return new Promise(function (resolve) {
        setTimeout(resolve, Milisegundos);
    });
} // Funcion que recibe milisegundos y devuelve una promesa para que espere y despues resuelva

// Operacion es la función que consulta o cambia los datos
// Escritura indica si debemos guardarlos; Status vale 201 al crear y 200 en el resto
// Conservamos la cola para que dos guardados de esta pestaña no se pisen
async function ejecutar(Opciones, Operacion, Escritura = false, Status = 200) {
    // [IA] inicio · ia/2026-11-11_oscaroviedo-png_cola-operaciones.md
    const Turno = Cola.then(async function () {
        // [IA] fin
        try {
            await esperar(LATENCIA);
            objeto(Opciones);
            if (Opciones.forzarError === true) {
                fallar(503, "Fallo simulado de conexión. Puedes reintentar la operación.");
            }
            const Base = await cargarBase();
            const Datos = Operacion(Base);
            if (Escritura) {
                validarBase(Base);
                // Un solo guardado incluye también las eliminaciones en cascada.
                localStorage.setItem(CLAVE_DATOS, JSON.stringify(Base));
            }
            return { ok: true, status: Status, data: JSON.parse(JSON.stringify(Datos)), error: null };
        }
        catch (ErrorApi) {
            return {
                ok: false, status: ErrorApi.status || 500, data: null,
                error: ErrorApi.status ? ErrorApi.message : "No se pudo completar la operación. Revisa el almacenamiento del navegador e intenta nuevamente."
            };
        }
    });
    // [IA] inicio · ia/2026-11-11_oscaroviedo-png_cola-operaciones.md
    Cola = Turno.then(function () {});
    return Turno;
    // [IA] fin
}

/* SESIÓN Y PERMISOS INTERNOS */

function sesion(Base) {
    const Usuario = Base.usuarios.find(function (U) { return U.id === Base.sesion; });
    if (!Usuario) {
        fallar(401, "Debes iniciar sesión para continuar.");
    }
    if (Usuario.estado !== "Activo") {
        fallar(403, "Esta cuenta está inactiva.");
    }
    return Usuario;
}

function administrador(Base) {
    const Usuario = sesion(Base);
    if (Usuario.rol !== "administrador") {
        fallar(403, "Esta operación requiere permisos de administrador.");
    }
    return Usuario;
}

function accesoInvernadero(Base, Id) {
    const Usuario = sesion(Base);
    const Invernadero = buscar(Base.invernaderos, Id);
    if (Usuario.rol !== "administrador" && Invernadero.usuarioId !== Usuario.id) {
        fallar(403, "No puedes acceder a recursos de otro usuario.");
    }
    return Invernadero;
}

function propios(Base, Recurso, Opciones = {}) {
    const Usuario = sesion(Base);
    if (Opciones.invernaderoId) {
        accesoInvernadero(Base, Opciones.invernaderoId);
    }
    const Permitidos = [];
    for (const Invernadero of Base.invernaderos) {
        if (Usuario.rol === "administrador" || Invernadero.usuarioId === Usuario.id) {
            Permitidos.push(Invernadero.id);
        }
    }
    return Base[Recurso].filter(function (Item) {
        if (Opciones.invernaderoId && Item.invernaderoId !== Opciones.invernaderoId) {
            return false;
        }
        return Permitidos.includes(Item.invernaderoId);
    });
}

function destino(Base, Datos) {
    const Usuario = sesion(Base);
    const Id = Datos.invernaderoId || Base.invernaderos.find(function (I) { return I.usuarioId === Usuario.id; })?.id;
    if (!Id) {
        fallar(422, "Indica el invernadero al que pertenece el recurso.");
    }
    return accesoInvernadero(Base, Id).id;
}

/* SESIÓN Y PERFIL */

export async function registrarUsuario(Datos, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        const Persona = validarPersona(Base, Datos);
        if (typeof Datos.contrasena !== "string" || Datos.contrasena.trim().length < 6 || Datos.contrasena.length > 128) {
            fallar(422, "La contraseña debe tener entre 6 y 128 caracteres y no contener solo espacios.");
        }
        if (Datos.contrasena !== Datos.confirmarContrasena) {
            fallar(422, "Las contraseñas no coinciden.");
        }
        const Usuario = {
            id: nuevoId(Base.usuarios, "User_"), ...Persona,
            contrasena: Datos.contrasena, rol: "usuario", estado: "Activo"
        };
        const Invernadero = {
            id: nuevoId(Base.invernaderos, "INV-"),
            nombre: texto(Datos.nombreInvernadero ?? "Invernadero de " + Persona.nombre, "Nombre del invernadero"),
            ubicacion: texto(Datos.ubicacion ?? "Por definir", "Ubicación"),
            estado: "Operativo", usuarioId: Usuario.id
        };
        Base.usuarios.push(Usuario);
        Base.invernaderos.push(Invernadero);
        return { usuario: publico(Usuario), invernadero: Invernadero };
    }, true, 201);
}

export async function iniciarSesion(Datos, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        objeto(Datos);
        const Correo = correo(Datos.correo);
        const Usuario = Base.usuarios.find(function (U) {
            return U.correo.toLowerCase() === Correo && U.contrasena === Datos.contrasena;
        });
        if (!Usuario) {
            fallar(401, "Correo o contraseña incorrectos.");
        }
        if (Usuario.estado !== "Activo") {
            fallar(403, "Esta cuenta está inactiva.");
        }
        Base.sesion = Usuario.id;
        return publico(Usuario);
    }, true);
}

export async function obtenerSesion(Opciones = {}) {
    return ejecutar(Opciones, function (Base) { return publico(sesion(Base)); });
}

export async function cerrarSesion(Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        Base.sesion = null;
        return null;
    }, true);
}

export async function obtenerPerfil(Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        const Usuario = sesion(Base);
        return {
            usuario: publico(Usuario),
            invernadero: Base.invernaderos.find(function (I) { return I.usuarioId === Usuario.id; }) || null
        };
    });
}

export async function actualizarPerfil(Datos, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        const Usuario = sesion(Base);
        objeto(Datos);
        if (Object.keys(Datos).some(function (Campo) { return !["nombre", "apellido", "correo"].includes(Campo); })) {
            fallar(403, "Desde el perfil solo puedes modificar nombre, apellido y correo.");
        }
        Object.assign(Usuario, validarPersona(Base, { ...Usuario, ...Datos }, Usuario.id));
        return publico(Usuario);
    }, true);
}

/* INVERNADEROS */

export async function obtenerInvernadero(Id, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        const Usuario = sesion(Base);
        const InvernaderoId = Id || Base.invernaderos.find(function (I) { return I.usuarioId === Usuario.id; })?.id;
        if (!InvernaderoId) {
            fallar(404, "Esta cuenta no tiene un invernadero asignado.");
        }
        return accesoInvernadero(Base, InvernaderoId);
    });
}

/* CULTIVOS Y SENSORES */

function accesoRecurso(Base, Recurso, Id) {
    sesion(Base);
    const Elemento = buscar(Base[Recurso], Id);
    accesoInvernadero(Base, Elemento.invernaderoId);
    return Elemento;
}

function ultimaMedicion(Base, Sensor) {
    const Registros = Base.registros.filter(function (R) { return R.sensorId === Sensor.id; });
    Registros.sort(function (A, B) { return (B.fecha + B.hora).localeCompare(A.fecha + A.hora); });
    return { ...Sensor, ultimaMedicion: Registros[0] || null };
}

function escribirRecurso(Recurso, Id, Datos, Opciones) {
    return ejecutar(Opciones, function (Base) {
        objeto(Datos);
        // Sin Id creamos; con Id buscamos el cultivo o sensor que vamos a editar.
        let Actual = null;
        let InvernaderoId;
        if (Id === null) {
            InvernaderoId = destino(Base, Datos);
        }
        else {
            Actual = accesoRecurso(Base, Recurso, Id);
            InvernaderoId = Actual.invernaderoId;
        }
        if (Actual && ((Datos.id !== undefined && Datos.id !== Actual.id) ||
            (Datos.invernaderoId !== undefined && Datos.invernaderoId !== InvernaderoId))) {
            fallar(403, "No puedes cambiar el identificador ni trasladar el recurso a otra instalación.");
        }
        // Los datos nuevos reemplazan los campos enviados y conservan los demás.
        const Campos = validarRecurso(Recurso, { ...Actual, ...Datos });
        if (Recurso === "sensores") {
            if (Base.sensores.some(function (S) { return S.id !== Id && S.invernaderoId === InvernaderoId && normalizar(S.nombre) === normalizar(Campos.nombre); })) {
                fallar(409, "Ya existe un sensor con ese nombre en la instalación.");
            }
            if (Actual && Campos.tipo !== Actual.tipo && Base.registros.some(function (R) { return R.sensorId === Id; })) {
                fallar(409, "No puedes cambiar el tipo de un sensor que tiene mediciones históricas.");
            }
        }
        if (Actual) {
            Object.assign(Actual, Campos);
            return Actual;
        }
        const Nuevo = {
            id: nuevoId(Base[Recurso], Recurso === "cultivos" ? "C-" : "SEN-"),
            ...Campos, invernaderoId: InvernaderoId
        };
        Base[Recurso].push(Nuevo);
        return Nuevo;
    }, true, Id === null ? 201 : 200);
}

function borrarRecurso(Recurso, Id, Opciones) {
    return ejecutar(Opciones, function (Base) {
        accesoRecurso(Base, Recurso, Id);
        Base[Recurso] = Base[Recurso].filter(function (Item) { return Item.id !== Id; });
        if (Recurso === "sensores") {
            Base.registros = Base.registros.filter(function (R) { return R.sensorId !== Id; });
        }
        return { id: Id };
    }, true);
}

export async function obtenerCultivos(Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        return filtrar(propios(Base, "cultivos", Opciones), Opciones, ["tipo", "estado"]);
    });
}

export async function obtenerCultivo(Id, Opciones = {}) {
    return ejecutar(Opciones, function (Base) { return accesoRecurso(Base, "cultivos", Id); });
}

export async function crearCultivo(Datos, Opciones = {}) {
    return escribirRecurso("cultivos", null, Datos, Opciones);
}

export async function editarCultivo(Id, Datos, Opciones = {}) {
    return escribirRecurso("cultivos", Id ?? "", Datos, Opciones);
}

export async function eliminarCultivo(Id, Opciones = {}) {
    return borrarRecurso("cultivos", Id, Opciones);
}

export async function obtenerSensores(Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        return filtrar(propios(Base, "sensores", Opciones), Opciones, ["tipo", "estado", "ubicacion"]).map(function (S) {
            return ultimaMedicion(Base, S);
        });
    });
}

export async function crearSensor(Datos, Opciones = {}) {
    return escribirRecurso("sensores", null, Datos, Opciones);
}

export async function editarSensor(Id, Datos, Opciones = {}) {
    return escribirRecurso("sensores", Id ?? "", Datos, Opciones);
}

export async function eliminarSensor(Id, Opciones = {}) {
    return borrarRecurso("sensores", Id, Opciones);
}

/* HISTORIAL Y DATOS PARA GRÁFICOS */

function registrosFiltrados(Base, Opciones) {
    const Sensores = propios(Base, "sensores", Opciones);
    if (Opciones.sensorId) {
        accesoRecurso(Base, "sensores", Opciones.sensorId);
    }
    const Desde = Opciones.desde ? fecha(Opciones.desde) : "";
    const Hasta = Opciones.hasta ? fecha(Opciones.hasta) : "";
    if (Desde && Hasta && Desde > Hasta) {
        fallar(422, "La fecha inicial no puede ser posterior a la fecha final.");
    }
    const Filtrados = filtrar(Sensores, { tipo: Opciones.tipo, ubicacion: Opciones.ubicacion }, ["tipo", "ubicacion"]);
    const Ids = Filtrados.map(function (S) { return S.id; });
    const Orden = Opciones.orden || "Fecha_DESC";
    if (!["Fecha_ASC", "Fecha_DESC"].includes(Orden)) {
        fallar(422, "El orden del historial debe ser Fecha_ASC o Fecha_DESC.");
    }
    const Registros = Base.registros.filter(function (R) {
        if (!Ids.includes(R.sensorId)) return false;
        if (Opciones.sensorId && R.sensorId !== Opciones.sensorId) return false;
        if (Desde && R.fecha < Desde) return false;
        if (Hasta && R.fecha > Hasta) return false;
        return true;
    });
    return Registros.sort(function (A, B) {
        return (A.fecha + A.hora).localeCompare(B.fecha + B.hora) * (Orden === "Fecha_DESC" ? -1 : 1);
    });
}

export async function obtenerRegistros(Opciones = {}) {
    return ejecutar(Opciones, function (Base) { return registrosFiltrados(Base, Opciones); });
}

export async function obtenerDatosGrafico(SensorId, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        const Sensor = accesoRecurso(Base, "sensores", SensorId);
        const Registros = registrosFiltrados(Base, { ...Opciones, sensorId: SensorId, orden: "Fecha_ASC" });
        return {
            sensor: Sensor,
            etiquetas: Registros.map(function (R) { return R.fecha + " " + R.hora; }),
            valores: Registros.map(function (R) { return R.valor; }),
            unidad: Sensor.unidad
        };
    });
}

function resumen(Base, Opciones) {
    const Cultivos = propios(Base, "cultivos", Opciones);
    const Sensores = propios(Base, "sensores", Opciones);
    const Registros = registrosFiltrados(Base, Opciones);
    const Promedios = {};
    // Sumamos por separado: no mezclamos temperatura, humedad y luz.
    for (const Tipo of Object.keys(UNIDADES)) {
        let Total = 0;
        let Cantidad = 0;
        for (const Registro of Registros) {
            const Sensor = Sensores.find(function (S) { return S.id === Registro.sensorId; });
            if (Sensor.tipo === Tipo) {
                Total += Registro.valor;
                Cantidad++;
            }
        }
        let Promedio = null;
        if (Cantidad > 0) {
            Promedio = Number((Total / Cantidad).toFixed(2));
        }
        Promedios[Tipo] = { valor: Promedio, unidad: UNIDADES[Tipo], cantidad: Cantidad };
    }
    return {
        totalCultivos: Cultivos.length, totalSensores: Sensores.length, totalRegistros: Registros.length,
        promedios: Promedios,
        actividadReciente: [...Registros].sort(function (A, B) { return (B.fecha + B.hora).localeCompare(A.fecha + A.hora); }).slice(0, 5)
    };
}

export async function obtenerResumen(Opciones = {}) {
    return ejecutar(Opciones, function (Base) { return resumen(Base, Opciones); });
}

/* ADMINISTRACIÓN */

export async function obtenerUsuarios(Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        administrador(Base);
        const Busqueda = normalizar(Opciones.busqueda || "");
        const Usuarios = Base.usuarios.filter(function (U) {
            return normalizar(U.nombre + " " + U.apellido + " " + U.correo).includes(Busqueda);
        });
        return filtrar(Usuarios, { ...Opciones, busqueda: "" }, ["rol", "estado"]).map(publico);
    });
}

export async function obtenerRecursosUsuario(Id, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        administrador(Base);
        const Usuario = buscar(Base.usuarios, Id);
        const Invernadero = Base.invernaderos.find(function (I) { return I.usuarioId === Id; }) || null;
        const Cultivos = Base.cultivos.filter(function (C) { return C.invernaderoId === Invernadero?.id; });
        const Sensores = Base.sensores.filter(function (S) { return S.invernaderoId === Invernadero?.id; });
        const Ids = Sensores.map(function (S) { return S.id; });
        return {
            usuario: publico(Usuario), invernadero: Invernadero, cultivos: Cultivos, sensores: Sensores,
            registros: Base.registros.filter(function (R) { return Ids.includes(R.sensorId); })
        };
    });
}

export async function eliminarUsuario(Id, Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        const Administrador = administrador(Base);
        buscar(Base.usuarios, Id);
        if (Id === Administrador.id) {
            fallar(409, "No puedes eliminar la cuenta con la que estás administrando.");
        }
        const Invernadero = Base.invernaderos.find(function (I) { return I.usuarioId === Id; });
        if (Invernadero) {
            const Sensores = Base.sensores.filter(function (S) { return S.invernaderoId === Invernadero.id; });
            const Ids = Sensores.map(function (S) { return S.id; });
            // Conservamos solamente los datos que no pertenecen a esta instalación.
            Base.registros = Base.registros.filter(function (R) { return !Ids.includes(R.sensorId); });
            Base.sensores = Base.sensores.filter(function (S) { return S.invernaderoId !== Invernadero.id; });
            Base.cultivos = Base.cultivos.filter(function (C) { return C.invernaderoId !== Invernadero.id; });
            Base.invernaderos = Base.invernaderos.filter(function (I) { return I.id !== Invernadero.id; });
        }
        Base.usuarios = Base.usuarios.filter(function (U) { return U.id !== Id; });
        return { id: Id };
    }, true);
}

export async function obtenerEstadisticasGlobales(Opciones = {}) {
    return ejecutar(Opciones, function (Base) {
        administrador(Base);
        return {
            totalUsuarios: Base.usuarios.length,
            usuariosActivos: Base.usuarios.filter(function (U) { return U.estado === "Activo"; }).length,
            totalInvernaderos: Base.invernaderos.length,
            ...resumen(Base, Opciones)
        };
    });
}

