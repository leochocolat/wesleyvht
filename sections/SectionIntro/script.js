// Mixins
import utils from '@/mixins/utils';

// Components
import Logo from '@/assets/icons/logo.svg?inline';

export default {
    props: ['data'],

    mixins: [utils],

    components: {
        Logo,
    },
};
