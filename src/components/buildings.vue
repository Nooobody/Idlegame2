<template lang="html">
	<div class="buildings_wrapper">
		<tabs :tabs="['food', 'materials']">
			<template v-slot:food>
				<div class="building_owned" v-for="building, buildingName in foodBuildings">
					<div class="header">{{allBuildings[buildingName].name}}</div>
					<div class="workers" v-for="workers, index in building">
						<div class="worker_amount">
							{{workers}} {{ allBuildings[buildingName].workerCapacity ? '/ ' + allBuildings[buildingName].workerCapacity : '' }}
						</div>
						<custom-button :disabled='!canAdd(buildingName, workers)' :small="true" @click="addWorker(buildingName, index)">+</custom-button>
						<custom-button :disabled="workers === 0" :small="true" @click="removeWorker(buildingName, index)">-</custom-button>
					</div>
				</div>
			</template>
			<template v-slot:materials>
				<div class="building_owned" v-for="building, buildingName in materialBuildings">
					<div class="header">
						<span class="toggle" :class="{ show: hiddenBuildings.includes(buildingName) }" @click="toggleBuilding(buildingName)" v-if="hasWorkerCapacity(buildingName)">{{hiddenBuildings.includes(buildingName) ? '+' : '-'}}</span>
						{{allBuildings[buildingName].name}}
					</div>
					<div class="workers" v-for="workers, index in building" v-if="!hiddenBuildings.includes(buildingName)">
						<div class="worker_amount">
							{{workers}} {{ allBuildings[buildingName].workerCapacity ? '/ ' + allBuildings[buildingName].workerCapacity : '' }}
						</div>
						<custom-button v-if="!hasWorkerCapacity(buildingName)" :disabled='!canAdd(buildingName, workers)' :small="true" @click="addMaxWorkers(buildingName, index)">Max</custom-button>
						<custom-button :disabled='!canAdd(buildingName, workers)' :small="true" @click="addWorker(buildingName, index)">+</custom-button>
						<custom-button :disabled="workers === 0" :small="true" @click="removeWorker(buildingName, index)">-</custom-button>
						<custom-button v-if="!hasWorkerCapacity(buildingName)" :disabled="workers === 0" :small="true" @click="removeAllWorkers(buildingName, index)">Min</custom-button>
					</div>
				</div>
			</template>
		</tabs>
	</div>
</template>

<script>
import { RESOURCES } from '../variables'
import button from './button'
import tabs from './tabs'
import { omit, pick } from 'ramda'
export default {
	components: {
		customButton: button,
		tabs
	},
	data() {
		return {
			hiddenBuildings: []
		}
	},
	computed: {
		allBuildings() {
			return this.$store.state.buildings.allBuildings
		},
		buildingsOwned() {
			return this.$store.state.buildings.buildings
		},
		foodBuildings() {
			return pick(["farm"], this.buildingsOwned)
		},
		materialBuildings() {
			return omit(["farm"], this.buildingsOwned)
		},
		freeWorkers() {
			return this.$store.state.workers.freeWorkers
		}
	},
  methods: {
		toggleBuilding(buildingName) {
			if (this.hiddenBuildings.includes(buildingName)) {
				this.hiddenBuildings = this.hiddenBuildings.filter(v => v !== buildingName)
			}
			else {
				this.hiddenBuildings.push(buildingName)
			}
		},
		canAdd(building, workers) {
			if (this.hasWorkerCapacity(building)) {
				return this.freeWorkers > 0 && workers < this.allBuildings[building].workerCapacity
			}
			else {
				return this.freeWorkers > 0
			}
		},
		hasWorkerCapacity(building) {
			return this.allBuildings[building].workerCapacity ? true : false
		},
		addMaxWorkers(name, index) {
			this.$store.dispatch('addMaxWorkersToBuilding', { name, index })
		},
    addWorker (name, index) {
			this.$store.dispatch('addWorkerToBuilding', { name, index })
    },
    removeWorker (name, index) {
			this.$store.dispatch('removeWorkerFromBuilding', { name, index })
    },
		removeAllWorkers(name, index) {
			this.$store.dispatch('removeAllWorkersFromBuilding', { name, index })
		}
  }
}
</script>

<style lang="css" scoped>
.header {
  text-transform: capitalize;
	padding-bottom: 11px;
}

.workers {
	display: inline-block;
	margin-right: 8px;
	margin-bottom: 8px;
}

.toggle {
	cursor: pointer;
	pointer-events: auto;
}
</style>
