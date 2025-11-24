<template>
    <section class="card">
        <div class="card-header">
            <h3>Index</h3>
        </div>

        <div class="card-body">

            <Entrada :idEditar="idEditar" :peliculaEditar="pelicula" @enviarActualizar="enviarActualizar"/>
            <hr/>

            <button class="btn btn-primary my-3 me-3" @click="obtener"> Obtener</button>
            <button class="btn btn-primary my-3" @click="peliculas=[]"> Borrar</button>

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
                            <tr v-for="(pelicula,index) in peliculas" :key="index">
                                <td>{{ pelicula.id }}</td>
                                <td>{{ pelicula.titulo }}</td>
                                <td>{{ pelicula.anioDeEstreno }}</td>
                                <td>{{ pelicula.duracion }}</td>
                                <td>{{ pelicula.genero }}</td>
                                <td>{{ pelicula.director }}</td>
                                <td>{{ pelicula.actores }}</td>
                                <td>{{ pelicula.descripcionDeLaPelicula }}</td>
                                <td>
                                    <button :class="['btn', {'btn-warning': !ponerCancelarEdicion(pelicula.id), 'btn-primary': ponerCancelarEdicion(pelicula.id)}, 'my-1', 'me-2']" @click="editar(pelicula.id)">
                                        {{ ponerCancelarEdicion(pelicula.id)? 'Cancelar' : 'Editar' }}
                                    </button>

                                    <button class="btn btn-danger my-1 me-2"@click="borrar(pelicula.id)">
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="alert alert-info">Pedir las peliculas a traves del boton.</div>
        </div>
    </section>
</template>

<script>
import ServicioPeliculas from '../../servicios/peliculas';
import Entrada from './Entrada.vue';
export default {
	name: 'Index-Api',
	props: {
		
	},
	data() {
	return {
        servicioPeliculas: new ServicioPeliculas(),
        peliculas: [],
        idEditar:null,
        pelicula: this.iniForm(),
        peliculaDirty: this.iniForm(),
    };
	},
	watch: {
        // observadores de propiedades o datos
    },
	components: {
        Entrada,
	},
	computed: {
        algunCampoNoValido(){
            return Object.entries(this.pelicula)
                .filter(([key, val]) => {
                    if (key === 'id') return false;
                    if (val === null) return true;
                    if (typeof val === 'string' && val.trim() === '') return true;
                    if (typeof val === 'number' && Number.isNaN(val)) return true;
                    return false;
                })
                .length > 0;
        }
    },
	methods: {
        iniForm(){
            return {
                id:null, 
                titulo:null, 
                anioDeEstreno:null, 
                duracion:null, 
                genero:null, 
                director:null, 
                actores:null, 
                descripcionDeLaPelicula:null, 
            }
        },
        
        async obtener(){
           const peliculas = await this.servicioPeliculas.getAll()
           this.peliculas = peliculas;
        },

        async enviarActualizar(pelicula){
            // pelicula viene desde el hijo via $emit
            //esto es lo que haria el update (put)
            if(this.idEditar){
                //actualizo el recurso remoto
                const peliculaActualizada = await this.servicioPeliculas.put(this.idEditar, pelicula);

                //actualizo de la lista localmente
                const index = this.peliculas.findIndex(p => p.id == peliculaActualizada.id);
                if(index !== -1) this.peliculas.splice(index, 1, peliculaActualizada);

                this.idEditar=null;
            }
             //esto es lo que haria el create (post)
            else{
                //agrego la pelicula al recurso remoto
                const peliculaGuardada = await this.servicioPeliculas.post(pelicula);
                //agrego la pelicula a la lista localmente
                this.peliculas.push(peliculaGuardada);

            }

            // limpiar formulario local y del hijo
            this.pelicula = this.iniForm();
            this.peliculaDirty = this.iniForm();
          
        },

        editar(id){
            console.log('editar ', id);
            //si no estoy en modo edicion, entro,sino salgo
            if(!this.idEditar || this.idEditar != id){
                this.idEditar=id

                //copiar datos de la pelicula a editar al formulario
                const peliculaAEditar = {...this.peliculas.find(p => p.id == id)};
                this.pelicula = peliculaAEditar
            }
            else{
                this.idEditar=null
                //si toco cancelar, limpio el formulario
                this.pelicula = this.iniForm();
                this.peliculaDirty = this.iniForm();
            }
        },
        ponerCancelarEdicion(id){
            return this.idEditar && this.idEditar==id;
        },

        async borrar(id){
            console.log('borrar ', id);
            if (confirm(`¿Estás seguro de que deseas borrar esta película con id:${id}?`)) {
            //elimino del recurso remoto
            const peliculaEliminada = await this.servicioPeliculas.delete(id);

            //elimino de la lista localmente
            const index = this.peliculas.findIndex(p => p.id == id);
            this.peliculas.splice(index, 1);
            }
        },
		
	},
    
	mounted() {
        this.obtener();
	},
	
}
</script>

<style scoped>
.card-header {
    background-color: #66199d;
    color: white;
}
label{
    text-transform: capitalize;
    font-style: italic;
}
</style>