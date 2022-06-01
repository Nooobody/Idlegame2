<template lang="html">
  <div>
    <div class="tabs">
      <custom-button v-for="tab in tabs" :key="tab" :selected="selected === tab" @click="select(tab)" class="tab_button">{{tab.toUpperCase()}}</custom-button>
    </div>
    <slot v-for="tab in tabs" :name="tab" v-if="selected === tab" />
  </div>
</template>

<script>
import button from './button'
export default {
  components: {
    customButton: button
  },
  props: [
    'tabs'
  ],
  data() {
    return {
      selected: this.tabs[0]
    }
  },
  methods: {
    select(tab) {
      this.selected = tab
    }
  }
}
</script>

<style lang="css" scoped>
.tabs {
  margin-top: -14px;
}

.tab_button {
  border-top-width: 0!important;
  top: -10px!important;
}
</style>
