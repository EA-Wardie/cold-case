<template>
  <div>
    <canvas id="canvasRenderer" ref="canvasRenderer"></canvas>
    <game-menu id="gameMenu" @selectCar="renderCarFromType($event)"></game-menu>
  </div>
</template>

<script>
import GameInitializer from "./framework/GameInitializer";
import GameMenu from "./framework/GameMenu.vue";

export default {
  name: "App",
  mixins: [GameInitializer],
  components: { GameMenu },
  methods: {
    renderCarFromType(type) {
      this.renderCar(this.cars[type]);
    },
  },
  mounted() {
    this.initGame(this.$refs.canvasRenderer);
  },
};
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
  width: 100%;
  height: 100%;
}

#gameMenu {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 10px;
  border-radius: 10px;
}
</style>
