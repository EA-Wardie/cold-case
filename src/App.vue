<template>
  <canvas id="canvasRenderer" ref="canvasRenderer"></canvas>
</template>

<script>
import {GameInitializer} from "@/framework/GameInitializer";

export default {
  name: 'App',
  mounted() {
    new GameInitializer(this.$refs.canvasRenderer);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#canvasRenderer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
