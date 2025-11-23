<template>
    <section class="card">
        <div class="card-header">
            <h3>Componente Http</h3>
        </div>

        <div class="card-body">
            <button class="btn btn-primary my-3 me-3" @click="obtener"> Obtener</button>
            <button class="btn btn-primary my-3" @click="posts=[]"> Borrar</button>

            
            <!-- <pre><p>{{ posts }}</p></pre> -->
             <div v-if="posts.length">
                <div class="table-responsive">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>userId</th>
                                <th>id</th>
                                <th>title</th>
                                <th>body</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(post,index) in posts" :key="index">
                                <td>{{ post.userId }}</td>
                                <td>{{ post.id }}</td>
                                <td>{{ post.title }}</td>
                                <td>{{ post.body }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="alert alert-info">Pedir los posts a traves del boton.</div>
        </div>
    </section>
</template>

<script>
import { obtenerPosts } from '../servicios/post.js';
export default {
	name: 'Componente Http',
	props: {
		// ejemplo: value: { type: [String, Number], default: '' }
	},
	data() {
	return {
        posts: []
    };
	},
	watch: {
        // observadores de propiedades o datos
    },
	components: {
		// subcomponentes
	},
	computed: {
		// propiedades computadas
	},
	methods: {
        async obtener(){
           const posts = await obtenerPosts ()
            console.log(posts);
            this.posts = posts;
        }
		
	},
    created() {
        // hook created
	},
	mounted() {
		this.obtener();
        
	},
	beforeUnmount() {
        clearInterval();
		// limpieza antes de destruir
	}
}
</script>

<style scoped>
.card-header {
    background-color: #66199d;
    color: white;
}
</style>