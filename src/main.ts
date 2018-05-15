import axios from 'axios';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MonthView from './components/MonthView.vue';
import { RouteViews } from './models';
import router from './router';
import store from './store';

axios.defaults.baseURL = 'http://localhost:5000/api/';
if (localStorage.getItem('token')) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch('AUTH_LOGOUT');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

const app = new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    store
    // mixins: [VueRouter],
});
