import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { activity } from './modules/activity';
import { auth } from './modules/auth';
import { user } from './modules/user';

Vue.use(Vuex);

export interface IRootState {
    version: string;
}
const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0' // a simple property
    },
    modules: {
        auth, user, activity
    }
};

export default new Vuex.Store<IRootState>(store);
