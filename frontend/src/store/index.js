import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { toyService } from '../services/toyService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toys: null,
    toy: null,
    toyDetails: null,
    filterBy: null,
    page: null,
  },
  getters: {
    toys(state) {
      return state.toys;
    },
    toy(state) {
      return state.toy;
    },
    toyDetails(state) {
      return state.toyDetails;
    },
  },
  mutations: {
    makeToys(state, { toys }) {
      state.toys = toys;
    },
    toyEdit(state, { toy }) {
      state.toy = toy;
    },
    addToy(state, { toy }) {
      state.toys = [...state.toys, toy];
    },
    saveToys(state, { toy }) {
      const idx = state.toys.findIndex(t => {
        t._id === toy._id;
      });
      state.toys.splice(idx, 1, toy);
    },
    toyDetails(state, { toy }) {
      state.toyDetails = toy;
    },
    updateToys(state, { toys }) {
      state.toys = toys;
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex(toy => toy._id === id);
      state.toys.splice(idx, 1);
    },
  },
  actions: {
    // search({ commit }, { filter }) {
    //   toyService.query(filter, page).then(toys => commit({ type: 'updateToys', toys }));
    // },
    makeToys({ commit, state }, { filter, page }) {
      state.filterBy = filter ?? state.filterBy;
      state.page = page ?? state.page;
      toyService.query(state.filterBy, state.page).then(toys => commit({ type: 'makeToys', toys }));
    },
    toyEdit({ commit }, { id }) {
      toyService.getById(id).then(toy => commit({ type: 'toyEdit', toy }));
    },
    saveToy({ commit }, toy) {
      toyService.saveToy(toy).then(toy => {
        commit({ type: 'saveToys', toy });
      });
    },
    toyDetails({ commit }, { id }) {
      toyService.getById(id).then(toy => commit({ type: 'toyDetails', toy }));
    },
    toyAdd({ commit }, { newToy }) {
      toyService.saveToy(newToy).then(toy => {
        commit({ type: 'addToy', toy });
      });
    },
    removeToy({ commit }, { toy }) {
      const id = toy._id;
      toyService.removeToy(id).then(msg => {
        console.log(msg);
        const id = toy._id;
        commit({ type: 'removeToy', id });
      });
    },
  },
  modules: {},
});
