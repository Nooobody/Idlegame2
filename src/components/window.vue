<template lang="html">
	<div class="window" :style="{ ...conf.style }">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
  props: [
    'conf'
  ],
  computed: {
    hue () {
      return 'hue-rotate(' + this.conf.hueRotate + 'deg)'
    }
  }
}
</script>

<style lang="css" scoped>

.window {
  border: 20px double #000000;
	border-image: url('../assets/Border.png') 16 repeat;
	box-shadow: 6px 6px 3px -2px #000000;
  margin: 20px;
}

.window .content {
  background-color: #97714A;
}

</style>
