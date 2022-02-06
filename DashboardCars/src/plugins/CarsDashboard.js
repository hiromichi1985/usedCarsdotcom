import { BootstrapVue, IconsPlugin, LayoutPlugin, ModalPlugin , CardPlugin, VBScrollspyPlugin, DropdownPlugin, TablePlugin  } from 'bootstrap-vue'

//css assets:
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSlideoutPanel from 'vue2-slideout-panel';
// import './custom.scss'


export default {
    install(Vue) {
      Vue.use(BootstrapVue);
      Vue.use(IconsPlugin);
      Vue.use(LayoutPlugin);
      Vue.use(ModalPlugin);
      Vue.use(CardPlugin);
      Vue.use(VBScrollspyPlugin);
      Vue.use(DropdownPlugin);
      Vue.use(TablePlugin);
      Vue.use(VueSlideoutPanel);
    }
  }
  