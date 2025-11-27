# 🎥 Proyecto Final PNT2 - Gestión de Películas

Este proyecto es una aplicación web desarrollada en Vue.js que permite gestionar películas, incluyendo funcionalidades como agregar, editar, eliminar, marcar como favoritas y visualizar un ranking de películas.

---

## 🚀 Funcionalidades

- **Agregar Películas:** Permite agregar nuevas películas con detalles como título, año de estreno, duración, género, director, actores, descripción, puntuación y URL de la imagen.
- **Actualizar Películas:** Edita los datos de las películas existentes.
- **Eliminar Películas:** Elimina películas de la lista.
- **Favoritas:** Marca y desmarca películas como favoritas.
- **Ranking:** Visualiza un ranking dinámico de películas ordenadas por puntuación.
- **Grilla de Películas:** Muestra las películas en un formato de grilla visual.
- **Explorar Películas:** Permite explorar películas de manera aleatoria.
- **Rutas Dinámicas:** Navega entre las diferentes vistas de la aplicación.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - Vue.js 3
  - Vue Router
  - HTML5, CSS3, JavaScript
- **Backend:**
  - MockAPI (para simular una API REST)
- **Dependencias:**
  - Axios (para realizar solicitudes HTTP)

---

## 🌐 Rutas de la Aplicación

Las rutas están configuradas en el archivo `router.js` y permiten navegar entre las diferentes vistas de la aplicación:

| **Ruta**          | **Componente**         | **Descripción**                                                                 |
|--------------------|------------------------|---------------------------------------------------------------------------------|
| `/`               | Redirige a `/index`    | Ruta raíz que redirige al componente principal.                                |
| `/index`          | `Index.vue`            | Página principal para gestionar películas.                                     |
| `/favoritas`      | `Favoritas.vue`        | Permite agregar y eliminar películas favoritas.                                |
| `/grillaPeliculas`| `GrillaPeliculas.vue`  | Muestra las películas en un formato de grilla visual.                         |
| `/ranking`        | `Ranking.vue`          | Muestra un ranking de películas ordenadas por puntuación.                     |
| `/randomMovie`    | `RandomMovie.vue`      | Muestra una película aleatoria.                                               |
| `/explorar`       | `Explorar.vue`         | Permite explorar películas de manera interactiva.                             |
| `/:pathMatch(.*)*`| Redirige a `/index`    | Ruta para manejar páginas no encontradas (404).                               |

---

## 📂 Estructura del Proyecto


## Requisitos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <https://github.com/TrovatoDaiana/TrabajoPracticoFinal-pnt2>

 2. Navega al directorio del proyecto
    cd TrabajoPracticoFinal-pnt2

3. Instala las dependencias
    npm install
