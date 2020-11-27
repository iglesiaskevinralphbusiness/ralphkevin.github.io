import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store'; //call store

new Vue({
  el: '#app',
  store: store, //set store
  render: h => h(App)
})
