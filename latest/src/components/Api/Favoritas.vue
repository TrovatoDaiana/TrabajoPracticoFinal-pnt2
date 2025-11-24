<template>
  <div>
    <h2>Favoritas</h2>

    <div class="mb-3">
      <button class="btn btn-primary me-2" @click="obtener">Actualizar lista</button>
      <button class="btn btn-secondary" @click="showTabla = !showTabla">{{ showTabla ? 'Ocultar tabla' : 'Mostrar tabla de favoritas' }}</button>
    </div>

    <div v-if="!peliculas.length" class="alert alert-info">No hay películas cargadas. Presiona "Actualizar lista".</div>

    <div v-else>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2 mb-4">
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
      </div>

      <div v-if="favoritosIds.length === 0" class="alert alert-info">No hay favoritas. Marca estrellas en la grilla.</div>

      <div v-if="showTabla">
        <Tabla :peliculas="peliculasFiltradas" :idEditar="null" :showControls="false" :showActions="false" />
      </div>
    </div>
  </div>
</template>

<script>
import ServicioPeliculas from '@/servicios/peliculas'
import Tabla from './Tabla.vue'

export default {
  name: 'Favoritas',
  components: { Tabla },
  data() {
    return {
      peliculas: [],
      favoritosIds: [],
      showTabla: false,
      servicio: new ServicioPeliculas()
    }
  },
  computed: {
    peliculasFiltradas() {
      return this.peliculas.filter(p => this.favoritosIds.includes(p.id))
    }
  },
  methods: {
    async obtener() {
      const lista = await this.servicio.getAll()
      this.peliculas = Array.isArray(lista) ? lista : []
      // limpiar favoritos que no existan
      this.favoritosIds = this.favoritosIds.filter(id => this.peliculas.some(p => p.id == id))
      this.saveFavoritos()
    },
    toggleFavorito(id) {
      const idx = this.favoritosIds.indexOf(id)
      if (idx === -1) {
        this.favoritosIds.push(id)
      } else {
        this.favoritosIds.splice(idx, 1)
      }
      this.saveFavoritos()
    },
    isFavorita(id) {
      return this.favoritosIds.includes(id)
    },
    saveFavoritos() {
      try {
        localStorage.setItem('peliculasFavoritas', JSON.stringify(this.favoritosIds))
      } catch (e) {
        console.warn('No se pudo guardar favoritas en localStorage', e)
      }
    },
    loadFavoritos() {
      try {
        const raw = localStorage.getItem('peliculasFavoritas')
        this.favoritosIds = raw ? JSON.parse(raw) : []
      } catch (e) {
        this.favoritosIds = []
      }
    },
    async borrar(id) {
      // borrar usando servicio y actualizar lista
      await this.servicio.delete(id)
      // quitar de favoritos si existía
      const idx = this.favoritosIds.indexOf(id)
      if (idx !== -1) this.favoritosIds.splice(idx, 1)
      await this.obtener()
    }
  },
  async mounted() {
    this.loadFavoritos()
    await this.obtener()
  }
}
</script>

<style scoped>
.card-title { font-weight: 600; }
</style>
