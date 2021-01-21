<template>
  <div class="home">
    <div v-if="loading">Loading</div>
    <div v-else-if="doesNotExist" class="white--text text-center mt-4">
      Room does not exist.
    </div>
    <div v-else>
      <v-img
        v-if="$store.state.stipulation"
        :src="require(`../assets/stipulations/${$store.state.stipulation}.png`)"
        width="100%"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomId: null,
      stipulation: null,
      doesNotExist: false,
      loading: true,
    };
  },
  created() {
    if (this.$store.state.user?.uid) {
      this.joinRoom();
    }
  },
  watch: {
    '$store.state.user': {
      handler(user) {
        if (user?.uid) {
          this.joinRoom();
        }
      },
      immediate: true,
    },
    '$route': 'joinRoom',
  },
  methods: {
    async joinRoom() {
      this.roomId = this.$route.params.room;
      if (!this.$store.state.user.uid) {
        return false;
      }
      const response = await this.$store.dispatch('joinRoom', this.roomId);
      this.doesNotExist = !response;
      this.loading = false;
    },
  },
};
</script>
