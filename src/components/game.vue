<template lang="html">
	<div class="container">
		<div class="grid-4">
			<window :conf="wResources">
				<!-- <custom-button @click="giveResources">Test</custom-button> -->
				<resources />
				<workers />
			</window>
			<window :conf="wMilestone">
				<milestone />
			</window>
		</div>
		<div class="grid-4">
			<window :conf="wBuildings">
				<buildings />
			</window>
		</div>
		<div class="grid-4">
			<window :conf="wShop">
				<shop />
			</window>
		</div>
		<div class="grid-4">
			<window :conf="wUpgrades" v-if="upgradesUnlocked">
				<upgrades />
			</window>
		</div>
	</div>
</template>

<script>
import upgrades from './upgrades'
import resources from './resources'
import buildings from './buildings'
import shop from './shop'
import workers from './workers'
import milestone from './milestone'
import window from './window'
import button from './button'

export default {
  components: {
    upgrades,
    resources,
    buildings,
		shop,
		milestone,
		workers,
		customButton: button,
    window,
  },
	created() {
		this.$store.dispatch('initProgression')
	},
	methods: {
		giveResources() {
			this.$store.commit('giveResources')
		}
	},
	computed: {
		upgradesUnlocked() {
			return this.$store.state.upgrades.unlocked
		},
		wResources() {
			return this.$store.state.resources.window
		},
		wUpgrades() {
			return this.$store.state.upgrades.window
		},
		wShop() {
			return this.$store.state.buildings.shopWindow
		},
		wBuildings() {
			return this.$store.state.buildings.window
		},
		wMilestone() {
			return this.$store.state.progression.window
		}
	},
}
</script>

<style lang="css" scoped>
</style>
