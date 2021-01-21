import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { auth } from '@/helpers/firebase';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

let app: Vue | null;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }

  if (user) {
    store.dispatch('logIn',
      {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      },
    );
  } else {
    router.push({ name: 'login' });
  }
});
