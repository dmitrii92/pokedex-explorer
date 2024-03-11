import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../views/PokemonList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PokemonList',
      component: PokemonList
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonDetail',
      component: () => import('../views/PokemonDetail.vue')
    }
  ]
});

export default router;
