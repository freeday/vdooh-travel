<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Добавить новое путешествие</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-container>
        <v-form lazy-validation ref="form">
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
                :error-messages="errorsCountry"
                required
                @input="$v.travel.country.$touch()"
                @blur="$v.travel.country.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="travel.city"
                label="Город путешествия"
                :error-messages="errorsCity"
                required
                @input="$v.travel.city.$touch()"
                @blur="$v.travel.city.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn large color="primary" @click="validate">Добавить путешествие</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    travel: {
      country: { required },
      city: { required }
    }
  },
  data() {
    this.showPicker = false;
    return {
      errorsCountry: [],
      errorsCity: [],
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
        city: "",
        marker: {}
      };
    },
    makeTravel() {
      return this.$store
        .dispatch("makeTravel", this.travel)
        .then(() => {
          this.travel = this.makeBlankTravel();
          this.$v.$touch();
        })
        .catch(() => {
          console.log("Возникли проблемы создания путешествия");
        });
    },
    validate() {
      this.errorsCountry = [];
      this.errorsCity = [];

      if (!this.$v.travel.country.$dirty) return this.errorsCountry;
      if (!this.$v.travel.city.$dirty) return this.errorsCity;

      !this.$v.travel.country.required &&
        this.errorsCountry.push("Заполните поле страны путешествия");
      !this.$v.travel.city.required &&
        this.errorsCity.push("Заполните поле города путешествия");

      this.$gmapApiPromiseLazy().then(res => {
        let geocoder = new res.maps.Geocoder();
        let address = `${this.travel.country}, ${this.travel.city}`;
        geocoder.geocode({ address: address }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            this.travel.marker.lat = results[0].geometry.location.lat();
            this.travel.marker.lng = results[0].geometry.location.lng();

            this.makeTravel().then(() => {
              // this.$refs.form.resetValidation();
            });
          } else {
            this.errorsCountry.push("Такого города или страны не существует");
            this.errorsCity.push("Такого города или страны не существует");
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
