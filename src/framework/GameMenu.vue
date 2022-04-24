<template>
  <div class="menu">
    <div class="button mb" @click="renderCar('suv')">
      <div class="button-title">SUV</div>
      <div>A large vehicle with pratical storage but generally lower performance.</div>
    </div>
    <div class="button mb" @click="renderCar('sedan')">
      <div class="button-title">Sedan</div>
      <div>An average sized vehicle with somwhat pratical storage and generally average performance.</div>
    </div>
    <div class="button mb" @click="renderCar('old')">
      <div class="button-title">Old Car</div>
      <div>An old average sized vehicle with little storage and almost no performance.</div>
    </div>
    <div class="button mb" @click="renderCar('classic')">
      <div class="button-title">Classic Car</div>
      <div>An average sized vehicle with less storage but generally higher performance.</div>
    </div>
    <div class="button" @click="renderCar('bus')">
      <div class="button-title">Mini Bus</div>
      <div>A very large vehicle with alot of storage but much lower performance.</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      renderCar(car) {
          this.$emit('selectCar', car);
      },
  },
};
</script>

<style scoped>
.menu {
  padding: 30px;
}

.button {
  outline: none;
  background-color: transparent;
  border: 2px solid white;
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