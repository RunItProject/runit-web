import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import BaseLayout from './components/BaseLayout.vue';
import LoginLayout from './components/LoginLayout.vue';
import LoginView from './components/LoginView.vue';
import MonthView from './components/MonthView.vue';
import PlanView from './components/PlanView.vue';
import RegisterView from './components/RegisterView.vue';
import ResetPasswordView from './components/ResetPasswordView.vue';
import store from './store';

Vue.use(Router);

const routes: RouteConfig[] = [
  { path: '/', component: BaseLayout,
    beforeEnter(to, from, next) {
      store.dispatch('USER_REQUEST').then(next);
    },
    children: [
      { path: '/', component: MonthView },
      { path: '/plans', component: PlanView },
    ]
  },
  { path: '/', component: LoginLayout, meta: { allowAnonymous: true },
    children: [
      { path: '/login', component: LoginView },
      { path: '/register', component: RegisterView },
      { path: '/reset-password', component: ResetPasswordView },
    ]
  },
];

const router = new Router({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  const allowAnonymous: boolean = to.matched.some(record => record.meta.allowAnonymous);
  const isLoggedIn: boolean = store.getters.isAuthenticated;

  if (isLoggedIn || allowAnonymous) {
    next();
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath || '' }
    });
  }

});

export default router;
