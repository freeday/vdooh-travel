<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon x-large>layers</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="title font-weight-thin"
              >История путешествий</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.name"
          :to="{ name: item.name }"
          ripple
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 10px;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Добавить путешествие",
          name: "travel-make",
          icon: "add_box"
        },
        {
          title: "Путешествия",
          name: "travel-list",
          icon: "list"
        },
        {
          title: "Карта",
          name: "travels-map",
          icon: "map"
        },
        {
          title: "Диаграмма",
          name: "travels-chart",
          icon: "bar_chart"
        }
      ]
    };
  }
};
</script>
