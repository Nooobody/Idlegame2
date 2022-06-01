<template lang="html">
	<div class="resources_wrapper">
		<resource v-for="value, name in resources" v-if="resourceAvailable(name)" :key="name" :resource_name="name" :resource="value"></resource>
		<br />
		<resource resource_name="Food" :resource="food"></resource>
		<div class="no_production">
			{{ noProduction }}
		</div>
	</div>
</template>

<script>
import resource from './resource'
export default {
  components: {
    resource
  },
	computed: {
		resources() {
			return this.$store.state.resources.resources
		},
		food() {
			return this.workers.toLocaleString() + " / " + this.availableFood.toLocaleString()
		},
		noProduction() {
			if (this.availableFood === 0) {
				return "No production!"
			}

			if (this.availableFood < this.workers) {
				const penalty = Math.floor((this.availableFood / this.workers) * 100)
				return "Production penalty!"
			}

			return ""
		},
		workers() {
			return this.$store.getters.workers
		},
		availableFood() {
			return this.$store.getters.food
		}
	},
	methods: {
		resourceAvailable(resource) {
			return this.$store.getters.resourceAvailable(resource)
		}
	}
}
</script>

<style lang="css" scoped>
.resources_wrapper {
  width: 350px;
  line-height: 2.0; }

.no_production {
	font-weight: bold;
}
</style>
