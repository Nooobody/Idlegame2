
import Vue from 'vue'
import Vuex from 'vuex'

import buildings from './modules/buildings'
import resources from './modules/resources'
import upgrades from './modules/upgrades'
import workers from './modules/workers'
import progression from './modules/progression'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    buildings,
    resources,
    upgrades,
    workers,
    progression
  }
})
