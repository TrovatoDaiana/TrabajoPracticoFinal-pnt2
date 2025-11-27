<template>
    <div class="ranking-container">
        <h3>Ranking de Películas segun Puntaje</h3>
        <button @click="obtenerPeliculas" class="btn-obtener">Obtener Películas</button>
        <ul class="ranking-list" v-if="peliculasOrdenadas.length">
            <li
                v-for="(pelicula, index) in peliculasOrdenadas"
                :key="pelicula.id"
                class="ranking-item"
            >
                <span class="ranking-position">#{{ index + 1 }}</span>
                <span class="ranking-title">{{ pelicula.titulo }}</span>
                <span class="ranking-score">{{ pelicula.puntuacion }}</span>
            </li>
        </ul>
        <p v-else>No hay películas disponibles. Haz clic en "Obtener Películas".</p>
    </div>
</template>

<script>
import ServicioPeliculas from '../servicios/peliculas';

export default {
    name: "RankingPeliculas",
    data() {
        return {
            peliculas: [], 
        };
    },
    computed: {
        peliculasOrdenadas() {
            console.log('Películas recibidas en Ranking.vue:', this.peliculas);
            if (!Array.isArray(this.peliculas)) {
                return [];
            }
            return [...this.peliculas].sort((a, b) => b.puntuacion - a.puntuacion);
        },
    },
    methods: {
        async obtenerPeliculas() {
            try {
                const servicioPeliculas = new ServicioPeliculas();
                this.peliculas = await servicioPeliculas.getAll(); 
                console.log('Películas obtenidas en Ranking.vue:', this.peliculas);
            } catch (error) {
                console.error('Error al obtener las películas:', error.message);
            }
        },
    },
};
</script>

<style scoped>

.ranking-container {
    background-color: #1c1c1c; 
    color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
    text-align: center;
}

h3 {
    text-align: center; 
    margin-bottom: 20px;
}

.btn-obtener {
    background-color: #e50914;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin: 0 auto 20px;
    display: block; 
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn-obtener:hover {
    transform: scale(1.05);
    background-color: #f40612;
}


.ranking-list {
    list-style: none;
    padding: 0;
    margin: 0;
}


.ranking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333333; 
    padding: 10px 15px;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
}

.ranking-item:hover {
    background-color: #444444; 
}


.ranking-position {
    font-weight: bold;
    color: #e50914;
}


.ranking-title {
    flex: 1;
    margin-left: 10px;
    font-size: 16px;
}


.ranking-score {
    font-weight: bold;
    color: #ffffff;
    background-color: #e50914; 
    padding: 5px 10px;
    border-radius: 4px;
}

p {
    text-align: center; 
    margin-top: 20px;
    font-size: 16px;
}
</style>