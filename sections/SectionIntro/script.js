// Vendor
import { gsap } from 'gsap';

// Mixins
import utils from '@/mixins/utils';
import scrollTrigger from '@/mixins/scrollTrigger';

// Utils
import Sticky from '@/utils/Sticky';

// Components
import Logo from '@/assets/icons/logo.svg?inline';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    mounted() {
        // this.sticky = new Sticky({
        //     el: this.$refs.colText,
        //     trigger: this.$el,
        //     start: '200%',
        //     end: '250%',
        //     markers: true,
        // });
    },

    methods: {
        /**
         * Public
         */
        transitionIn() {
            const timeline = new gsap.timeline();
            return timeline;
        },

        scrollThrough(progress) {
            if (progress > 1) {
                this.$store.dispatch('navbar/enable');
            } else {
                this.$store.dispatch('navbar/disable');
            }
        },
    },

    components: {
        Logo,
    },
};
