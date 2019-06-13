<template>
  <v-list one-line>
    <v-subheader>Все путешествия</v-subheader>
    <v-divider></v-divider>
    <TravelItem/>
  </v-list>
</template>

<script>
import TravelItem from "@/components/TravelItem.vue";
import axios from "axios";
export default {
  components: {
    TravelItem
  },
  created() {
    axios
      .get("http://localhost:3000/travels")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped></style>
