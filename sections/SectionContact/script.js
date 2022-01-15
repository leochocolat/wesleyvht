// Mixons
import utils from '@/mixins/utils';

// Components
import CardAvailability from '@/components/CardAvailability';

export default {
    props: ['data'],

    mixins: [utils],

    components: {
        CardAvailability,
    },
};
