<template>
  <div>
    <div class="bg" />
    <div class="wrapper">
      <game/>
    </div>
  </div>
</template>

<script>
import game from './components/game'

export default {
  name: 'App',
  components: {
    game
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);@font-face {
  font-family: "PixelFont";
  src: url("assets/Fipps-Regular.otf"); }

body {
  font-family: "PixelFont", "Open Sans", serif;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  user-select: none;
  pointer-events: none; }

.bg {
  background-image: url('assets/Brick.png');
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; }

.wrapper {
  z-index: 10;
  position: absolute;
  margin: 10px; }

.container {
  display: flex;
  width: 99vw;
}

.grid-4 {
  width: 25%;
}

button {
  font-family: "PixelFont";
  font-size: 12px;
  outline: none;
  background: transparent;
  border-width: 8px;
  border-image: url('assets/Border.png') 16 repeat;
  box-shadow: 4px 4px 0px 0px #000000;
  pointer-events: auto;
  cursor: pointer; }

</style>
