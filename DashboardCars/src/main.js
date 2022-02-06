import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import Vuelidate from 'vuelidate'
import Snotify from 'vue-snotify';

import CarsDashboard from "./plugins/CarsDashboard";
import Multiselect from 'vue-multiselect'

import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import "bootstrap/dist/css/bootstrap.css";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Vue.forceUpdate();
Vue.use(CarsDashboard);
Vue.component('multiselect', Multiselect);
Vue.use(datePicker);
Vue.use(Vuelidate)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Snotify);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
