const actions = {
    lock({ commit }) {
        commit('SET_LOCK');
    },

    unlock({ commit }) {
        commit('SET_UNLOCK');
    },

    setLockPosition({ commit }, position) {
        commit('SET_LOCK_POSITION', position);
    },

    setPosition({ commit }, position) {
        commit('SET_POSITION', position);
    },
};

export default actions;
