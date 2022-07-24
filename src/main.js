import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from '../router'

import './assets/less/index.less'

// 引入vuex @3.6.2
import store from '../store'

// 引入axios
import http from 'axios'

// 引入Mock

import '../api/mock.js'


Vue.prototype.$http = http


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
