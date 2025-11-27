<template>
    <div v-if="showControls" class="mb-2">
        <button class="btn btn-primary my-3 me-3" @click="$emit('obtener')"> Obtener</button>
        <button class="btn btn-primary my-3" @click="$emit('borrarAll')"> Borrar</button>
    </div>

    <div v-if="peliculas.length">
        <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>titulo</th>
                        <th>año de estreno</th>
                        <th>duracion</th>
                        <th>genero</th>
                        <th>director</th>
                        <th>actores</th>
                        <th>descripcion de la pelicula</th>
                        <th v-if="showActions">acciones</th>
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
                        <td v-if="showActions">

                            <button
                                :class="['btn', { 'btn-warning': !ponerCancelarEdicion(pelicula.id), 'btn-primary': ponerCancelarEdicion(pelicula.id) }, 'my-1', 'me-2']"
                                @click="editar(pelicula.id)">
                                {{ ponerCancelarEdicion(pelicula.id) ? 'Cancelar' : 'Editar' }}
                            </button>

                            <button class="btn btn-danger my-1 me-2" @click="borrar(pelicula.id)">
                                Borrar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="alert alert-info">Pedir las peliculas a traves del boton.</div>

</template>

<script>
export default {
    name: 'Tabla-Api',
    props: {
        peliculas: { type: Array, default: () => [] },
        idEditar: { type: [String, Number], default: null },
        showControls: { type: Boolean, default: true },
        showActions: { type: Boolean, default: true }
    },
    methods: {
        editar(id) {
            console.log('editar', id)
            this.$emit('editar', id)
        },

        ponerCancelarEdicion(id) {
            return this.idEditar && this.idEditar == id
        },

        async borrar(id) {
            console.log('borrar', id)
            this.$emit('borrar', id)
        }
    },

}
</script>

<style scoped>
.table th {
  text-transform: uppercase;
  font-size: 1.1em;
}

</style>