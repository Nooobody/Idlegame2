<template lang="html">
  <div class="resource">{{resource_name}}: {{resource.toLocaleString()}}</div>
</template>

<script>
export default {
  props: [
    'resource_name',
    'resource'
  ]
}
</script>

<style lang="css" scoped>
.resource {
  text-transform: capitalize; }
</style>
