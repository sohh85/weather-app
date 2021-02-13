<template>
  <b-container class="text-center">
    <div class="my-5">
      <h1 class="mb-3">天気情報</h1>
      <select v-model="woeid" @change="getWeather">
        <option disabled value="">天気を見たい都市を指定してください</option>
        <option value="1118370">Tokyo</option>
        <option value="15015370">Osaka</option>
        <option value="1117817">Nagoya</option>
      </select>
    </div>

    <b-row cols="3" cols-sm="4" cols-md="6" cols-lg="7">
      <b-col v-for="info of infos" v-bind:key="info.date">
        <p>{{ info[0].date }}</p>
        <p>{{ info[0].max_temp | roundUp }}°C</p>
        <p>{{ info[0].wind }}</p>
        <p>{{ info[0].weather_state }}</p>
        <img v-bind:src="info[0].image_url" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      woeid: null,
      infos: [],
    };
  },
  methods: {
    getWeather: function () {
      //apiで取得できる形式'2020/02/02'で日付を生成
      var ymd = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((value) => {
        var dt = new Date();
        dt.setDate(dt.getDate() + value);
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        return "/" + y + "/" + m + "/" + d + "/";
      });
      // console.log(ymd); //取得する日付

      var getDataUrl = ymd.map((num) => {
        return (
          "https://safe-forest-93176.herokuapp.com/https://www.metaweather.com/api/location/" +
          this.woeid +
          num
        );
      });
      // console.table(getDataUrl); //前後１週間を取得するための13通りのURL

      getDataUrl.forEach((value, key) => {
        axios
          .get(value)
          .then(
            function (response) {
              var weather = response.data[0];

              this.infos[key] = [
                {
                  date: weather.applicable_date, //日付
                  max_temp: weather.max_temp, //最高気温
                  wind: weather.wind_direction_compass, //風向き
                  weather_state: weather.weather_state_name, //天候
                  image_url:
                    "https://www.metaweather.com/static/img/weather/ico/" +
                    weather.weather_state_abbr +
                    ".ico", //天気画像
                },
                // console.log(response.data[0]), //infosに格納する値チェック
              ];
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error);
          });
      }); //foreach
      console.log(this.infos);
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