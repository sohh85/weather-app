<template>
  <div id="app" class="bg-image">
    <Weather />
  </div>
</template>

<script>
import Weather from "./components/Weather.vue";

export default {
  components: {
    Weather,
  },
};
</script>

<style>
body,
html {
  height: 100%;
}
.bg-image {
  padding: 0 80px;
  background-image: url("assets/weather.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
