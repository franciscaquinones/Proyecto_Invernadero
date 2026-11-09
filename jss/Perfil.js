import Alpine from "alpinejs";

Alpine.data("perfilUsuario", function () {

    return {

        editando: false,
        usuario: 
        {
            id: "User_001",
            nombre: "Jill",
            apellido: "Valentine",
            correo: "jill@umbrellabotanics.try",
            rol: "usuario",
            estado: "Activo"
        },

        instalacion: {
            id: "INV-001",
            nombre: "Instalación Alpha",
            ubicacion: "Montañas Arklay",
            estado: "Operativo"
        },

        formulario: {
            nombre: "",
            apellido: "",
            correo: ""
        },

        errores: {
            nombre: "",
            apellido: "",
            correo: ""
        },

        mensajeExito: "",

        iniciarEdicion() {

            this.errores = {
                nombre: "",
                apellido: "",
                correo: ""
            };

            this.mensajeExito = "";

            this.formulario = {
                nombre: this.usuario.nombre,
                apellido: this.usuario.apellido,
                correo: this.usuario.correo
            };

            this.editando = true;

        },

        cancelarEdicion() {

            this.errores = {
                nombre: "",
                apellido: "",
                correo: ""
            };

            this.mensajeExito = "";

            this.editando = false;

            this.formulario = {
                nombre: "",
                apellido: "",
                correo: ""
            };

        },

        guardarPerfil() {

            const Nombre = this.formulario.nombre.trim();
            const Apellido = this.formulario.apellido.trim();
            const Correo = this.formulario.correo.trim();

            this.errores = {
                nombre: "",
                apellido: "",
                correo: ""
            };

            this.mensajeExito = "";

            if (Nombre === "") {
                this.errores.nombre = "Ingresa tu nombre.";
            }

            if (Apellido === "") {
                this.errores.apellido = "Ingresa tu apellido.";
            }

            if (Correo === "") {
                this.errores.correo = "Ingresa tu correo electrónico.";
            }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Correo)) {
                this.errores.correo = "Ingresa un correo con formato válido.";
            }

            if (
                this.errores.nombre ||
                this.errores.apellido ||
                this.errores.correo
            ) {
                return;
            }

            this.usuario.nombre = Nombre;
            this.usuario.apellido = Apellido;
            this.usuario.correo = Correo;

            this.editando = false;

            this.mensajeExito =
                "Perfil actualizado en esta vista. Los cambios se perderán al recargar.";

        }

    };

});

Alpine.start();
