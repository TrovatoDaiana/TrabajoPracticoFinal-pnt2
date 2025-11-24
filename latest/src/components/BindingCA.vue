<template>
  <section class="card">
    <div class="card-header">
        <h3>Componente Binding CA</h3>
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

<!-- --------------------------------------- -->
<!--             COMPOSITION API             -->
<!-- --------------------------------------- -->
<script setup>
  import { computed, ref } from 'vue'

  // Estado local
  const mensaje = ref('Soy un mensaje')
  const mensajeHTML = ref('<i>Soy un mensaje</i>')
  const valor = ref(123)
  const valor2 = ref(321)
  const valor3 = ref(987)
  const contador = ref(0)
  const contador2 = ref(456)
  const contador3 = ref(789)

  // Propiedades computadas
  const lgValor3 = computed(() => {
    return String(valor3.value).length
  })

  // Métodos
  function incrementar() { 
    contador3.value++; 
  }

  function getContador() {
    return contador3.value
  }

  function actualizar(e) {
    //console.log('actualizar',e)
    const dato = e.target.value
    console.log(dato)

    valor2.value = dato
  }
</script>

<style scoped>
.card-header {
    background-color: blue;
    color: white;
}
</style>
