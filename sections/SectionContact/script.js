// Mixons
import utils from '@/mixins/utils';

// Components
import CardAvailability from '@/components/CardAvailability';
import CardContact from '@/components/CardContact';
import CardSocials from '@/components/CardSocials';

export default {
    props: ['data'],

    mixins: [utils],

    components: {
        CardAvailability,
        CardContact,
        CardSocials,
    },
};
