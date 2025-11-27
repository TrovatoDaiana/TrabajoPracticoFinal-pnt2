<template>
  <div class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="modal-box">
      
      <img
        v-if="pelicula.imagen"
        :src="pelicula.imagen"
        class="modal-img"
        :alt="pelicula.titulo"
      />

      <div class="modal-header">
        <h2>{{ pelicula.titulo }}</h2>
        <button class="close-btn" @click="$emit('cerrar')">✕</button>
      </div>

      <div class="modal-body">
        <p><strong>Año de estreno:</strong> {{ pelicula.anioDeEstreno }}</p>
        <p><strong>Duración:</strong> {{ pelicula.duracion }} min</p>
        <p><strong>Género:</strong> {{ pelicula.genero }}</p>
        <p><strong>Director:</strong> {{ pelicula.director }}</p>
        <p><strong>Actores:</strong> {{ pelicula.actores }}</p>
        <p><strong>Descripción:</strong> {{ pelicula.descripcionDeLaPelicula }}</p>
      </div>

      <div class="modal-footer">
        <button class="btn-cerrar" @click="$emit('cerrar')">Cerrar</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PeliculaDetalle",
  props: {
    pelicula: { type: Object, required: true }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999; 
  animation: fadeIn 0.3s ease-out;
}

.modal-box {
  width: 90%;
  max-width: 600px;
  background: #141414;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e50914;
  animation: slideUp 0.35s ease-out;
}

.modal-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #333;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  line-height: 1.6;
}

.modal-footer {
  padding: 15px;
  border-top: 1px solid #333;
  text-align: right;
}

.btn-cerrar {
  background: #e50914;
  border: none;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>