<template>
  <v-card>
    <v-list one-line>
      <TravelItem v-for="travel in travels" :key="travel.id" :travel="travel"/>
    </v-list>
  </v-card>
</template>

<script>
import TravelItem from "@/components/TravelItem.vue";
import axios from "axios";
export default {
  components: {
    TravelItem
  },
  data() {
    return {
      travels: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/travels")
      .then(res => {
        this.travels = res.data.map((o, i) => {
          o.divider = true;
          if (i === res.data.length - 1) {
            o.divider = false;
          }
          return o;
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};
</script>

<style lang="scss" scoped></style>
