import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../';

const namespaced: boolean = false;

interface IState {
    token: string;
    status: 'loading' | 'success' | 'error' | null;
}
const state: IState = {
    token: localStorage.getItem('token') || '',
    status: null,
};

const getters: GetterTree<IState, IRootState> = {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
};

const actions: ActionTree<IState, IRootState> = {
    ['AUTH_REQUEST']: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST');
            axios({ url: 'user/auth', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token;
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('AUTH_SUCCESS', token);
                    dispatch('USER_REQUEST', user.email);
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    ['AUTH_REGISTER']: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST');
            axios({ url: 'user/register', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token;
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('AUTH_SUCCESS', token);
                    dispatch('USER_REQUEST', user.email);
                    resolve(resp);
                })
                .catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem('token');
                    reject(err);
                });
        });
    },
    ['AUTH_LOGOUT']: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
            commit('AUTH_LOGOUT');
            dispatch('USER_CLEAR');
            resolve();
        });
    }
};

const mutations: MutationTree<IState> = {
    ['AUTH_REQUEST']: (state) => {
        state.status = 'loading';
    },
    ['AUTH_SUCCESS']: (state, token: string) => {
        state.status = 'success';
        state.token = token;
    },
    ['AUTH_ERROR']: (state) => {
        state.status = 'error';
    },
    ['AUTH_LOGOUT']: (state) => {
        state.token = '';
    }
};

export const auth: Module<IState, IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
