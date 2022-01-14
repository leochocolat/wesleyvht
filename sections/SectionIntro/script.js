// Mixins
import utils from '@/mixins/utils';
import scrollTrigger from '@/mixins/scrollTrigger';

// Components
import Logo from '@/assets/icons/logo.svg?inline';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    components: {
        Logo,
    },

    methods: {
        scrollThrough(progress) {
            if (progress > 1) {
                this.$store.dispatch('navbar/enable');
            } else {
                this.$store.dispatch('navbar/disable');
            }
        },
    },
};
