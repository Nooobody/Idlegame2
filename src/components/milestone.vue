<template lang="html">
  <div class="milestone_wrapper">
    Next milestone:
    <br />
    {{ milestone }}
  </div>
</template>

<script>
export default {
  computed: {
    milestone() {
      return this.$store.getters.milestone
    }
  }
}
</script>

<style lang="css" scoped>
</style>
