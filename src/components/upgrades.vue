<template lang="html">
	<div class="upgrades_wrapper">
		<div v-if="upgradeTypes.length > 1">
			<tabs :tabs="upgradeTypes">
				<template v-for="type in upgradeTypes" v-slot:[type]>
					<div class="upgrade" v-for="upgrade in availableUpgrades.filter(v => v[1].type === type)">{{upgrade[1].name}}
						<custom-button :disabled="!canBuyUpgrade(upgrade[1])" @click="buyUpgrade(upgrade[0], upgrade[1])">Upgrade ({{cost(upgrade[1])}})</custom-button>
					</div>
				</template>
			</tabs>
		</div>
		<div v-else class="upgrade" v-for="upgrade in availableUpgrades">{{upgrade[1].name}}
			<custom-button :disabled="!canBuyUpgrade(upgrade[1])" @click="buyUpgrade(upgrade[0], upgrade[1])">Upgrade ({{cost(upgrade[1])}})</custom-button>
		</div>
	</div>
</template>

<script>
import { RESOURCES } from '../variables'
import tabs from './tabs'
import button from './button'
export default {
	components: {
		customButton: button,
		tabs
	},
	computed: {
		upgrades() {
			return this.$store.state.upgrades.upgrades
		},
		availableUpgrades() {
			return Object.entries(this.upgrades).filter(v => this.available(v[1]))
		},
		upgradeTypes() {
			const types = []
			for (let upgrade of this.availableUpgrades) {
				if (!types.includes(upgrade[1].type)) {
					types.push(upgrade[1].type)
				}
			}
			return types
		}
	},
  methods: {
		available(upgrade) {
			let building
			if (upgrade.upgrade.length) {
				building = upgrade.upgrade[0].value.split('.')[0]
			}
			else {
				building = upgrade.upgrade.value.split('.')[0]
			}
			return this.$store.getters.buildingAvailable(building) && this.resourcesAvailable(upgrade)
		},
		resourcesAvailable(upgrade) {
			for (let resource of RESOURCES) {
				if (upgrade[resource]) {
					if (!this.$store.getters.resourceAvailable(resource)) {
						return false
					}
				}
			}
			return true
		},
		canBuyUpgrade(upgrade) {
			return this.$store.getters.canBuyUpgrade(upgrade)
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
		buyUpgrade(name, upgrade) {
			this.$store.dispatch('buyUpgrade', { name, upgrade })
		}
  }
}
</script>

<style lang="css" scoped>
</style>
