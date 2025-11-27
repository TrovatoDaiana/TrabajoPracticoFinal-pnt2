<template>
    <form @submit.prevent="enviarActualizar" class="form-container">
        <div
            class="form-group"
            v-for="(campo, key) in campos"
            :key="key"
        >
            <label :for="key">{{ campo.label }}</label>
            <input
                :type="campo.type"
                :id="key"
                class="form-control"
                v-model.trim="pelicula[key]"
                @input="peliculaDirty[key] = true"
                :class="{ 'is-invalid': peliculaDirty[key] && !pelicula[key] }"
                :style="peliculaDirty[key] && !pelicula[key] ? invalidStyle : {}"
                :placeholder="campo.placeholder || ''"
            />
            <div
                v-if="peliculaDirty[key] && !pelicula[key]"
                class="alert alert-danger mt-1"
            >
                Campo requerido
            </div>
        </div>

        <!-- Campo adicional para la puntuación -->
        <div class="form-group">
            <label for="puntuacion">Puntuación</label>
            <input
                type="number"
                id="puntuacion"
                class="form-control"
                v-model.number="pelicula.puntuacion"
                @input="peliculaDirty.puntuacion = true"
                :class="{ 'is-invalid': peliculaDirty.puntuacion && !pelicula.puntuacion }"
                :style="peliculaDirty.puntuacion && !pelicula.puntuacion ? invalidStyle : {}"
                min="0"
                max="100"
            />
            <div
                v-if="peliculaDirty.puntuacion && !pelicula.puntuacion"
                class="alert alert-danger mt-1"
            >
                Campo requerido
            </div>
        </div>

        <button
            class="btn btn-submit my-3"
            :disabled="algunCampoNoValido"
            :class="{ 'btn-disabled': algunCampoNoValido }"
        >
            {{ idEditar ? "Actualizar" : "Enviar" }}
        </button>
    </form>
</template>

<script>
export default {
    name: "Entrada-Api",
    props: ["idEditar", "peliculaIni"],
    data() {
        return {
            pelicula: this.iniForm(),
            peliculaDirty: this.iniForm(),
            campos: {
                titulo: { label: "Título", type: "text" },
                anioDeEstreno: { label: "Año de Estreno", type: "date" },
                duracion: { label: "Duración", type: "number" },
                genero: { label: "Género", type: "text" },
                director: { label: "Director", type: "text" },
                actores: { label: "Actores", type: "text" },
                descripcionDeLaPelicula: {
                    label: "Descripción de la Película",
                    type: "text",
                },
                imagen: {
                    label: "URL de la Imagen",
                    type: "url",
                    placeholder: "https://example.com/imagen.jpg", 
                },
            },
            invalidStyle: {
                border: "1px solid red",
                backgroundColor: "#ffe6e6",
            },
        };
    },
    watch: {
        peliculaIni(nuevo) {
            if (nuevo && Object.keys(nuevo).length) {
                this.pelicula = { ...nuevo };
            } else {
                this.pelicula = this.iniForm();
            }
            this.peliculaDirty = this.iniForm();
        },
    },
    computed: {
        algunCampoNoValido() {
            return Object.entries(this.pelicula)
                .filter(([key, val]) => {
                    if (key === "id") return false;
                    if (val === null) return true;
                    if (typeof val === "string" && val.trim() === "") return true;
                    if (typeof val === "number" && Number.isNaN(val)) return true;
                    return false;
                })
                .length > 0;
        },
    },
    methods: {
        iniForm() {
            return {
                id: null,
                titulo: null,
                anioDeEstreno: null,
                duracion: null,
                genero: null,
                director: null,
                actores: null,
                descripcionDeLaPelicula: null,
                puntuacion: null,
                imagen: null, 
            };
        },
        async enviarActualizar() {
            const pelicula = { ...this.pelicula };

            this.$emit("enviarActualizar", pelicula);

            this.pelicula = this.iniForm();
            this.peliculaDirty = this.iniForm();
        },
    },
};
</script>