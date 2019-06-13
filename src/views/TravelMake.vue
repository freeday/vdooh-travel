<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="Дата путешествия"></v-text-field>
          <!-- <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker> -->
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Страна путешествия"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Город путешествия"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
