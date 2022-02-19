// Vendor
import { gsap } from 'gsap';

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
            isHovering: false,
            isTransitioning: true,
            hoveredElementIndex: false,
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

        isHovering(isHovering) {
            if (this.isTransitioning) return;

            if (isHovering) this.enter();
            else this.leave();
        },

        isTransitioning(isTransitioning) {
            if (isTransitioning) return;

            if (this.isHovering) this.enter();
            else this.leave();
        },
    },

    created() {
        this.$root.theNavigation = this;
    },

    mounted() {
        this.buttons = [...this.$refs.buttonNavigation, ...this.$refs.buttonSocial];

        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * Public
         */
        show() {
            const navItems = [this.$refs.colButtonHome, ...this.$refs.buttonNavigation, ...this.$refs.buttonSocial, this.$refs.buttonToggle];

            this.timelineShow = new gsap.timeline();
            this.timelineShow.to(navItems, { duration: 1, autoAlpha: 1, stagger: 0.09 });
            this.timelineShow.set(this, { isTransitioning: false }, 1);
            return this.timelineShow;
        },

        enter() {
            this.timelineShow?.kill();

            this.timelineEnter = new gsap.timeline();

            for (let i = 0; i < this.buttons.length; i++) {
                if (i === this.hoveredElementIndex) continue;
                const button = this.buttons[i];
                this.timelineEnter.to(button, { duration: 0.2, alpha: 0.45, ease: 'sine.inOut' }, 0);
            }
        },

        leave() {
            this.timelineShow?.kill();

            this.timelineLeave = new gsap.timeline();

            for (let i = 0; i < this.buttons.length; i++) {
                const button = this.buttons[i];
                this.timelineLeave.to(button, { duration: 0.2, alpha: 1, ease: 'sine.inOut' }, 0);
            }
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
        setupEventListeners() {
            for (let i = 0; i < this.buttons.length; i++) {
                const button = this.buttons[i];
                button.addEventListener('mouseenter', this.mouseenterButtonHandler);
                button.addEventListener('mouseleave', this.mouseleaveButtonHandler);
            }
        },

        removeEventListeners() {
            for (let i = 0; i < this.buttons.length; i++) {
                const button = this.buttons[i];
                button.removeEventListener('mouseenter', this.mouseenterButtonHandler);
                button.removeEventListener('mouseleave', this.mouseleaveButtonHandler);
            }
        },

        mouseenterButtonHandler(e) {
            const element = e.currentTarget;
            this.hoveredElementIndex = this.buttons.indexOf(element);
            this.isHovering = true;
        },

        mouseleaveButtonHandler() {
            this.hoveredElementIndex = null;
            this.isHovering = false;
        },

        clickHandler() {
            if (this.isTransitioning) return;
            this.isNavigationOpen = !this.isNavigationOpen;
        },
    },

    components: {
        TheButtonHome,
        IconToggleNavigation,
        ButtonNavigation,
    },
};
