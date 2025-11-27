<template>
  <div class="random-container">

    <h1 class="title">¿Qué película ver hoy?</h1>

    <button class="btn-random" @click="elegirRandom">
      Elegir película al azar
    </button>

    <div v-if="pelicula" class="movie-card">

      <img
        v-if="pelicula.imagen"
        :src="pelicula.imagen"
        class="movie-img"
        :alt="pelicula.titulo"
      />

      <h2>{{ pelicula.titulo }}</h2>
      <p><strong>Año:</strong> {{ pelicula.anioDeEstreno }}</p>
      <p><strong>Género:</strong> {{ pelicula.genero }}</p>

      <button class="btn-detalle" @click="verDetalles">
        Ver detalles
      </button>

    </div>

    <!-- Modal reutilizado -->
    <PeliculaDetalle
      v-if="peliculaSeleccionada"
      :pelicula="peliculaSeleccionada"
      @cerrar="peliculaSeleccionada = null"
    />
  </div>
</template>

<script>
import ServicioPeliculas from "../servicios/peliculas";
import PeliculaDetalle from "../components/PeliculaDetalle.vue";

export default {
  name: "RandomMovie",
  components: { PeliculaDetalle },

  data() {
    return {
      servicioPeliculas: new ServicioPeliculas(),
      peliculas: [],
      pelicula: null,
      peliculaSeleccionada: null
    };
  },

  async mounted() {
    this.peliculas = await this.servicioPeliculas.getAll();
  },

  methods: {
    elegirRandom() {
      if (!this.peliculas.length) return;
      const index = Math.floor(Math.random() * this.peliculas.length);
      this.pelicula = this.peliculas[index];
    },

    verDetalles() {
      this.peliculaSeleccionada = { ...this.pelicula };
    }
  }
};
</script>

<style scoped>
.random-container {
  text-align: center;
  padding: 40px;
  color: white;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.btn-random {
  background: #e50914;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 30px;
}

.movie-card {
  background: #141414;
  padding: 25px;
  border-radius: 12px;
  max-width: 450px;
  margin: 0 auto;
  border: 2px solid #e50914;
}

.movie-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.btn-detalle {
  background: #e50914;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
}
</style>