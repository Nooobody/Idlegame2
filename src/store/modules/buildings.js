import Vue from 'vue'
import * as R from 'ramda'
import { RESOURCES, BUILDINGS } from '../../variables'

const resourceGetters = {
  ...Object.entries(BUILDINGS)
    .filter(v => v[1].staticResource)
    .reduce((acc, cur) => {
      acc[cur[1].staticResource.name] = (state) => {
        let workers = state.buildings[cur[0]].reduce((sum, value) => sum + value)
        return state.allBuildings[cur[0]].staticResource.amountPerWorker * workers
      }
      return acc
    }, {})
}

export default {
  state: {
    window: {
      style: {
        left: '440px',
        top: '20px'
      }
    },
    shopWindow: {
      style: {
        filter: 'hue-rotate(200deg)'
      }
    },
    allBuildings: BUILDINGS,
    shopBuildings: [
      'farm',
      'gold_mine'
    ],
    buildings: {
      farm: [0],
      forest: [0],
      stone_gathering: [0]
    },
    buildingTicks: []
  },
  getters: {
    ...resourceGetters,
    working(state) {
      let working = 0
      for (let building of Object.values(state.buildings)) {
        working += building.reduce((sum, value) => sum + value)
      }
      return working
    },
    stats(state) {
      return state.stats
    },
    getTick(state) {
      return (name, index) => {
        return state.buildingTicks.find(v => v.name === name && v.index === index)
      }
    },
    buildingAvailable(state) {
      return (building) => {
        for (let [ name, buildingArray ] of Object.entries(state.buildings)) {
          if (building === name && buildingArray.length > 0) {
            return true
          }
        }
        return false
      }
    },
    resourceAvailable(state) {
      return (resource) => {
        let buildings = []
        for (let [ name, building ] of Object.entries(state.allBuildings)) {
          if (building.staticResource && building.staticResource.name === resource) {
            buildings.push(name)
          }
          else if (building.tick && building.tick.resource.name === resource) {
            buildings.push(name)
          }
        }

        for (let [ name, buildingArray ] of Object.entries(state.buildings)) {
          if (buildings.includes(name) && buildingArray.length > 0) {
            return true
          }
        }
        return false
      }
    },
    canBuyBuilding(state, getters, rootState, rootGetters) {
      return (building) => {
        for (let resource of RESOURCES) {
          if (building[resource]) {
            if (rootGetters[resource] < building[resource]) {
              return false
            }
          }
        }
        return true
      }
    }
  },
  mutations: {
    addBuilding(state, data) {
      if (!state.buildings[data.name]) {
        Vue.set(state.buildings, data.name, [])
      }
      let building = state.buildings[data.name].slice()
      building.push(0)
      state.buildings[data.name] = building
    },
    addToBuilding(state, { name, index, workers }) {
      let building = state.buildings[name].slice()
      building[index] += workers || 1
      state.buildings[name] = building
    },
    takeFromBuilding(state, { name, index }) {
      let building = state.buildings[name].slice()
      building[index] -= 1
      state.buildings[name] = building
    },
    takeAllFromBuilding(state, { name, index }) {
      let building = state.buildings[name].slice()
      building[index] = 0
      state.buildings[name] = building
    },
    setBuildingStat(state, stat) {
      state[stat.name] = stat.value
    },
    addBuildingUpgrade(state, upgrade) {
      const path = R.lensPath(upgrade.value.split('.'))
      let current = R.view(path, state.allBuildings)
      switch (upgrade.op) {
        case '+':
          current += upgrade.amount
          break
        case '-':
          current -= upgrade.amount
          break
        case '*':
          current *= upgrade.amount
          break
        case '/':
          current /= upgrade.amount
          break
      }
      state.allBuildings = R.set(path, current, state.allBuildings)
    },
    adjustBuildingCost(state, building) {
      state.allBuildings[building.name][building.resource] = building.newCost
    },
    addShopBuildings(state, buildings) {
      state.shopBuildings = state.shopBuildings.concat(buildings)
    },
    addTick(state, tick) {
      state.buildingTicks.push(tick)
    },
    removeTick(state, { name, index }) {
      state.buildingTicks = state.buildingTicks.filter(v => v.name !== name || v.index !== index)
    }
  },
  actions: {
    processBuilding({state, commit, getters}, { name, index }) {
      let building = state.allBuildings[name]
      if (!building.tick) {
        return
      }

      commit('addTick', { name, index })
      const buildingTick = () => {
        let building = state.allBuildings[name]
        let workers = state.buildings[name][index]
        if (workers === 0 || !getters.getTick(name, index)) {
          if (getters.getTick(name, index)) {
            commit('removeTick', { name, index })
          }
          return
        }

        let foodPenalty = 1
        if (getters.availableFood < 0) {
          if (getters.food === 0) {
            foodPenalty = 0
          }
          else {
            foodPenalty = getters.food / getters.workers
          }
        }

        workers = state.buildings[name][index]
        if (building.tick.resource.amountPerWorker) {
          const amount = Math.floor(building.tick.resource.amountPerWorker * workers * foodPenalty)
          commit('addResource', { resource: building.tick.resource.name, amount })
          setTimeout(buildingTick, building.tick.delay)
        }
        else if (building.tick.resource.amountPerTick) {
          const tickDelay = building.tick.delay - (building.tick.delay / (building.workerCapacity + 1)) * workers
          if (building.tick.required) {
            if (getters[building.tick.required.name] > building.tick.required.amountPerTick) {
              commit('subtractResource', { resource: building.tick.required.name, amount: building.tick.required.amountPerTick })
            }
            else {
              // Not enough resources!
              setTimeout(buildingTick, tickDelay)
              return
            }
          }
          const amount = Math.floor(building.tick.resource.amountPerTick * foodPenalty)
          commit('addResource', { resource: building.tick.resource.name, amount })
          setTimeout(buildingTick, tickDelay)
        }
      }
      setTimeout(buildingTick, building.tick.delay)
    },
    addMaxWorkersToBuilding({commit, getters, dispatch}, building) {
      if (getters.freeWorkers > 0) {
        commit('addToBuilding', { ...building, workers: getters.freeWorkers })
        commit('takeAllWorkers')
        if (!getters.getTick(building.name, building.index)) {
          dispatch('processBuilding', building)
        }
      }
    },
    addWorkerToBuilding({commit, getters, dispatch}, building) {
      if (getters.freeWorkers > 0) {
        commit('addToBuilding', building)
        commit('takeWorker')
        if (!getters.getTick(building.name, building.index)) {
          dispatch('processBuilding', building)
        }
      }
    },
    removeWorkerFromBuilding({state, commit}, building) {
      if (state.buildings[building.name][building.index] > 0) {
        commit('takeFromBuilding', building)
        commit('returnWorker')
        if (state.buildings[building.name][building.index] === 0) {
          commit('removeTick', building)
        }
      }
    },
    removeAllWorkersFromBuilding({state, commit}, building) {
      const workers = state.buildings[building.name][building.index]
      if (workers > 0) {
        commit('takeAllFromBuilding', building)
        commit('returnWorkers', workers)
        commit('removeTick', building)
      }
    },
    buyBuilding({state, getters, commit, dispatch}, {name, building}) {
      if (!getters.canBuyBuilding(building)) {
        return
      }

      for (let resource of RESOURCES) {
        if (building[resource]) {
          commit('subtractResource', { resource, amount: building[resource] })
        }
      }

      commit('addBuilding', { name, building })
      if (building.mul) {
        for (let resource of RESOURCES) {
          if (building[resource]) {
            commit('adjustBuildingCost', { name, resource, newCost: Math.floor(building[resource] * building.mul) })
          }
        }
      }
      else if (building.add) {
        for (let resource of RESOURCES) {
          if (building[resource]) {
            commit('adjustBuildingCost', { name, resource, newCost: building[resource] + building.add })
          }
        }
      }
    }
  }
}
