// Vendor
import gsap from 'gsap';

// Mixins
import utils from '@/mixins/utils';

// Components
import TheButtonHome from '@/components/TheButtonHome';
import IconToggleNavigation from '@/assets/icons/button-toggle-navigation.svg?inline';
import ButtonNavigation from '@/components/ButtonNavigation';

export default {
    mixins: [utils],

    props: ['data'],

    data() {
        return {
            isNavigationOpen: false,
        };
    },

    watch: {
        isNavigationOpen(isOpen) {
            if (isOpen) {
                this.openNavigation();
            } else {
                this.closeNavigation();
            }
        },
    },

    created() {
        this.$root.theNavigation = this;
    },

    methods: {
        /**
         * Public
         */
        show() {
            const navItems = [this.$refs.colButtonHome, ...this.$refs.buttonNavigation, ...this.$refs.buttonSocial, this.$refs.buttonToggle];

            this.timelineShow = new gsap.timeline();
            this.timelineShow.to(navItems, { duration: 1, alpha: 1, stagger: 0.09 });
            return this.timelineShow;
        },

        /**
         * Private
         */
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
