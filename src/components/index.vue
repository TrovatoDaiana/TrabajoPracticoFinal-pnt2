<template>
    <section class="card">
        <div class="card-header">
            <h3>Agregar Peliculas</h3>
        </div>

        <div class="card-body">
            <Entrada :idEditar="idEditar" :peliculaIni="peliculaIni" @enviarActualizar="enviarActualizar" />
            <hr />
             <div class="row g-2 mb-3">
      <div class="col-md-4">
        <label class="form-label">Buscar por título</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="busquedaTitulo"
          placeholder="Ej: Matrix"
        >
      </div>
      <div class="col-md-4">
        <label class="form-label">Filtrar por género</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="filtroGenero"
          placeholder="Ej: Acción, Drama..."
        >
      </div>
      <div class="col-md-4">
        <label class="form-label">Filtrar por año</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="filtroAnio"
          placeholder="Ej: 1999"
        >
      </div>
    </div>

            <Tabla
                :peliculas="peliculasFiltradas"
                :idEditar="idEditar"
                @editar="editar"
                @borrar="borrar"
                @obtener="obtener"
                @borrarAll="peliculas=[]"
                @actualizarPuntuacion="actualizarPuntuacion"
                @ver-detalles="verDetalles"
                />
            <RankingPeliculas 
                v-if="false"
                :peliculas="peliculas"
                @obtener="obtener"
             /> 
            <hr />
            <PeliculaDetalle
                v-if="peliculaSeleccionada"
                :pelicula="peliculaSeleccionada"
                @cerrar="cerrarDetalles"
/>
        </div>
    </section>
</template>

<script>
import ServicioPeliculas from '../servicios/peliculas';
import Entrada from '../components/Entrada.vue';
import Tabla from '../components/Tabla.vue';
import RankingPeliculas from '../components/Ranking.vue';
import PeliculaDetalle from './PeliculaDetalle.vue'

export default {
    name: 'Index-Api',
    data() {
        return {
            servicioPeliculas: new ServicioPeliculas(),
            peliculas: [],
            idEditar: null,
            peliculaIni: {},
            filtroGenero: '',
            filtroAnio: '',
            busquedaTitulo: '',
            peliculaSeleccionada: null
        };
    },
    components: {
        Entrada,
        Tabla,
        RankingPeliculas,
        PeliculaDetalle,
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
            };
        },
        async obtener() {
            const peliculas = await this.servicioPeliculas.getAll();
            console.log('Servicio getAll devuelve:', peliculas);
            this.peliculas = peliculas || [];
        },
        async enviarActualizar(pelicula) {
            if (this.idEditar) {
                const peliculaActualizada = await this.servicioPeliculas.put(this.idEditar, pelicula);
                console.log('PUT result:', peliculaActualizada);
                if (peliculaActualizada) {
                    const index = this.peliculas.findIndex(p => p.id == peliculaActualizada.id);
                    if (index !== -1) {
                        this.peliculas.splice(index, 1, peliculaActualizada);
                    } else {
                        this.peliculas.push(peliculaActualizada);
                    }
                } else {
                    console.error('No se recibió película actualizada del servidor');
                }
                this.idEditar = null;
            } else {
                const peliculaGuardada = await this.servicioPeliculas.post(pelicula);
                this.peliculas.push(peliculaGuardada);
            }
        },
        async actualizarPuntuacion({ id, puntuacion }) {
            try {
                console.log(`Actualizando puntuación de la película con ID ${id} a ${puntuacion}`);
                const peliculaActualizada = await this.servicioPeliculas.updatePuntuacion(id, puntuacion);
                console.log('Puntuación actualizada en el backend:', peliculaActualizada);

                const index = this.peliculas.findIndex(p => p.id == id);
                if (index !== -1) {
                    this.peliculas[index].puntuacion = peliculaActualizada.puntuacion;
                }
            } catch (error) {
                console.error('Error al actualizar la puntuación:', error.message);
            }
        },
        editar(id) {
            console.log('editar ', id);
            if (!this.idEditar || this.idEditar != id) {
                this.idEditar = id;
                const pelicula = { ...this.peliculas.find(p => p.id == id) };
                this.peliculaIni = pelicula;
            } else {
                this.idEditar = null;
                this.peliculaIni = {};
            }
        },
        ponerCancelarEdicion(id) {
            return this.idEditar && this.idEditar == id;
        },
        async borrar(id) {
            console.log('borrar ', id);
            if (confirm(`¿Estás seguro de que deseas borrar esta película con id:${id}?`)) {
                const peliculaEliminada = await this.servicioPeliculas.delete(id);
                const index = this.peliculas.findIndex(p => p.id == id);
                this.peliculas.splice(index, 1);
            }
        },
        verDetalles(id) {
      const pel = this.peliculas.find(p => p.id == id)
      if (pel) {
        this.peliculaSeleccionada = { ...pel }
      }
    },
         cerrarDetalles() {
      this.peliculaSeleccionada = null
    },

    },
    mounted() {
        this.obtener();
    },

    computed: {
  peliculasFiltradas() {
    return this.peliculas.filter(p => {
      const coincideGenero = this.filtroGenero
        ? p.genero && p.genero.toLowerCase().includes(this.filtroGenero.toLowerCase())
        : true

      const coincideAnio = this.filtroAnio
        ? String(p.anioDeEstreno).includes(this.filtroAnio)
        : true

      const coincideTitulo = this.busquedaTitulo
        ? p.titulo && p.titulo.toLowerCase().includes(this.busquedaTitulo.toLowerCase())
        : true

      return coincideGenero && coincideAnio && coincideTitulo
    })
  }
},
};
</script>

<style scoped>

.card {
    background-color: #f5f5f5; 
    color: #333333; 
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #e50914; 
    color: #ffffff;
    padding: 10px;
    border-radius: 8px 8px 0 0;
    text-align: center;
    font-weight: bold;
}

button {
    background-color: #e50914;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover {
    transform: scale(1.05);
    background-color: #f40612;
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

.table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.table tr:hover {
    background-color: #f1f1f1; 
}


hr {
    border: 1px solid #dddddd;
    margin: 20px 0;
}
</style>