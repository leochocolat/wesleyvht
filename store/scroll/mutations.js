const mutations = {
    SET_LOCK(state) {
        state.isLocked = true;
    },

    SET_UNLOCK(state) {
        state.isLocked = false;
    },

    SET_LOCK_POSITION(state, position) {
        state.lockPosition = position;
    },

    SET_POSITION(state, position) {
        state.position = position;
    },
};

export default mutations;
