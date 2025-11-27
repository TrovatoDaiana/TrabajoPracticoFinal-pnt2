<template>
    <section class="card">
        <div class="card-header">
            <h3>Grilla de peliculas</h3>
        </div>

        <div class="card-body">

            <Entrada :idEditar="idEditar" :peliculaIni="peliculaIni" @enviarActualizar="enviarActualizar"/>
            <hr/>

            <Tabla :peliculas="peliculas" :idEditar="idEditar" @editar="editar" @borrar="borrar" @obtener="obtener" @borrarAll="peliculas=[]"/>

        </div>
    </section>
</template>

<script>
import ServicioPeliculas from '../../servicios/peliculas';
import Entrada from './Entrada.vue';
import Tabla from './Tabla.vue';
export default {
	name: 'Index-Api',
	props: {
		
	},
	data() {
	return {
        servicioPeliculas: new ServicioPeliculas(),
        peliculas: [],
        idEditar:null,
        peliculaIni: {},
    };
	},
	watch: {
        // observadores de propiedades o datos
    },
	components: {
        Entrada,
        Tabla
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
              console.log('Servicio getAll devuelve:', peliculas)
              this.peliculas = peliculas || [];
        },

        async enviarActualizar(pelicula){
            // pelicula viene desde el hijo via $emit
            //esto es lo que haria el update (put)
            if(this.idEditar){
                //actualizo el recurso remoto
                const peliculaActualizada = await this.servicioPeliculas.put(this.idEditar, pelicula);
                console.log('PUT result:', peliculaActualizada);
                if (peliculaActualizada) {
                    //actualizo de la lista localmente
                    const index = this.peliculas.findIndex(p => p.id == peliculaActualizada.id);
                    if (index !== -1) {
                        this.peliculas.splice(index, 1, peliculaActualizada);
                    } else {
                        // si no estaba en la lista, añadirlo
                        this.peliculas.push(peliculaActualizada);
                    }
                } else {
                    console.error('No se recibió película actualizada del servidor')
                }
                this.idEditar=null;
            }
             //esto es lo que haria el create (post)
            else{
                //agrego la pelicula al recurso remoto
                const peliculaGuardada = await this.servicioPeliculas.post(pelicula);
                //agrego la pelicula a la lista localmente
                this.peliculas.push(peliculaGuardada);

            }
/* 
            // limpiar formulario local y del hijo
            this.pelicula = this.iniForm();
            this.peliculaDirty = this.iniForm(); */
          
        },

        editar(id){
            console.log('editar ', id);
            //si no estoy en modo edicion, entro,sino salgo
            if(!this.idEditar || this.idEditar != id){
                this.idEditar=id

                //copiar datos de la pelicula a editar al formulario
                const pelicula = {...this.peliculas.find(p => p.id == id)};
                this.peliculaIni = pelicula
            }
            else{
                this.idEditar=null
                //si toco cancelar, limpio el formulario
                this.peliculaIni = {}
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

</style>