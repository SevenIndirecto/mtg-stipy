<template>
  <div class='home'>
    <div v-if="loading">Loading</div>
    <div v-else-if="doesNotExist">
      Room does not exist.
    </div>
    <div v-else>
      <img
        v-if='$store.state.stipulation'
        :src='require(`../assets/stipulations/${$store.state.stipulation}.png`)'
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
// import { joinRoom } from '@/helpers/firebase';

@Component({
  data() {
    return {
      roomId: this.$route.params.room,
      stipulation: null,
      doesNotExist: false,
      loading: true,
    };
  },
  watch: {
    '$store.state.user': {
      handler(user) {
        if (user?.uid) {
          this.joinRoom();
        }
      },
      immediate: true,
    }
  },
  methods: {
    async joinRoom() {
      const response = await this.$store.dispatch('joinRoom', this.roomId);
      if (!response) {
        this.doesNotExist = true;
      }
      this.loading = false;
    }
  },
})
export default class Home extends Vue {}
</script>
