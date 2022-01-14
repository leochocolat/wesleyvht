const actions = {
    enable({ commit }) {
        commit('SET_ENABLED');
    },

    disable({ commit }) {
        commit('SET_DISABLED');
    },
};

export default actions;
