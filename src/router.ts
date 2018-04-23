import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import LoginView from './components/LoginView.vue';
import MonthView from './components/MonthView.vue';

Vue.use(Router);

const routes: RouteConfig[] = [
  { path: '/', component: MonthView },
  { path: '/login', component: LoginView },
];

export default new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});
