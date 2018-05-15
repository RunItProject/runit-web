import axios from 'axios';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MonthView from './components/MonthView.vue';
import { RouteViews } from './models';
import router from './router';
import store from './store';



const app = new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    store,
    created() {
        axios.defaults.baseURL = 'http://localhost:5000/api/';
        if (localStorage.getItem('token')) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('AUTH_LOGOUT');
                    this.$router.push('/login');
                }
                return Promise.reject(error);
            }
        );
    }
    // mixins: [VueRouter],
});
