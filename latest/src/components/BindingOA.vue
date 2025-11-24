<template>
  <section class="card">
    <div class="card-header">
        <h3>Componente Binding OA</h3>
    </div>

    <div class="card-body">
      <!-- ----------------------------------- -->
      <!--   Interpolación / v-text / v-html   -->
      <!-- ----------------------------------- -->
      <h4><u>Interpolación / v-text / v-html</u></h4>
      <br>

      <p>{{ 3 + 4 }}</p>
      
      <p>{{ mensaje }}</p>
      <p v-text="mensaje"></p>
      <p v-html="mensaje"></p>
      <br>
      <p>{{ mensajeHTML }}</p>
      <p v-text="mensajeHTML"></p>
      <p v-html="mensajeHTML"></p>

      <!-- ----------------------------------- -->
      <!--      Property Binding / v-bind      -->
      <!-- ----------------------------------- -->
      <h4><u>Property Binding / v-bind</u></h4>
      <br>

      <input type="text" value="123"><br>
      <input type="text" value="valor"><br>
      <input type="text" v-bind:value="valor"> {{ valor }}<br>
      <input type="text" :value="valor"> {{ valor }}<br>
      <hr>

      <!-- ----------------------------------- -->
      <!--        Event Binding / v-on         -->
      <!-- ----------------------------------- -->
      <h4><u>Event Binding / v-on</u></h4>
      <br>

      <button class="btn btn-success me-2" v-on:click="contador++">
        Contar {{ contador }}
      </button>

      <button class="btn btn-warning me-2" @click="contador2++">
        Contar {{ contador2 }}
      </button>

      <!-- <button class="btn btn-danger" @click="incrementar()"> -->
      <button class="btn btn-danger" @click="incrementar">
        Contar {{ getContador() }}
      </button>
      <hr>


      <!-- ----------------------------------- -->
      <!--      Doble Data Binding / v-model   -->
      <!-- ----------------------------------- -->
      <h4><u>Doble Data Binding / v-model</u></h4>
      <br>

      <h5>Manual</h5>
      <input type="text" :value="valor2" @input="actualizar($event)" > {{ valor2 }}<br>

      <br>

      <h5>Automático</h5>
      <input type="text" v-model="valor3"> {{ valor3 }} - <span><b>lgValor3</b>: {{ lgValor3 }}</span><br>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Binding', // cambiá el nombre si querés

  // Registrar componentes hijos
  components: {
  },

  // Propiedades que recibe el componente
  props: {
    // ejemplo: titulo: { type: String, default: '' }
  },

  // Estado local
  data() {
    return {
      mensaje: 'Soy un mensaje',
      mensajeHTML: '<i>Soy un mensaje</i>',
      valor: 123,
      valor2: 321,
      valor3: 987,
      contador: 0,
      contador2: 456,
      contador3: 789
    };
  },

  // Propiedades computadas
  computed: {
    lgValor3() {
      return String(this.valor3).length
    }
  },

  // Observadores
  watch: {
    // ejemplo: contador(nuevo, viejo) { /* ... */ }
  },

  // Métodos
  methods: {
    incrementar() { 
      this.contador3++; 
    },
    getContador() {
      return this.contador3
    },
    actualizar(e) {
      //console.log('actualizar',e)
      const valor2 = e.target.value
      console.log(valor2)

      this.valor2 = valor2
    }
  },

  // Ciclo de vida
  created() {
    // Se ejecuta al crear la instancia
  },
  mounted() {
    // Se ejecuta cuando el componente se monta en el DOM
  },
  unmounted() {
    // Limpieza al desmontar
  }
};
</script>

<style scoped>
.card-header {
    background-color: blue;
    color: white;
}
</style>
