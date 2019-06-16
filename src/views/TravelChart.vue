<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Диаграмма путешествий</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <travel-chart v-if="travels.length && loaded" :chartdata="chartData" :options="chartOptions"></travel-chart>
      <v-card-text v-else>
        <v-card-text class="text-xs-center">Вы ещё не создали ни одного путешествия</v-card-text>
        <v-card-text class="text-xs-center">
          <v-btn large color="primary" :to="{ name: 'travel-make' }">Создать первое путешествие</v-btn>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import TravelChart from "@/components/TravelChart.js";

export default {
  components: { TravelChart },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Путешествия",
            backgroundColor: "#1976d2",
            borderColor: "#1976d2",
            data: [],
            fill: false
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1
              }
            }
          ]
        }
      }
    };
  },
  async created() {
    this.loaded = false;
    try {
      await this.$store.dispatch("fetchTravels");
      let travels = this.travels;
      let o = {};

      for (let i = 0; i < travels.length; i++) {
        let el = travels[i];
        let key = el.date.substring(0, 4);
        if (o[key] === undefined) o[key] = 0;
        o[key] += 1;
      }

      this.chartData.labels = Object.keys(o);
      this.chartData.datasets[0].data = this.chartData.labels.map((k, i) => {
        return o[k];
      });

      const k = 1.5;
      let max = Math.max.apply(null, this.chartData.datasets[0].data) * k;

      this.chartOptions.scales.yAxes[0].ticks.max = max;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  computed: mapState(["travels"])
};
</script>