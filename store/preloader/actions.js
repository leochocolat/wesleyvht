const actions = {
    setLoadingCompleted({ commit }) {
        commit('SET_LOADING_COMPLETED');
    },

    setCompleted({ commit }) {
        commit('SET_COMPLETED');
    },
};

export default actions;
