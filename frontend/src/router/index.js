import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import toyApp from '../views/toyApp.vue';
import toyEdit from '../views/toyEdit.vue';
import toyDetails from '../views/toyDetails.vue';
import dashboard from '../views/dashboard.vue';
import about from '../views/about.vue';
import toyAdd from '../views/toyAdd.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/toyApp',
    name: 'toyApp',
    component: toyApp,
  },
  {
    path: '/toyEdit/:id?',
    name: 'toyEdit',
    component: toyEdit,
  },
  {
    path: '/toyAdd',
    name: 'toyAdd',
    component: toyAdd,
  },
  {
    path: '/toyDetails/:id',
    name: 'toyDetails',
    component: toyDetails,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
  },
  {
    path: '/about',
    name: 'about',
    component: about,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
