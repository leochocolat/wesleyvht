// Vendor
import { mapGetters } from 'vuex';

// Mixons
import utils from '@/mixins/utils';

// Components
import ArrowSingle from '@/components/ArrowSingle';

export default {
    props: ['data'],

    mixins: [utils],

    computed: {
        ...mapGetters({
            globalData: 'data/data',
        }),
    },

    mounted() {
        console.log(this.data.email);
    },

    components: {
        ArrowSingle,
    },
};
