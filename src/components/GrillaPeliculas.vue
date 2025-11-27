<template>
    <div class="lista-peliculas-container">
        <h3 class="title">Lista de Películas</h3>
        <div class="button-group">
            <button class="btn btn-obtener" @click="obtenerPeliculas">Obtener Películas</button>
            <button class="btn btn-actualizar" @click="obtenerPeliculas">Actualizar Tabla</button>
        </div>

        <div v-if="peliculas.length" class="table-responsive mt-4">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Año de Estreno</th>
                        <th>Duración</th>
                        <th>Género</th>
                        <th>Director</th>
                        <th>Actores</th>
                        <th>Descripción</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pelicula, index) in peliculas" :key="pelicula.id || index">
                        <td>{{ pelicula.id }}</td>
                        <td>{{ pelicula.titulo }}</td>
                        <td>{{ pelicula.anioDeEstreno }}</td>
                        <td>{{ pelicula.duracion }}</td>
                        <td>{{ pelicula.genero }}</td>
                        <td>{{ pelicula.director }}</td>
                        <td>{{ pelicula.actores }}</td>
                        <td>{{ pelicula.descripcionDeLaPelicula }}</td>
                        <td>{{ pelicula.puntuacion }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="alert alert-info mt-4">No hay películas disponibles. Presiona "Obtener Películas".</div>
    </div>
</template>

<script>
import ServicioPeliculas from "../servicios/peliculas";

export default {
    name: "ListaPeliculas",
    data() {
        return {
            peliculas: [], 
            servicioPeliculas: new ServicioPeliculas(), 
        }
    },
    methods: {
        async obtenerPeliculas() {
            try {
                const peliculas = await this.servicioPeliculas.getAll();
                console.log("Películas obtenidas:", peliculas);
                this.peliculas = Array.isArray(peliculas) ? peliculas : [];
            } catch (error) {
                console.error("Error al obtener las películas:", error.message);
                alert("No se pudieron obtener las películas. Intenta nuevamente.");
            }
        },
    },
};
</script>

<style scoped>
.lista-peliculas-container {
    background-color: #f5f5f5;
    color: #333333;
    padding: 20px;
    border-radius: 8px;
    font-family: "Arial", sans-serif;
}

.title {
    color: #e50914;
    text-align: center;
    margin-bottom: 20px;
}

.button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-obtener {
    background-color: #e50914;
    color: #ffffff;
}

.btn-actualizar {
    background-color: #333333;
    color: #ffffff;
}

.btn:hover {
    transform: scale(1.05);
}

.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table thead {
    background-color: #e50914;
    color: #ffffff;
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #dddddd;
}

.table tr:hover {
    background-color: #f9f9f9;
}

.alert {
    background-color: #f9f9f9;
    color: #333333;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
}
</style>