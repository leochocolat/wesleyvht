// Vendor
import { mapGetters } from 'vuex';

// Mixons
import utils from '@/mixins/utils';

// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';

export default {
    props: ['data'],

    mixins: [utils],

    computed: {
        ...mapGetters({
            globalData: 'data/data',
        }),
    },

    components: {
        ButtonArrowWrapper,
    },
};
