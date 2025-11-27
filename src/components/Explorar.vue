<template>
  <div class="explorar-container">

    <h1 class="title">Explorar por género</h1>

    <div v-for="(pelis, genero) in peliculasPorGenero" :key="genero" class="genero-section">

      <h2 class="genero-title">{{ genero }}</h2>

      <div class="carrousel">
        <div
          v-for="p in pelis"
          :key="p.id"
          class="carrousel-item"
          @click="abrirDetalles(p)"
        >
          <img :src="p.imagen" class="carrousel-img" :alt="p.titulo" />
          <p class="carrousel-text">{{ p.titulo }}</p>
        </div>
      </div>

    </div>
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
  name: "Explorar",
  components: { PeliculaDetalle },

  data() {
    return {
      servicioPeliculas: new ServicioPeliculas(),
      peliculas: [],
      peliculaSeleccionada: null
    };
  },

  async mounted() {
    this.peliculas = await this.servicioPeliculas.getAll();
  },

  computed: {
  peliculasPorGenero() {
    const grupos = {};

    this.peliculas.forEach(p => {
      if (!p.genero) return;

      const limpio = p.genero.replace("Género:", "").trim();
      const generos = limpio.split("/").map(g => g.trim());

      generos.forEach(g => {
        if (!grupos[g]) grupos[g] = [];
        grupos[g].push(p);
      });
    });

    return grupos;
  }

  },

  methods: {
    abrirDetalles(p) {
      this.peliculaSeleccionada = { ...p };
    }
  }
};
</script>

<style scoped>
.explorar-container {
  padding: 30px;
  color: white;
}

.title {
  font-size: 2.4rem;
  margin-bottom: 25px;
}

.genero-section {
  margin-bottom: 40px;
}

.genero-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #b60b0b !important; 
  font-weight: bold;
  z-index: 9999;
  position: relative;
}

.carrousel {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 10px;
  scroll-behavior: smooth;
}

.carrousel::-webkit-scrollbar {
  height: 8px;
}

.carrousel::-webkit-scrollbar-thumb {
  background: #e50914;
  border-radius: 4px;
}

.carrousel-item {
  min-width: 180px;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.carrousel-item:hover {
  transform: scale(1.08);
}

.carrousel-img {
  width: 180px;
  height: 260px;
  object-fit: cover;
  border-radius: 6px;
}

.carrousel-text {
  margin-top: 5px;
  text-align: center;
  font-size: 0.9rem;
}
</style>