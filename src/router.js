import { createRouter, createWebHistory } from 'vue-router'

import Favoritas from './components/Favoritas.vue'
import Index from './components/index.vue'
import GrillaPeliculas from './components/GrillaPeliculas.vue';
import RankingPeliculas from './components/Ranking.vue';
import RandomMovie from './components/RandomMovie.vue';


const routes = [
    //ruta raiz por defecto
  { path: '/', redirect: '/index' },

    //rutas activas de los componentes
  { path: '/index', component: Index},
  { path: '/favoritas', component: Favoritas },
  { path: '/grillaPeliculas', component: GrillaPeliculas },
  {path: '/ranking', component: RankingPeliculas},
  {path: '/randomMovie', component: RandomMovie},


  //rutas no definidas o existentes
  { path: '/:pathMatch(.*)*', redirect: '/index' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router