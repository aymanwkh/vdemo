import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: () => import ('./views/home.vue')
  },
  {
    path: '/login',
    component: () => import ('./views/login.vue')
  },
  {
    path: '/employees/:type/:id',
    component: () => import ('./views/employees.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
