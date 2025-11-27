<template>
    <div class="tabla-container">
        <div v-if="showControls" class="controls">
            <button
                class="btn btn-obtener"
                @click="$emit('obtener')"
                :class="{ 'btn-hover': hoverObtener }"
                @mouseover="hoverObtener = true"
                @mouseleave="hoverObtener = false"
            >
                Obtener
            </button>
            <button
                class="btn btn-borrar"
                @click="$emit('borrarAll')"
                :class="{ 'btn-hover': hoverBorrar }"
                @mouseover="hoverBorrar = true"
                @mouseleave="hoverBorrar = false"
            >
                Borrar
            </button>
        </div>

        <div v-if="peliculas.length">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Título</th>
                            <th>Año de Estreno</th>
                            <th>Duración</th>
                            <th>Género</th>
                            <th>Director</th>
                            <th>Actores</th>
                            <th>Descripción</th>
                            <th>Puntuación</th>
                            <th v-if="showActions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(pelicula, index) in peliculas"
                            :key="pelicula.id || index"
                            :class="{ 'row-highlight': index % 2 === 0 }"
                            :style="{
                                backgroundColor: index % 2 === 0 ? '#222' : '#141414',
                                color: '#fff',
                            }"
                        >
                            <td>{{ pelicula.id }}</td>
                            <td>
                                <img
                                    :src="pelicula.imagen"
                                    alt="Imagen de la película"
                                    class="imagen-tabla"
                                />
                            </td>
                            <td>{{ pelicula.titulo }}</td>
                            <td>{{ pelicula.anioDeEstreno }}</td>
                            <td>{{ pelicula.duracion }}</td>
                            <td>{{ pelicula.genero }}</td>
                            <td>{{ pelicula.director }}</td>
                            <td>{{ pelicula.actores }}</td>
                            <td>{{ pelicula.descripcionDeLaPelicula }}</td>
                            <td>
                                <input
                                    type="number"
                                    class="rating-input"
                                    v-model.number="pelicula.puntuacion"
                                    @change="actualizarPuntuacion(pelicula.id, pelicula.puntuacion)"
                                    min="0"
                                    max="100"
                                />
                            </td>
                            <td v-if="showActions">

    <button
        :class="[
            'btn',
            { 'btn-warning': !ponerCancelarEdicion(pelicula.id), 'btn-primary': ponerCancelarEdicion(pelicula.id) },
            'my-1',
            'me-2'
        ]"
        @click="editar(pelicula.id)"
    >
        {{ ponerCancelarEdicion(pelicula.id) ? "Cancelar" : "Editar" }}
    </button>


    <button
        class="btn btn-info my-1 me-2"
        @click="verDetalles(pelicula.id)"
    >
        Ver detalles
    </button>

    <button
        class="btn btn-danger my-1 me-2"
        @click="borrar(pelicula.id)"
    >
        Borrar
    </button>

</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="alert alert-info">Pedir las películas a través del botón.</div>
    </div>
</template>

<script>
export default {
    name: "Tabla-Api",
    props: {
        peliculas: { type: Array, default: () => [] },
        idEditar: { type: [String, Number], default: null },
        showControls: { type: Boolean, default: true },
        showActions: { type: Boolean, default: true },
    },
    data() {
        return {
            hoverObtener: false,
            hoverBorrar: false,
        };
    },
    methods: {
        editar(id) {
            this.$emit("editar", id);
        },

        ponerCancelarEdicion(id) {
            return this.idEditar && this.idEditar == id;
        },

        async borrar(id) {
            this.$emit("borrar", id);
        },

        async actualizarPuntuacion(id, puntuacion) {
            this.$emit("actualizarPuntuacion", { id, puntuacion });
        },

        verDetalles(id) {
        this.$emit('ver-detalles', id)
    },

    },
};
</script>

<style scoped>

.tabla-container {
    background-color: #1c1c1c; 
    color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    font-family: "Arial", sans-serif;
    max-width: 1200px; 
    margin: 0 auto; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
}

.controls {
    display: flex;
    justify-content: center; 
    gap: 10px;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-obtener {
    background-color: #e50914; 
    color: #ffffff;
}

.btn-borrar {
    background-color: #444444; 
    color: #ffffff;
}

.btn-hover {
    transform: scale(1.05);
    background-color: #f40612 !important; 
}


.table-responsive {
    overflow-x: auto;
    margin-top: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center; 
    background-color: #2a2a2a; 
    border-radius: 8px;
    overflow: hidden;
}

.table thead {
    background-color: #e50914; 
    color: #ffffff;
}

.table th,
.table td {
    padding: 15px;
    border-bottom: 1px solid #444444; 
}

.table tr:nth-child(even) {
    background-color: #333333; 
}

.table tr:hover {
    background-color: #444444; 
}

.imagen-tabla {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
}

.row-highlight {
    font-weight: bold;
    color: #e50914;
}

.rating-input {
    width: 60px;
    padding: 5px;
    border: 1px solid #555555;
    border-radius: 4px;
    text-align: center;
    background-color: #1c1c1c; 
    color: #ffffff;
}

.alert-info {
    background-color: #333333; 
    color: #ffffff;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
}


</style>