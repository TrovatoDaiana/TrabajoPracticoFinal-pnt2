<template>
  <div class="favoritas-container">
    <h2 class="title">Agrega y Elimina Películas Favoritas</h2>

    <div class="controls mb-3">
      <button class="btn btn-obtener me-2" @click="obtener">Actualizar lista</button>
      <button class="btn btn-toggle" @click="showTabla = !showTabla">
        {{ showTabla ? 'Ocultar tabla' : 'Mostrar tabla de favoritas' }}
      </button>
    </div>

    <div v-if="!peliculas.length" class="alert alert-info">
      No hay películas cargadas. Presiona "Actualizar lista".
    </div>

    <div v-else>
      <!-- Animación para las tarjetas -->
      <transition-group name="fade" tag="div" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2 mb-4">
        <div class="col" v-for="pel in peliculas" :key="pel.id">
          <div class="card h-100">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="card-title mb-0">{{ pel.titulo }}</div>
              <button class="btn btn-link p-0" @click="toggleFavorito(pel.id)">
                <span v-if="isFavorita(pel.id)" class="text-warning">★</span>
                <span v-else class="text-muted">☆</span>
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <div v-if="favoritosIds.length === 0" class="alert alert-info">
        No hay favoritas. Marca estrellas en la grilla.
      </div>

      <!-- Animación para mostrar/ocultar la tabla -->
      <transition name="slide-fade">
        <div v-if="showTabla">
          <Tabla :peliculas="peliculasFiltradas" :idEditar="null" :showControls="false" :showActions="false" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ServicioPeliculas from "@/servicios/peliculas";
import Tabla from "./Tabla.vue";

export default {
  name: "Favoritas",
  components: { Tabla },
  data() {
    return {
      peliculas: [],
      favoritosIds: [],
      showTabla: false,
      servicio: new ServicioPeliculas(),
    };
  },
  computed: {
    peliculasFiltradas() {
      return this.peliculas.filter((p) => this.favoritosIds.includes(p.id));
    },
  },
  methods: {
    async obtener() {
      const lista = await this.servicio.getAll();
      this.peliculas = Array.isArray(lista) ? lista : [];
      this.favoritosIds = this.favoritosIds.filter((id) =>
        this.peliculas.some((p) => p.id == id)
      );
      this.saveFavoritos();
    },
    toggleFavorito(id) {
      const idx = this.favoritosIds.indexOf(id);
      if (idx === -1) {
        this.favoritosIds.push(id);
      } else {
        this.favoritosIds.splice(idx, 1);
      }
      this.saveFavoritos();
    },
    isFavorita(id) {
      return this.favoritosIds.includes(id);
    },
    saveFavoritos() {
      try {
        localStorage.setItem(
          "peliculasFavoritas",
          JSON.stringify(this.favoritosIds)
        );
      } catch (e) {
        console.warn("No se pudo guardar favoritas en localStorage", e);
      }
    },
    loadFavoritos() {
      try {
        const raw = localStorage.getItem("peliculasFavoritas");
        this.favoritosIds = raw ? JSON.parse(raw) : [];
      } catch (e) {
        this.favoritosIds = [];
      }
    },
    async borrar(id) {
      await this.servicio.delete(id);
      const idx = this.favoritosIds.indexOf(id);
      if (idx !== -1) this.favoritosIds.splice(idx, 1);
      await this.obtener();
    },
  },
  async mounted() {
    this.loadFavoritos();
    await this.obtener();
  },
};
</script>

<style scoped>

.favoritas-container {
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

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
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

.btn-toggle {
  background-color: #dddddd; 
  color: #333333; 
}

.btn:hover {
  transform: scale(1.05);
}

.card {
  background-color: #ffffff; 
  color: #333333; 
  border: 1px solid #dddddd; 
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.card-title {
  font-weight: bold;
  color: #e50914; 
}


.alert-info {
  background-color: #f9f9f9; 
  color: #333333; 
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #dddddd; 
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>