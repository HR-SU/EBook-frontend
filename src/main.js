// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import plugins from "./components/plugins"
import './css/common.css'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import assembleDate from './util/CommonUtils';
import formatPrice from './util/CommonUtils';
Vue.prototype.$axios = axios;

Vue.use(plugins);
Vue.use(ElementUI);
Vue.use(assembleDate);
Vue.use(formatPrice);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
