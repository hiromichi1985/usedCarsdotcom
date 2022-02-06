import Vue from 'vue';
import Vuex from 'vuex';

//IMPORT MODULES AREA//
import carsModule from "./modules/carsModules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    carsModule
  }
})