// Vendor
import { mapGetters } from 'vuex';

// Components
import DebugMediaQueries from '@/components/DebugMediaQueries';
import DebugGrid from '@/components/DebugGrid';

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
        DebugMediaQueries,
        DebugGrid,
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
