import { createRouter, createWebHistory } from 'vue-router'

//import BindingCA from './components/BindingCA.vue'
import Api from './components/Api/index.vue'



const routes = [
    //ruta raiz por defecto
  { path: '/', redirect: '/api' },
    //rutas activas de los componentes
  { path: '/api', component: Api },
  //rutas no definidas o existentes
  { path: '/:pathMatch(.*)*', redirect: '/api' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router