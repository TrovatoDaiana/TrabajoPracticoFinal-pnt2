<template>

    <form @submit.prevent="enviarActualizar">

        <div class="form-group">
            <label for="titulo">Titulo:</label>
            <input type="text" id="titulo" class="form-control" v-model.trim="pelicula.titulo" @input="peliculaDirty.titulo=true">

                <div v-if="peliculaDirty.titulo && !pelicula.titulo" class="alert alert-danger mt-1">
                     Campo requerido
                </div>
        </div>

        <div class="form-group">
            <label for="anioDeEstreno">Año de Estreno:</label>
            <input type="date" id="anioDeEstreno" class="form-control" v-model.date="pelicula.anioDeEstreno" @input="peliculaDirty.anioDeEstreno=true">

                <div v-if="peliculaDirty.anioDeEstreno && !pelicula.anioDeEstreno" class="alert alert-danger mt-1">
                     Campo requerido
                </div>
        </div>

        <div class="form-group">
            <label for="duracion">Duracion:</label>
            <input type="number" id="duracion" class="form-control" v-model.number="pelicula.duracion" @input="peliculaDirty.duracion=true">

                <div v-if="peliculaDirty.duracion && !pelicula.duracion" class="alert alert-danger mt-1">
                     Campo requerido
                 </div>
        </div>

        <div class="form-group">
            <label for="genero">Genero:</label>
            <input type="text" id="genero" class="form-control" v-model.trim="pelicula.genero" @input="peliculaDirty.genero=true">
                <div v-if="peliculaDirty.genero && !pelicula.genero" class="alert alert-danger mt-1">
                    Campo requerido
                </div>
        </div>
        <div class="form-group">
            <label for="director">Director:</label>
            <input type="text" id="director" class="form-control" v-model.trim="pelicula.director" @input="peliculaDirty.director=true">

                <div v-if="peliculaDirty.director && !pelicula.director" class="alert alert-danger mt-1">
                     Campo requerido
                 </div>
        </div>

        <div class="form-group">
            <label for="actores">Actores:</label>
            <input type="text" id="actores" class="form-control" v-model.trim="pelicula.actores" @input="peliculaDirty.actores=true">

                <div v-if="peliculaDirty.actores && !pelicula.actores" class="alert alert-danger mt-1">
                    Campo requerido
                </div>
        </div>

        <div class="form-group">
            <label for="descripcionDeLaPelicula">Descripcion de la Pelicula:</label>
            <input type="text" id="descripcionDeLaPelicula" class="form-control" v-model.trim="pelicula.descripcionDeLaPelicula" @input="peliculaDirty.descripcionDeLaPelicula=true">

                <div v-if="peliculaDirty.descripcionDeLaPelicula && !pelicula.descripcionDeLaPelicula" class="alert alert-danger mt-1">
                    Campo requerido
                </div>
        </div>

        <button class="btn btn-success my-3" :disabled="algunCampoNoValido">
            {{idEditar? 'Actualizar' : 'Enviar'}}
        </button>
    </form>

</template>

<script>
export default {
	name: 'Entrada-Api',
    props: [
        'idEditar',
        'peliculaEditar'
    ],
	data() {
	return {
        pelicula: this.peliculaEditar ? { ...this.peliculaEditar } : this.iniForm(),
        peliculaDirty: this.iniForm(),    
    };
	},
	watch: {
       
    },
	components: {
		// subcomponentes
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

        async enviarActualizar(){
            const pelicula = { ...this.pelicula }; 
            
            this.$emit('enviarActualizar', pelicula)

            this.pelicula = this.iniForm();
            this.peliculaDirty = this.iniForm();
          
        },
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