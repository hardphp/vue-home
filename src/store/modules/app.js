
const app = {
  state: {
    device: 'mobile'
  },
  mutations: {
    SET_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    setDevice({ commit }, device) {
      commit('SET_DEVICE', device)
    }
  }
}

export default app
