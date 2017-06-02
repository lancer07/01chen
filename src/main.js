// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueResource from 'vue-resource';
Vue.use(Mint);
Vue.use(VueResource);

import App from './App'
import Photos from './page/Photos'
/* eslint-disable no-new */
window.bus = new Vue();
const HomePage = new Vue({
  el: '#app',
  template: '<App />',
  components: { App },
})
