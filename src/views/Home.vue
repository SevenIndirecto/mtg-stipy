<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card dark>
          <v-card-title>Welcome, {{ $store.state.user.name }}</v-card-title>
          <v-card-text class="text-left">
            Either Create a <b>N</b>ew Room and Share the link, or Join an existing game.
            <br><br>Use the menu on the bottom right.
          </v-card-text>
        </v-card>
        <v-img :src="require('../assets/nyan.png')"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
