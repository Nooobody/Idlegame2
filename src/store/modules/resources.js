
import { RESOURCES } from '../../variables'

export default {
  state: {
    window: {
      style: {
        left: '20px',
        top: '20px',
        filter: 'hue-rotate(80deg)'
      }
    },
    resources: RESOURCES.reduce((acc, cur) => { acc[cur] = 0; return acc }, {})
  },
  getters: RESOURCES.reduce((acc, cur) => {
    acc[cur] = (state) => state.resources[cur]
    return acc
  }, {}),
  mutations: {
    giveResources(state) {
      state.resources.gold += 10000
      state.resources.wood += 10000
      state.resources.stone += 10000
    },
    addResource(state, { resource, amount }) {
      state.resources[resource] += amount
    },
    subtractResource(state, { resource, amount }) {
      state.resources[resource] -= amount
    },
    addGold(state, gold) {
      state.resources.gold += gold
    },
    subtractGold(state, gold) {
      state.resources.gold -= gold
    },
    addWood(state, wood) {
      state.resources.wood += wood
    },
    subtractWood(state, wood) {
      state.resources.wood -= wood
    },
    addStone(state, stone) {
      state.resources.stone += stone
    },
    subtractStone(state, stone) {
      state.resources.stone -= stone
    }
  },
  actions: {

  }
}
