import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-awesome/icons/arrow-right';
import 'vue-awesome/icons/arrow-left';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/exclamation-circle';
import 'vue-awesome/icons/envelope';
import 'vue-awesome/icons/copy';
import 'vue-awesome/icons/check-circle';
import 'vue-awesome/icons/brands/facebook-f';
//import 'vue-awesome/icons' UNCOMMENT IF NEEDED
import Icon from 'vue-awesome/components/Icon';

Vue.config.productionTip = false;

Vue.component('v-icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
