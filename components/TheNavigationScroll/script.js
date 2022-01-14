// Vendor
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';

// Mixins
import utils from '@/mixins/utils';

// Components
import TheButtonHome from '@/components/TheButtonHome';
import IconToggleNavigation from '@/assets/icons/button-toggle-navigation.svg?inline';
import ButtonNavigation from '@/components/ButtonNavigation';
import ScrollManager from '@/utils/ScrollManager';

export default {
    mixins: [utils],

    props: ['data'],

    data() {
        return {
            isNavigationOpen: false,
        };
    },

    computed: {
        ...mapGetters({
            isEnabled: 'navbar/enabled',
        }),
    },

    watch: {
        isNavigationOpen(isOpen) {
            if (isOpen) {
                this.openNavigation();
            } else {
                this.closeNavigation();
            }
        },

        isEnabled(isEnabled) {
            if (!isEnabled && this.isVisible) {
                this.isVisible = false;
                this.hide();
            }
        },
    },

    mounted() {
        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * Private
         */
        show() {
            gsap.killTweensOf(this.$el);
            gsap.to(this.$el, { duration: 0.4, y: '0%', ease: 'sine.out' });
        },

        hide() {
            gsap.killTweensOf(this.$el);
            gsap.to(this.$el, { duration: 0.3, y: '-150%', ease: 'sine.inOut' });
        },

        openNavigation() {
            this.timelineClose?.kill();
            this.timelineOpen = new gsap.timeline();
            this.timelineOpen.to(this.$refs.iconToggleNavigation, { duration: 0.5, rotate: '45deg', ease: 'power3.inOut' }, 0);
            this.timelineOpen.to(this.$refs.colButtonHome, { duration: 0.5, autoAlpha: 0, ease: 'power3.inOut' }, 0);
            this.timelineOpen.to(this.$refs.colButtons, { duration: 0.5, autoAlpha: 1, ease: 'power3.inOut' }, 0.3);
        },

        closeNavigation() {
            this.timelineOpen?.kill();
            this.timelineClose = new gsap.timeline();
            this.timelineClose.to(this.$refs.iconToggleNavigation, { duration: 0.5, rotate: '0deg', ease: 'power3.inOut' }, 0);
            this.timelineClose.to(this.$refs.colButtons, { duration: 0.5, autoAlpha: 0, ease: 'power3.inOut' }, 0);
            this.timelineClose.to(this.$refs.colButtonHome, { duration: 0.5, autoAlpha: 1, ease: 'power3.inOut' }, 0.5);
        },

        /**
         * Events
         */
        setupEventListeners() {
            ScrollManager.addEventListener('scroll', this.scrollHandler);
        },

        removeEventListeners() {
            ScrollManager.removeEventListener('scroll', this.scrollHandler);
        },

        scrollHandler(e) {
            if (e.delta > 0) {
                if (!this.isEnabled) return;
                if (this.isVisible) return;
                this.isVisible = true;
                this.show();
            } else {
                if (!this.isEnabled) return;
                if (!this.isVisible) return;
                this.isVisible = false;
                this.hide();
            }
        },

        clickHandler() {
            this.isNavigationOpen = !this.isNavigationOpen;
        },
    },

    components: {
        TheButtonHome,
        IconToggleNavigation,
        ButtonNavigation,
    },
};
