
import { UPGRADES, RESOURCES } from '../../variables'
import { omit } from 'ramda'

export default {
  state: {
    window: {
      style: {
        left: '900px',
        top: '20px',
        filter: 'hue-rotate(-120deg)'
      }
    },
    upgrades: UPGRADES,
    unlocked: false,
    features: []
  },
  getters: {
    canBuyUpgrade(state, getters, rootState, rootGetters) {
      return (upgrade) => {
        for (let resource of RESOURCES) {
          if (upgrade[resource]) {
            if (rootGetters[resource] < upgrade[resource]) {
              return false
            }
          }
        }
        return true
      }
    }
  },
  mutations: {
    addFeature(state, feature) {
      state.features.push(feature)
    },
    adjustUpgradeCost(state, upgrade) {
      state.upgrades[upgrade.name][upgrade.resource] = upgrade.newCost
    },
    addUpgradeCount(state, name) {
      if (!state.upgrades[name].current) {
        state.upgrades[name].current = 0
      }
      state.upgrades[name].current += 1
      if (state.upgrades[name].current >= state.upgrades[name].limit) {
        state.upgrades = omit([name], state.upgrades)
      }
    },
    unlockUpgrades(state) {
      state.unlocked = true
    }
  },
  actions: {
    buyUpgrade({state, getters, commit, dispatch}, {name, upgrade}) {
      if (!getters.canBuyUpgrade(upgrade)) {
        return
      }

      dispatch('processUpgrade', { name, upgrade })
    },
    processUpgrade({commit, getters}, { name, upgrade }) {
      for (let resource of RESOURCES) {
        if (upgrade[resource]) {
          commit('subtractResource', { resource, amount: upgrade[resource] })
        }
      }

      if (upgrade.upgrade.feature) {
        commit('addFeature', upgrade.upgrade.feature)
      }
      else {
        if (upgrade.upgrade.length) {
          for (let upgr of upgrade.upgrade) {
            commit('addBuildingUpgrade', upgr)
          }
        }
        else {
          commit('addBuildingUpgrade', upgrade.upgrade)
        }
      }

      if (upgrade.mul) {
        for (let resource of RESOURCES) {
          if (upgrade[resource]) {
            commit('adjustUpgradeCost', { name, resource, newCost: Math.floor(upgrade[resource] * upgrade.mul) })
          }
        }
      } else if (upgrade.add) {
        for (let resource of RESOURCES) {
          if (upgrade[resource]) {
            commit('adjustUpgradeCost', { name, resource, newCost: upgrade[resource] + upgrade.add })
          }
        }
      }

      if (upgrade.limit) {
        commit('addUpgradeCount', name)
      }
    }
  }
}
