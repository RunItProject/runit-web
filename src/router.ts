import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import BaseLayout from './components/BaseLayout.vue';
import LoginLayout from './components/LoginLayout.vue';
import LoginView from './components/LoginView.vue';
import MonthView from './components/MonthView.vue';
import PlanEditorView from './components/Plans/PlanEditorView.vue';
import PlansListView from './components/Plans/PlansListView.vue';
import RegisterView from './components/RegisterView.vue';
import ResetPasswordView from './components/ResetPasswordView.vue';
import SetNewPasswordView from './components/SetNewPasswordView.vue';
import store from './store';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/', component: BaseLayout,
    beforeEnter(to, from, next) {
      store.dispatch('USER_REQUEST').then(next);
    },
    children: [
      { path: '/', component: MonthView },
      { path: '/plans', component: PlansListView },
      { path: '/plans/:id', component: PlanEditorView }
    ]
  },
  {
    path: '/', component: LoginLayout, meta: { allowAnonymous: true },
    children: [
      { path: '/login', component: LoginView },
      { path: '/register', component: RegisterView },
      { path: '/reset-password', component: ResetPasswordView },
      { path: '/reset-password/:userId', component: SetNewPasswordView },
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
