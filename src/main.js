// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import store from './store';
import router from './router'
import i18n from './lang';
import Icon from 'vue-svg-icon/Icon.vue';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(MuseUI);

Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
