<template>
  <div id="app" class="bg-image">
    <show-weather />
  </div>
</template>

<script>
import ShowWeather from "./components/ShowWeather.vue";

export default {
  components: {
    ShowWeather,
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
