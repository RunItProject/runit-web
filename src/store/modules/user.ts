import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../';
import IUser from '../../models/IUser';

const namespaced: boolean = false;

interface IState {
    user: IUser | null;
    status: 'loading' | 'success' | 'error' | null;
}
const state: IState = {
    user: null,
    status: null
};

const getters: GetterTree<IState, IRootState> = {
    currentUser: (state) => state.user
};

const actions: ActionTree<IState, IRootState> = {
    ['USER_REQUEST']: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit('USER_REQUEST');
            axios({ url: 'user/me', method: 'GET' })
                .then(resp => {
                    const user = resp.data;
                    commit('USER_SUCCESS', user);
                    resolve(resp);
                })
                .catch(err => {
                    commit('USER_ERROR', err);
                    reject(err);
                });
        });
    },
    ['USER_CLEAR']: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit('USER_SUCCESS', null);
            resolve();
        });
    }
};

const mutations: MutationTree<IState> = {
    ['USER_REQUEST']: (state) => {
        state.status = 'loading';
    },
    ['USER_SUCCESS']: (state, user: IUser) => {
        state.status = 'success';
        state.user = user;
    },
    ['USER_ERROR']: (state) => {
        state.status = 'error';
    }
};

export const user: Module<IState, IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
