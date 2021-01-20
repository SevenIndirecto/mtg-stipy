import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { auth } from '@/helpers/firebase';

Vue.config.productionTip = false;

let app: Vue | null;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }

  if (user) {
    console.log('main.ts: User', user);
    store.dispatch('logIn',
      {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      }
    );
  }
});
