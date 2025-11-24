import { createRouter, createWebHistory } from 'vue-router'


import Formulario from './components/Formulario/index.vue'
import Http from './components/Http.vue'
import Api from './components/Api/index.vue'
import Estado from './components/Estado/index.vue'


const routes = [
    //ruta raiz por defecto
  { path: '/', redirect: '/formulario' },
    //rutas activas de los componentes
  { path: '/formulario', component: Formulario },
  { path: '/http', component: Http },
  { path: '/api', component: Api },
  { path: '/estado', component: Estado },
  //rutas no definidas o existentes
  { path: '/:pathMatch(.*)*', redirect: '/formulario' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router