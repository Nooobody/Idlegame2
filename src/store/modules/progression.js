
export default {
  state: {
    window: {
      style: {
        left: '20px',
        top: '240px',
        filter: 'grayscale(1) brightness(1.7)'
      }
    },
    timerId: undefined,
    currentMilestone: 0,
    milestones: [
      {
        name: '20 workers',
        objective(getters) {
          return getters.workers >= 20
        },
        unlock(commit) {
          commit('unlockUpgrades')
        }
      },
      {
        name: '100 workers',
        objective(getters) {
          return getters.workers >= 100
        },
        unlock(commit) {
          commit('addShopBuildings', [ 'iron_mine', 'quarry' ])
        }
      },
      {
        name: '400 workers',
        objective(getters) {
          return getters.workers >= 400
        },
        unlock(commit) {
          commit('addShopBuildings', [ 'lumbermill', 'advanced_gold_mine' ])
        }
      },
      {
        name: '1000 workers',
        objective(getters) {
          return getters.workers >= 1000
        }
      },
      {
        name: 'You beat the game! (For now)',
        objective() {
          return false
        }
      }
    ]
  },
  mutations: {
    progress(state) {
      state.currentMilestone += 1
    }
  },
  getters: {
    milestone(state) {
      return state.milestones[state.currentMilestone].name
    }
  },
  actions: {
    initProgression({ commit, dispatch, state, getters }) {
      state.timerId = setInterval(() => {
        const milestone = state.milestones[state.currentMilestone]
        if (milestone.objective(getters)) {
          if (milestone.unlock) {
            milestone.unlock(commit)
          }
          commit('progress')
        }
      }, 1000)
    }
  }
}
