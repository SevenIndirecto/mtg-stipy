<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
    <button @click="startAuth">Auth</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";

export default {
  data() {
    return {
      // firebaseUi: new firebaseui.auth.AuthUI(firebase.auth()),
      uiConfig: {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log(authResult, redirectUrl);
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInSuccessUrl: "http://localhost",
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: "http://localhost",
        // Privacy policy url.
        privacyPolicyUrl: "http://localhost"
      },
    };
  },
  methods: {
    startAuth() {
      this.firebaseUi.start("#firebaseui-auth-container", this.uiConfig);
    }
  }
};
</script>
