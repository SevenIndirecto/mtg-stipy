<template>
  <v-app style="background: black;">
    <v-app-bar
      app
      color="grey darken-4"
      dark
      elevation="7"
    >
      <div class="d-flex align-center">
        <template v-if="$store.state.participants.length > 0">
          <v-tooltip
            v-for="p in $store.state.participants"
            :key="p.playerId"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-img
                :alt="p.playerName"
                :src="p.playerPhoto"
                class="shrink mr-2"
                contain
                width="40"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <span>{{ p.playerName }}</span>
          </v-tooltip>
        </template>
        <v-tooltip
          v-else-if="$store.state.user.photo"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-img
              :alt="$store.state.user.name"
              :src="$store.state.user.photo"
              class="shrink mr-2"
              contain
              width="40"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <span>{{ $store.state.user.name }}</span>
        </v-tooltip>
        <v-icon v-else>mdi-mushroom-outline</v-icon>
      </div>
      <v-spacer></v-spacer>
      <div v-if="$store.state.roomId">
        {{ $store.state.roomId }}
      </div>
      <div v-else-if="$store.state.user.uid">
        Join or Create a room
      </div>
      <div v-else>
        Sign in to start
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <template v-if="$store.state.user.uid">
      <v-speed-dial
        v-model="fab"
        :absolute="true"
        :bottom="true"
        :right="true"
        :open-on-hover="false"
        style="bottom: 60px;"
        direction="top"
        transition="slide-y-transition"
      >
        <template v-slot:activator>
          <v-fab-transition>
            <v-btn
              v-show="!navHidden"
              v-model="fab"
              color="grey darken-3"
              dark
              fab
            >
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <v-btn
          fab
          dark
          small
          color="grey lighter-3"
          @click="logOut"
        >
          <v-icon small>mdi-logout</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="grey lighter-3"
          @click="share"
        >
          <v-icon small>mdi-share-variant</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="grey lighter-3"
          @click="dialog = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="grey lighter-3"
          @click="createRoom"
        >
          <v-icon large>mdi-alpha-n</v-icon>
        </v-btn>
      </v-speed-dial>
    </template>

    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card dark>
        <v-card-text>
          <v-text-field autofocus label="Room" v-model="roomId"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="white"
            @click="joinRoom"
          >
            Join Room
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <ConfirmDialog ref="confirm" />
  </v-app>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
    ConfirmDialog: () => import('./components/ConfirmDialog'),
  },
  data: () => ({
    dialog: false,
    fab: false,
    roomId: '',
    navHidden: true,
    snackbar: false,
    snackText: '',
  }),
  mounted() {
    this.navHidden = false;
  },
  watch: {
    '$store.getters.playerNames': {
      handler(newNames, oldNames) {
        if (newNames.length > oldNames.length && oldNames.length > 0) {
          // Find new player and greet
          const oldSet = new Set(oldNames);
          for (const name of newNames) {
            if (!oldSet.has(name)) {
              this.snackText = `${name} joined.`;
              this.snackbar = true;
              break;
            }
          }
        }
      },
    },
  },
  methods: {
    async logOut() {
      if (
        await this.$refs.confirm.open(
          'Confirm',
          'Are you sure you want to log out, bitch?',
        )
      ) {
        this.$store.dispatch('logOut');
        this.$router.push('login');
      }
    },
    async createRoom() {
      await this.$store.dispatch('createRoom');
      this.$router.push({ name: 'room', params: { room: this.$store.state.roomId } });
      this.snackText = `Created room ${this.$store.state.roomId}`;
      this.snackbar = true;
      this.dialog = false;
    },
    async joinRoom() {
      if (this.$store.state.roomId !== this.roomId && this.roomId) {
        this.$router.push({ name: 'room', params: { room: this.roomId } });
      }
      this.dialog = false;
      this.roomId = '';
    },
    share() {
      let url = window.location.origin;
      if (this.$store.state.roomId) {
        url += `/r/${this.$store.state.roomId}`;
      }
      if (navigator?.share) {
        navigator.share({
          title: 'MTG Stipulation',
          text: 'Join',
          url,
        });
      }
    },
  },
});
</script>
