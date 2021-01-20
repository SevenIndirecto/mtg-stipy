<template>
  <div class='home'>
    <img
      :src='require(`../assets/stipulations/${$store.state.stipulation}.png`)'
      v-if='$store.state.stipulation'
    />
    <div>
      <h1>Login succeeded</h1>
      <button @click='logOut'>Log out</button>
      <button @click='createRoom'>Create Room</button>
      <input type='text' v-model='roomId'>
      <button @click='joinRoom'>Join Room</button>
      <hr />
      <img :src='$store.state.user.photo' style='height: 120px;' /> <br />
      <p>{{ $store.state.user.name }}</p>
      <p>{{ $store.state.user.email }}</p>
      <p>{{ $store.state.user.uid }}</p>
      <hr />
      <pre>{{ $store.state.user }}</pre>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      roomId: '',
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push('auth');
    },
    async createRoom() {
      await this.$store.dispatch('createRoom');
      console.log('Created room, Show room?', this.$store.state.roomId);
    },
    async joinRoom() {
      if (this.roomId) {
        this.$router.push(`/r/${this.roomId}`);
      }
    }
  },
})
export default class Home extends Vue {}
</script>
