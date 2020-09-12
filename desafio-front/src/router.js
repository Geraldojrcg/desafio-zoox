import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home'
import Estado from './pages/Estado';
import Cidade from './pages/Cidade';

const routes = [
  {
    path: '/',
    redirect: "home"
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/estados',
    component: Estado,
  },
  {
    path: '/cidades',
    component: Cidade
  },
];

const router = new VueRouter({ mode: 'history', routes });

Vue.use(VueRouter);

export default router;