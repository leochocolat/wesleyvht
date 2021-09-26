// Vendor
import { mapGetters } from 'vuex';

// Components
import DebugMediaQueries from '@/components/DebugMediaQueries';
import DebugGrid from '@/components/DebugGrid';
import TheNavigation from '@/components/TheNavigation';
import TheFooter from '@/components/TheFooter';

export default {
    computed: {
        ...mapGetters({
            data: 'data/data',
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
        TheNavigation,
        TheFooter,
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
