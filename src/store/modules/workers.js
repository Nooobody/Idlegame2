
export default {
  state: {
    freeWorkers: 4,
    food: 0,
    workerCost: 80
  },
  getters: {
    workerCost(state) {
      return Math.floor(state.workerCost)
    },
    freeWorkers(state) {
      return state.freeWorkers
    },
    workers(state, getters, rootState, rootGetters) {
      return state.freeWorkers + rootGetters.working
    },
    availableFood(state, getters, rootState, rootGetters) {
      return rootGetters.food - getters.workers
    }
  },
  mutations: {
    addWorker(state) {
      state.freeWorkers += 1
      state.workerCost *= 1.01
    },
    addWorkers(state, workers) {
      state.freeWorkers += workers
    },
    setWorkerCost(state, cost) {
      state.workerCost = cost
    },
    takeAllWorkers(state) {
      state.freeWorkers = 0
    },
    takeWorker(state) {
      state.freeWorkers -= 1
    },
    returnWorker(state) {
      state.freeWorkers += 1
    },
    returnWorkers(state, workers) {
      state.freeWorkers += workers
    }
  },
  actions: {
    addWorker({state, getters, commit}) {
      if (getters.gold >= getters.workerCost && getters.availableFood > 0) {
        commit('subtractGold', getters.workerCost)
        commit('addWorker')
      }
    },
    addMaxWorkers({state, getters, commit}) {
      let gold = getters.gold
      let spentGold = 0
      let workerCost = state.workerCost
      let workers = 0
      while (gold > workerCost && getters.workers + workers < getters.food) {
        spentGold += Math.floor(workerCost)
        gold -= Math.floor(workerCost)
        workerCost *= 1.01
        workers += 1
      }

      commit('subtractGold', spentGold)
      commit('addWorkers', workers)
      commit('setWorkerCost', workerCost)
    }
  }
}
