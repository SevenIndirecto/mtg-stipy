<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div id="firebaseui-auth-container"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
  name: 'auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>
