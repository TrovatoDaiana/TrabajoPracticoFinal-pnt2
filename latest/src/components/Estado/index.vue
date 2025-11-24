<template>
    <section class="card">
        <div class="card-header">
            <h3>Componente Estado</h3>
         </div>

        <div class="card-body">
            <padreLocal />
        </div>
    </section>
</template>

<script>
import padreLocal from './Local/Padre.vue';
export default {
    name: 'Estado',
    data() {
        return {
          
        }
    },
    methods: {
        
    },
    components: {
        padreLocal
    },
    props: [],
    computed: {

    },
};
</script>

<style scoped>
.card-header {
    background-color: #66199d;
    color: white;
}
</style>