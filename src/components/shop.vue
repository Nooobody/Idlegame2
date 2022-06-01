<template lang="html">
  <div>
		<div class="header">Shop</div>
    <br />
		<div class="building_shop">
			<div class="building_available" v-for="building in shopBuildings" v-if="resourcesAvailable(building)">
				<div class="header">{{getName(building)}}</div>
				<div class="cost">Cost: {{cost(getBuilding(building))}}</div>
				<custom-button :disabled="!canBuyBuilding(building)" @click="handleBuy(building)">Buy</custom-button>
			</div>
		</div>
  </div>
</template>

<script>
import { RESOURCES } from '../variables'
import button from './button'
export default {
  components: {
    customButton: button
  },
  computed: {
    shopBuildings() {
      return this.$store.state.buildings.shopBuildings
    },
		allBuildings() {
			return this.$store.state.buildings.allBuildings
		},
  },
  methods: {
    resourcesAvailable(building) {
			for (let resource of RESOURCES) {
				if (this.getBuilding(building)[resource]) {
					if (!this.$store.getters.resourceAvailable(resource)) {
						return false
					}
				}
			}
      return true
    },
    getName(building) {
      return this.getBuilding(building).name
    },
		getBuilding(building) {
			return this.allBuildings[building]
		},
		canBuyBuilding(building) {
			return this.$store.getters.canBuyBuilding(this.getBuilding(building))
		},
    cost (upgrade) {
      let arr = []

      for (let resource of RESOURCES) {
        if (upgrade[resource]) {
          arr.push(upgrade[resource].toLocaleString() + ' ' + resource)
        }
      }

      let str = ''
      for (let cost of arr) {
        str += str ? ', ' + cost : cost
      }

      return str
    },
    handleBuy (name) {
      const building = this.getBuilding(name)
      this.$store.dispatch('buyBuilding', { name, building })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
