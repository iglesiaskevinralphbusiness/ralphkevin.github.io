import Vue from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Header from './includes/Header.vue'
import Footer from './includes/Footer.vue'

Vue.component('cmp-home', Home);
Vue.component('cmp-header', Header);
Vue.component('cmp-footer', Footer);

new Vue({
  el: '#app',
  render: h => h(App)
})
