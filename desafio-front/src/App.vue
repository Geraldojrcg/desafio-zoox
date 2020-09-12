<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Desafio Zoox</h1>
      </div>
      <v-spacer></v-spacer>
      <p>by Geraldo Júnior</p>
    </v-app-bar>
    <v-main>
      <notifications position="top right" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
