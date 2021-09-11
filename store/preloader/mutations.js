const mutations = {
    SET_LOADING_COMPLETED(state) {
        state.isLoadingCompleted = true;
    },

    SET_COMPLETED(state) {
        state.isCompleted = true;
    },
};

export default mutations;
