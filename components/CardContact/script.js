// Vendor
import { mapGetters } from 'vuex';
import { gsap } from 'gsap';

// Mixons
import utils from '@/mixins/utils';

// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';

export default {
    mixins: [utils],

    props: ['data'],

    data() {
        return {
            isCopied: false,
            isHovered: false,
            label: '',
        };
    },

    computed: {
        ...mapGetters({
            globalData: 'data/data',
        }),

        state() {
            let state = this.data.email;

            if (this.isCopied) {
                state = 'Email copied';
            } else if (this.isHovered) {
                state = 'Copy email';
            }

            return state;
        },
    },

    watch: {
        state(state) {
            const timeline = new gsap.timeline();
            timeline.to(this.$refs.email, { duration: 0.2, alpha: 0, ease: 'sine.inOut' });
            timeline.set(this, { label: state });
            timeline.to(this.$refs.email, { duration: 0.2, alpha: 1, ease: 'sine.inOut' });
        },
    },

    created() {
        this.label = this.state;
    },

    methods: {
        copyToClipBoard() {
            navigator.clipboard.writeText(this.data.email);
        },

        reset() {
            this.isCopied = false;
        },

        mouseenterHandler() {
            this.isHovered = true;
            this.$refs.arrow.isHover = true;
        },

        mouseleaveHandler() {
            this.isHovered = false;
            this.$refs.arrow.isHover = false;
        },

        clickHandler() {
            this.isCopied = true;
            this.copyToClipBoard();
            this.resetTimeout = setTimeout(this.reset, 1500);
        },
    },

    components: {
        ButtonArrowWrapper,
    },
};
