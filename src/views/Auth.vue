<template lang='html'>
  <div id='firebaseui-auth-container'></div>
</template>
<script>
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
// import { config } from '../helpers/firebaseConfig';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
  name: 'auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>
