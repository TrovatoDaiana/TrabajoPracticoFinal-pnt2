<template>
    <button class="btn btn-primary my-3 me-3" @click="$emit('obtener')"> Obtener</button>
    <button class="btn btn-primary my-3" @click="$emit('borrarAll')"> Borrar</button>

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
                        <th>acciones</th>
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
                        <td>
  
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
    props: ['peliculas', 'idEditar'],
    data() {
        return {

        };
    },
    watch: {
    },
    components: {
    },
    computed: {

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