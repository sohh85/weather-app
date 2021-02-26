<template>
  <div class="text-center">
    <div class="py-5 form-group">
      <h1 class="mb-4">天気情報</h1>
      <label for="select">天気を見たい地域を選んでください</label>
      <select
        id="select"
        class="form-control"
        v-model="woeid"
        @change="getWeather"
      >
        <option value="1118108">札幌</option>
        <option value="1118129">仙台</option>
        <option value="1118370">東京</option>
        <option value="15015370">大阪</option>
        <option value="1117817">名古屋</option>
        <option value="1117099">福岡</option>
      </select>
    </div>

    <b-card-group cols="3" cols-sm="4" cols-md="6" cols-lg="7">
      <b-card v-for="info of infos" v-bind:key="info.date">
        <b-card-title>{{ info.date | moment }}</b-card-title>
        <b-card-text>
          <ul>
            <li class="small text-muted">{{ info.weather_state }}</li>
            <li><img v-bind:src="info.image_url" /></li>
            <li class="small text-muted mt-3">気温</li>
            <li>最高 {{ info.max_temp | roundUp }}°C</li>
            <li>最低 {{ info.min_temp | roundUp }}°C</li>
            <li class="small text-muted mt-2">湿度</li>
            <li>{{ info.humidity }}％</li>
            <li class="small text-muted mt-2">風速</li>
            <li>{{ info.wind_speed | roundUp }}mph</li>
          </ul>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      woeid: null,
      infos: {},
    };
  },
  methods: {
    getWeather: function () {
      // 2020/02/18/ の形式で日付を1週間分つくり、ymdに格納
      var ymd = [0, 1, 2, 3, 4, 5, 6].map((value) => {
        var dt = new Date();
        dt.setDate(dt.getDate() + value);
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        return "/" + y + "/" + m + "/" + d + "/";
      });

      var getDataUrl = ymd.map((num) => {
        return (
          // "https://safe-forest-93176.herokuapp.com/https://www.metaweather.com/api/location/" +
          "/api/location/" + this.woeid + num
        );
      });

      getDataUrl.forEach((value, key) => {
        axios
          .get(value)
          .then(
            function (response) {
              var weather = response.data[0];

              this.$set(this.infos, key, {
                date: weather.applicable_date, //日付
                max_temp: weather.max_temp, //最高気温
                min_temp: weather.min_temp, //最低気温
                wind_speed: weather.wind_speed, //風速
                weather_state: weather.weather_state_name, //天候
                humidity: weather.humidity, //湿度
                image_url:
                  "https://www.metaweather.com/static/img/weather/ico/" +
                  weather.weather_state_abbr +
                  ".ico", //天気アイコン
              });
            }.bind(this)
          )
          .catch(function (error) {
            console.log(error);
          });
      });
    },
  },
  filters: {
    roundUp(value) {
      return Math.ceil(value);
    },
    moment: function (date) {
      return moment(date).format("M月DD日");
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
.form-control {
  width: 300px !important;
  margin: 0 auto;
}
</style>