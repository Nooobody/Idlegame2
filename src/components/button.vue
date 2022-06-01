<template lang="html">
	<div class="button" :class="{ disabled, selected }" @click="click" :style="style">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		"small",
		"disabled",
		"selected"
	],
  methods: {
    click() {
			if (this.disabled || this.selected) {
				return
			}
      this.$emit("click")
    }
  },
  computed: {
    style() {
      return this.small ? { 'border-width': '18px', 'font-size': '16px' } : {}
    }
  }
}
</script>

<style lang="css" scoped>

.button {
	display: inline-block;
  margin-top: 8px;
	position: relative;
  font-size: 12px;
  border: 20px double #000000;
  pointer-events: auto;
	cursor: pointer;
  border-image: url('../assets/Border.png') 16 repeat;
}
.button.selected {
	filter: brightness(1.3);
	cursor: initial;
}
.button.disabled {
  filter: brightness(0.6);
  cursor: initial;
}
.button:not(.disabled):not(.selected):hover {
  filter: brightness(1.2);
}
.button:not(.disabled):not(.selected):active {
  filter: brightness(0.9);
}

.button .content {
  margin-top: -10px;
  background-color: #97714A;
}
.tab_button .content {
	margin-top: 0px;
}

</style>
