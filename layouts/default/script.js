// Vendor
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({

        }),
    },

    mounted() {

    },

    destroyed() {

    },

    methods: {

    },

    components: {

    },
};

/**
 * Clears console on reload
 */
if (module.hot) {
    module.hot.accept();
    module.hot.addStatusHandler((status) => {
        if (status === 'prepare') console.clear();
    });
}
