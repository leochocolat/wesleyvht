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
            gsap.killTweensOf(this.$refs.email);
            const timeline = new gsap.timeline();
            timeline.to(this.$refs.email, { duration: 0.1, alpha: 0, ease: 'sine.inOut' });
            timeline.set(this, { label: state });
            timeline.to(this.$refs.email, { duration: 0.1, alpha: 1, ease: 'sine.inOut' });
        },
    },

    created() {
        this.label = this.state;
    },

    mounted() {
        // this.$root.canvas.contactCard = this.$el;
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
            this.$root.canvas.showGradient();
        },

        mouseleaveHandler() {
            this.isHovered = false;
            this.$refs.arrow.isHover = false;
            this.$root.canvas.hideGradient();
        },

        clickHandler(e) {
            this.$root.canvas.createParticle({ x: e.clientX, y: e.clientY });

            if (this.isCopied) return;

            this.isCopied = true;
            this.copyToClipBoard();
            this.resetTimeout = setTimeout(this.reset, 1500);
        },
    },

    components: {
        ButtonArrowWrapper,
    },
};
