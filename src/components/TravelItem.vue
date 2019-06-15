<template>
  <div>
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
    <v-divider v-if="travel.divider"></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    travel: Object
  }
};
</script>

<style lang="scss" scoped></style>
