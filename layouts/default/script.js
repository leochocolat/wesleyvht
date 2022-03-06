// Vendor
import { mapGetters } from 'vuex';

// Components
import DebugMediaQueries from '@/components/DebugMediaQueries';
import DebugGrid from '@/components/DebugGrid';
import ScrollContainer from '@/components/ScrollContainer';
import TheNavigation from '@/components/TheNavigation';
import TheNavigationScroll from '@/components/TheNavigationScroll';
import TheCanvas from '@/components/TheCanvas';

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
        ScrollContainer,
        TheNavigation,
        TheNavigationScroll,
        TheCanvas,
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
