<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Добавить новое путешествие</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-container>
        <v-form lazy-validation ref="form" v-model="valid">
          <v-layout row wrap>
            <v-flex xs12>
              <v-menu
                v-model="showPicker"
                :close-on-content-click="false"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="travel.date" label="Дата путешествия" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="travel.date" @input="showPicker = false" locale="ru"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="travel.country"
                label="Страна путешествия"
                required
                :rules="[v => !!v || 'Напишите страну путешествия']"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="travel.city"
                label="Город путешествия"
                required
                :rules="[v => !!v || 'Напишите город путешествия']"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn large color="primary" @click="validate" :disabled="!valid">Добавить путешествие</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    this.showPicker = false;
    return {
      valid: true,
      travel: this.makeBlankTravel()
    };
  },
  methods: {
    makeBlankTravel() {
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        date: new Date().toISOString().substr(0, 10),
        country: "",
        city: ""
      };
    },
    makeTravel() {
      return this.$store
        .dispatch("makeTravel", this.travel)
        .then(() => {
          this.travel = this.makeBlankTravel();
        })
        .catch(() => {
          console.log("Возникли проблемы создания путешествия");
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log(
          "Здесь нужна вторая проверка на геолокацию - существования страны и такого города"
        );
        this.$gmapApiPromiseLazy().then(res => {
          let geocoder = new res.maps.Geocoder();
          let address = `${this.travel.country}, ${this.travel.city}`;
          geocoder.geocode({ address: address }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();

              console.log(latitude);
              this.makeTravel().then(() => {
                this.$refs.form.resetValidation();
              });
            }
          });
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style lang="scss" scoped></style>
