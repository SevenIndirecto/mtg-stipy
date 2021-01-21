import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import { getRoomRef, auth, storeUser, joinRoom, User, createRoom } from '@/helpers/firebase';
import firebase from 'firebase';
import Reference = firebase.database.Reference;

Vue.use(Vuex);

export interface Participant {
  playerName: string;
  playerPhoto: string;
  playerId: string;
  stipulation: number;
}

type Participants = Array<Participant>

let roomRef: Reference | null = null;

const setupRoom = (commit: Commit, roomId: string, stipulation: number | null) => {
  commit('SET_ROOM_ID', roomId);
  commit('SET_STIPULATION', stipulation);
  commit('SET_PARTICIPANTS', []);
  if (roomRef) {
    roomRef.off('value');
  }
  if (!roomId || !stipulation) {
    return false;
  }

  roomRef = getRoomRef(roomId);
  roomRef.on('value', (snapshot) => {
    commit('SET_PARTICIPANTS', Object.values(snapshot.val()));
  });
};

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
    },
    roomId: null,
    stipulation: null,
    participants: [] as Participants,
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROOM_ID: (state, id) => state.roomId = id,
    SET_STIPULATION: (state, id) => state.stipulation = id,
    SET_PARTICIPANTS: (state, participants) => state.participants = participants,
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    logIn({ commit }, user: User) {
      storeUser(user);
      commit('SET_USER', user);
    },
    async createRoom({ state, commit }) {
      const { roomId, stipulation } = await createRoom(state.user);
      setupRoom(commit, roomId, stipulation);
    },
    async joinRoom({ state, commit }, roomId) {
      const stipulation = await joinRoom(state.user, roomId);
      setupRoom(commit, roomId, stipulation);
      return stipulation;
    },
    async logOut({ commit }) {
      await auth.signOut();
      commit('SET_USER', { uid: null });
      commit('SET_ROOM_ID', null);
    },
  },
  getters: {
    isAnon: state => !state.user.uid,
    playerNames: state => state.participants.map(p => p.playerName),
  },
  modules: {},
});
