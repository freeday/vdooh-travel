<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Карта путешествий</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <gmap-map
        v-if="travels.length"
        :center="center"
        :zoom="7"
        ref="mmm"
        style="width: 100%; height: 500px"
      >
        <!-- <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          @click="center=m.position"
        ></gmap-marker>-->
      </gmap-map>
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

export default {
  data() {
    return {
      center: {
        lat: 10.0,
        lng: 10.0
      }
    };
  },
  created() {
    this.$store.dispatch("fetchTravels");
  },
  computed: mapState(["travels"])
};
</script>