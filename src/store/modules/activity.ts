import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../';
import IActivity from '../../models/IActivity';

const namespaced: boolean = false;

interface IState {
    activities: IActivity[];
    status: 'loading' | 'success' | 'error' | null;
}
const state: IState = {
    activities: [],
    status: null
};

const getters: GetterTree<IState, IRootState> = {
};

const actions: ActionTree<IState, IRootState> = {
    ['ACTIVITIES_REQUEST']: ({ commit, dispatch }, userId) => {
        return new Promise((resolve, reject) => {
            commit('ACTIVITIES_REQUEST');
            axios({ url: 'activity/user/' + userId, method: 'GET' })
                .then(resp => {
                    const activities = resp.data;
                    commit('ACTIVITIES_LOADED', activities);
                    resolve(resp);
                })
                .catch(err => {
                    commit('ACTIVITIES_ERROR', err);
                    reject(err);
                });
        });
    }
};

const mutations: MutationTree<IState> = {
    ['ACTIVITIES_REQUEST']: (state) => {
        state.status = 'loading';
    },
    ['ACTIVITIES_LOADED']: (state, activites: IActivity[]) => {
        state.status = 'success';
        state.activities = activites;
    },
    ['ACTIVITIES_ERROR']: (state) => {
        state.status = 'error';
    }
};

export const activity: Module<IState, IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
