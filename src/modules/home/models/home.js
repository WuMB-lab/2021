const state = {
  TEST_NAME: 'SinoGear'
};

const mutations = {
  CHANGE_NAME: (state, payload) => {
    state.TEST_NAME = payload;
  }
};

const actions = {
  changeName({ commit }, payload) {
    commit('CHANGE_NAME', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}