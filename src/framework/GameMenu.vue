<template>
  <div class="menu">
    <div class="button mb" @click="renderCar('suv')">
      <div class="button-title">SUV</div>
      <small>A large vehicle with practical storage but generally lower performance.</small>
    </div>
    <div class="button mb" @click="renderCar('sedan')">
      <div class="button-title">Sedan</div>
      <small>An average sized vehicle with somewhat practical storage and generally average performance.</small>
    </div>
    <div class="button mb" @click="renderCar('old')">
      <div class="button-title">Old Car</div>
      <small>An old average sized vehicle with little storage and almost no performance.</small>
    </div>
    <div class="button mb" @click="renderCar('classic')">
      <div class="button-title">Classic Car</div>
      <small>An average sized vehicle with less storage but generally higher performance.</small>
    </div>
    <div class="button" @click="renderCar('bus')">
      <div class="button-title">Mini Bus</div>
      <small>A very large vehicle with a lot of storage but much lower performance.</small>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    renderCar(car) {
      this.$emit('selectCar', car);
    },
  },
};
</script>

<style scoped>
.menu {
  padding: 20px;
}

.button {
  outline: none;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
  padding: 10px;
  user-select: none;
  cursor: pointer;
}

.button:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.button-title {
  font-weight: 700;
  margin-bottom: 5px;
}

.mb {
  margin-bottom: 20px;
}
</style>