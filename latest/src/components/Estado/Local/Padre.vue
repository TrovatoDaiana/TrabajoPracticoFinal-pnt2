<template>
    <section class="card">
        <div class="card-header">
            <h4>Componente Padre</h4>
         </div>
         
        <div class="card-body">
            <Hijo />
        </div>
    </section>
</template>

<script>
import Hijo from './Hijo.vue';
export default {
    name: 'padre-local',
    data() {
        return {
          
        }
    },
    methods: {
        
    },
    components: {
        Hijo
    },
    props: [],
    computed: {

    },
};
</script>

<style scoped>
.card-header {
    background-color: #8f66acff;
    color: white;
}
</style>