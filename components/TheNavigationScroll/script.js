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
            isHovering: false,
            hoveredElementIndex: null,
            activeSectionId: null,
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

        isHovering(isHovering) {
            if (isHovering) this.enter();
            else this.leave();
        },
    },

    created() {
        this.$root.navigationScroll = this;
    },

    mounted() {
        this.buttons = [...this.$refs.buttonNavigation, ...this.$refs.buttonSocial];

        this.setupEventListeners();

        // this.show();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * Private
         */
        show() {
            gsap.killTweensOf(this.$refs.main);

            const timeline = new gsap.timeline();
            // timeline.set(this.$refs.main, { visibility: 'visible' });
            timeline.to(this.$refs.main, { duration: 0.4, y: '0%', ease: 'sine.out' });
        },

        hide() {
            gsap.killTweensOf(this.$refs.main);

            const timeline = new gsap.timeline();
            timeline.to(this.$refs.main, { duration: 0.3, y: '-150%', ease: 'sine.inOut' });
            // timeline.set(this.$refs.main, { visibility: 'hidden' });
        },

        setActiveSection(sectionId) {
            this.activeSectionId = sectionId;
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
         * Events
         */
        setupEventListeners() {
            ScrollManager.addEventListener('scroll', this.scrollHandler);

            for (let i = 0; i < this.buttons.length; i++) {
                const button = this.buttons[i];
                button.addEventListener('mouseenter', this.mouseenterButtonHandler);
                button.addEventListener('mouseleave', this.mouseleaveButtonHandler);
            }
        },

        removeEventListeners() {
            ScrollManager.removeEventListener('scroll', this.scrollHandler);

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
