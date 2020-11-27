import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0,
    },
    getters: {
        doubleCounter: state => {
            return state.counter * 2;
        },
        stringCounter: state => {
            return state.counter + ' Clicks';
        }
    },
    mutations: {   //create mutations here
        increment: (state, payload) => {
            state.counter = state.counter + payload;
        },
        decrement: state => {
            state.counter--;
        }
    }
})