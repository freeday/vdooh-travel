<template>
  <v-list-tile :key="travel.id" avatar ripple>
    <v-list-tile-content>
      <v-list-tile-title
        >{{ travel.city }}, {{ travel.country }}</v-list-tile-title
      >
    </v-list-tile-content>
    <v-list-tile-action>
      <v-list-tile-action-text>{{ travel.date }}</v-list-tile-action-text>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  data() {
    return {
      travel: {
        id: 1,
        city: "Moscow",
        country: "Russia",
        date: "15.08.2015"
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
