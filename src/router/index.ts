import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Fysiofresh | Home' },
  },
  {
    path: '/board',
    name: 'board',
    component: () => import('../views/BoardView.vue'),
    meta: { title: 'Fysiofresh | Board' },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = String(to.meta.title) || 'Title';
  next();
});

export default router
