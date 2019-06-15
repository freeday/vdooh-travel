<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Мои Путешествия</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-list v-if="travels.length">
        <TravelItem v-for="travel in travels" :key="travel.id" :travel="travel"/>
      </v-list>
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
import TravelItem from "@/components/TravelItem.vue";
import { mapState } from "vuex";

export default {
  components: {
    TravelItem
  },
  created() {
    this.$store.dispatch("fetchTravels");
  },
  computed: mapState(["travels"])
};
</script>

<style lang="scss" scoped></style>
