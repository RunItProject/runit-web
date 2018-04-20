import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MonthView from './components/MonthView.vue';
import { RouteViews } from './models';

const viewNames = ['completed', 'active', '*'];
const routes = viewNames.map((view): RouteConfig => ({
    path: '/' + view,
    component: MonthView,
    props: {
        currentView: view === '*' ? 'all' : view,
    },
}));

const router = new VueRouter({
    routes,
});

Vue.use(VueRouter);
const app = new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    // mixins: [VueRouter],
});
