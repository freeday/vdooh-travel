<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Диаграмма путешествий</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <travel-chart v-if="loaded" :chartdata="chartData" :options="chartOptions"></travel-chart>
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
            data: []
          }
        ]
      },
      chartOptions: { responsive: true, maintainAspectRatio: false }
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
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  computed: mapState(["travels"])
};
</script>