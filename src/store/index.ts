import Vue from 'vue';
import Vuex from 'vuex';
import { auth, storeUser, joinRoom, User, createRoom } from "@/helpers/firebase";
import { generateUID } from '@/helpers/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
    },
    roomId: null,
    stipulation: null,
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROOM_ID: (state, id) => state.roomId = id,
    SET_STIPULATION: (state, id) => state.stipulation = id,
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setStipulation({ commit }, id) {
      commit('SET_STIPULATION', id);
    },
    logIn({ commit }, user: User) {
      storeUser(user);
      commit('SET_USER', user);
    },
    async createRoom({ state, commit }) {
      const { roomId, stipulation } = await createRoom(state.user);
      commit('SET_ROOM_ID', roomId);
      commit('SET_STIPULATION', stipulation);
    },
    async joinRoom({ state, commit }, roomId) {
      const stipulation = await joinRoom(state.user, roomId);
      commit('SET_ROOM_ID', roomId);
      commit('SET_STIPULATION', stipulation);
      return stipulation;
    },
    async logOut({ commit }) {
      await auth.signOut();
      commit('SET_USER', { uid: null });
    },
    init({ dispatch }, user) {
      dispatch('setUser', user);
    }
  },
  getters: {
    isAnon: state => {
      return !state.user.uid;
    },
  },
  modules: {}
});
