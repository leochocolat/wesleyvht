// Vendor
import { gsap } from 'gsap';

// Mixins
import utils from '@/mixins/utils';
import scrollTrigger from '@/mixins/scrollTrigger';

// Utils
import ScrollManager from '@/utils/ScrollManager';

// Components
import Logo from '@/assets/icons/logo.svg?inline';
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import easings from '@/utils/easings';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    mounted() {
        this.getBounds();
        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
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

        /**
         * Private
         */
        getBounds() {
            this.stickyContainerBounds = JSON.parse(JSON.stringify(this.$refs.stickyContainer.getBoundingClientRect()));
            this.stickyContainerBounds.y += ScrollManager.position;
            this.stickyContainerBounds.top += ScrollManager.position;
            this.stickyContainerBounds.bottom += ScrollManager.position;

            this.bounds = JSON.parse(JSON.stringify(this.$el.getBoundingClientRect()));
            this.bounds.y += ScrollManager.position;
            this.bounds.top += ScrollManager.position;
            this.bounds.bottom += ScrollManager.position;

            this.height = WindowResizeObserver.height;
        },

        updateStickyPosition() {
            const target = this.height - (this.bounds.bottom - this.stickyContainerBounds.bottom) - this.stickyContainerBounds.height;
            const current = this.stickyContainerBounds.top - ScrollManager.position;
            const offset = Math.min(target - current, 0);

            const relativeOffset = offset / (this.bounds.height - this.height);
            const ease = easings.easeInCirc(1 - Math.abs(relativeOffset));
            const resistance = 0;

            const translateY = Math.min(offset - resistance, 0);

            this.$refs.stickyContent.style.transform = `translateY(${translateY}px)`;
        },

        setupEventListeners() {
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
            ScrollManager.addEventListener('scroll', this.scrollHandler);
            gsap.ticker.add(this.tickHandler);
        },

        removeEventListeners() {
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
            ScrollManager.removeEventListener('scroll', this.scrollHandler);
            gsap.ticker.remove(this.tickHandler);
        },

        resizeHandler() {
            this.getBounds();
        },

        scrollHandler(e) {

        },

        tickHandler() {
            if (!this.isInView) return;

            this.updateStickyPosition();
        },
    },

    components: {
        Logo,
    },
};
