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
    },
    ['ACTIVITY_CREATE']: ({ commit, dispatch }, activity: IActivity) => {
        return new Promise((resolve, reject) => {
            commit('ACTIVITIES_REQUEST');
            axios({ url: 'activity/', data: activity, method: 'POST' })
                .then(resp => {
                    const activity = resp.data;
                    commit('ACTIVITY_CREATED', activity);
                    resolve(resp);
                })
                .catch(err => {
                    commit('ACTIVITIES_ERROR', err);
                    reject(err);
                });
        });
    },
    ['ACTIVITY_UPDATE']: ({ commit, dispatch }, activity: IActivity) => {
        return new Promise((resolve, reject) => {
            commit('ACTIVITIES_REQUEST');
            axios({  url: 'activity/' + activity.id, data: activity, method: 'PUT' })
                .then(resp => {
                    // const activity = resp.data;
                    commit('ACTIVITY_UPDATED', activity);
                    resolve(resp);
                })
                .catch(err => {
                    commit('ACTIVITIES_ERROR', err);
                    reject(err);
                });
        });
    },
    ['ACTIVITY_DELETE']: ({ commit, dispatch }, activity: IActivity) => {
        return new Promise((resolve, reject) => {
            commit('ACTIVITIES_REQUEST');
            axios({ url: 'activity/' + activity.id, method: 'DELETE' })
                .then(resp => {
                    const activities = resp.data;
                    commit('ACTIVITY_DELETED', activity.id);
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
    ['ACTIVITIES_LOADED']: (state, activities: IActivity[]) => {
        state.status = 'success';
        state.activities = activities;
    },
    ['ACTIVITY_CREATED']: (state, activity: IActivity) => {
        state.status = 'success';
        state.activities.push(activity);
    },
    ['ACTIVITY_UPDATED']: (state, activity: IActivity) => {
        state.status = 'success';
        state.activities.splice(state.activities.findIndex(a => a.id === activity.id), 1, activity);
    },
    ['ACTIVITY_DELETED']: (state,  activity: IActivity) => {
        state.status = 'success';
        state.activities.splice(state.activities.findIndex(a => a.id === activity.id), 1);
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
