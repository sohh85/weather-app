<template>
  <b-container class="text-center">
    <div class="my-5">
      <h1 class="mb-3">天気情報</h1>
      <select v-model="city_id" @change="getWeather">
        <option disabled value="">天気を見たい都市を指定してください</option>
        <option value="1118370">Tokyo</option>
        <option value="15015370">Osaka</option>
        <option value="1117817">Nagoya</option>
      </select>
    </div>

    <b-row cols="3" cols-sm="4" cols-md="6" cols-lg="7">
      <b-col v-for="info of infos" v-bind:key="info.date">
        <p>{{ info.date }}</p>
        <p>{{ info.max_temp | roundUp }}°C</p>
        <p>{{ info.wind }}</p>
        <p>{{ info.weather_state }}</p>
        <img v-bind:src="info.image_url" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      city_id: null,
      infos: [],
    };
  },
  methods: {
    getWeather: function () {
      axios
        .get(
          "https://safe-forest-93176.herokuapp.com/https://www.metaweather.com/api/location/" +
            this.city_id
        )
        .then(
          function (response) {
            //infos[]に、map関数で配列をまとめて代入
            this.infos = response.data.consolidated_weather.map((weather) => {
              return {
                date: weather.applicable_date, //日付
                max_temp: weather.max_temp, //最高気温
                wind: weather.wind_direction_compass, //風向き
                weather_state: weather.weather_state_name, //天候
                image_url:
                  "https://www.metaweather.com/static/img/weather/ico/" +
                  weather.weather_state_abbr +
                  ".ico", //天気画像
              };
            });
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  filters: {
    roundUp(value) {
      return Math.ceil(value);
    },
  },
};
</script>
<style>
p {
  margin: 5px;
}
</style>