<template lang="html">
	<div class="workers">Available Workers: {{freeWorkers}}
		<custom-button :disabled="gold < workerCost || availableFood <= 0" @click="addWorker">Add ({{workerCost.toLocaleString()}} gold)</custom-button>
		<custom-button :disabled="gold < workerCost || availableFood <= 0" @click="addMaxWorkers">Max</custom-button>
	</div>
</template>

<script>
import button from './button'
export default {
	components: {
		customButton: button
	},
	computed: {
		gold() {
			return this.$store.getters.gold
		},
		freeWorkers() {
			return this.$store.state.workers.freeWorkers
		},
		availableFood() {
			return this.$store.getters.availableFood
		},
		workerCost() {
			return this.$store.getters.workerCost
		}
	},
	methods: {
		addWorker() {
			this.$store.dispatch('addWorker')
		},
		addMaxWorkers() {
			this.$store.dispatch('addMaxWorkers')
		}
	}
}
</script>

<style lang="css" scoped>
</style>
