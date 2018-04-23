import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MonthView from './components/MonthView.vue';
import { RouteViews } from './models';
import router from './router';

const app = new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    // mixins: [VueRouter],
});
