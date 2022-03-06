// Vendor
import { gsap } from 'gsap';

// Mixins
import utils from '@/mixins/utils';
import scrollTrigger from '@/mixins/scrollTrigger';

// Utils
import ScrollManager from '@/utils/ScrollManager';
import Breakpoints from '@/utils/Breakpoints';
import easings from '@/utils/easings';

// Components
import Logo from '@/assets/icons/logo.svg?inline';
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import math from '@/utils/math';
import mapRange from '@/utils/math/mapRange';
import device from '@/utils/device';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    data() {
        return {
            sectionId: 'intro',
            isActive: false,
            activeInterval: [0.5, 2],
            allowMouseInteraction: false,
            activeImageIndex: 0,
            sliceSize: 7,
        };
    },

    watch: {
        isActive(isActive) {
            if (isActive) {
                this.$root.navigationScroll.setActiveSection(this.sectionId);
            }
        },
    },

    mounted() {
        this.getBounds();
        this.setupEventListeners();

        // this.transitionIn();
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

            const logoOffset = this.logoContainerBounds.x - this.mainContainerBounds.x;
            const letters = this.$refs.logo.querySelectorAll('.letter');

            // const lettersDelayMin = 0.1;
            // const lettersDelayMax = 0.5;

            // const lettersDelay = [
            //     Math.random() * (lettersDelayMax - lettersDelayMin) + lettersDelayMin,
            //     Math.random() * (lettersDelayMax - lettersDelayMin) + lettersDelayMin,
            //     Math.random() * (lettersDelayMax - lettersDelayMin) + lettersDelayMin,
            //     Math.random() * (lettersDelayMax - lettersDelayMin) + lettersDelayMin,
            // ];

            // console.log(lettersDelay);

            const lettersDelay = [
                0.1806872531971454,
                0.4218072678758741,
                0.3267852513957519,
                0.33281477872581067,
            ];

            const timelineIntro = new gsap.timeline();
            timelineIntro.to(letters, {
                duration: 0.1,
                alpha: 1,
                stagger: (index) => {
                    return -index * lettersDelay[index];
                },
            }, 0);

            const timelineReveal = new gsap.timeline();
            timelineReveal.fromTo(this.$refs.logoContainer, { x: -logoOffset }, { x: 0, duration: 1.5, ease: 'power4.inOut' }, 0);
            timelineReveal.add(this.$root.theNavigation.show(), 0.5);
            timelineReveal.fromTo(this.$refs.imageContainer, { y: 200 }, { y: 0, duration: 1.2, ease: 'power4.out' }, 0.7);
            timelineReveal.to(this.$refs.imageContainer, { alpha: 1, duration: 1.2, ease: 'sine.inOut' }, 0.7);
            timelineReveal.fromTo(this.$refs.textContainer, { y: 100 }, { y: 0, duration: 1, ease: 'power4.out' }, 1);
            timelineReveal.to(this.$refs.stickyContent, { alpha: 1, duration: 1, ease: 'sine.inOut' }, 1);

            timeline.add(timelineIntro);
            timeline.add(timelineReveal);
            timeline.set(this, { allowMouseInteraction: true });

            return timeline;
        },

        scrollThrough(progress, screenProgress) {
            if (progress > 1) {
                this.$store.dispatch('navbar/enable');
            } else {
                this.$store.dispatch('navbar/disable');
            }

            if (screenProgress > this.activeInterval[0] && screenProgress < this.activeInterval[1]) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },

        /**
         * Private
         */
        getBounds() {
            this.logoContainerBounds = this.$refs.logoContainer.getBoundingClientRect();
            this.mainContainerBounds = this.$refs.mainContainer.getBoundingClientRect();

            this.isSmall = Breakpoints.current !== 'large' && Breakpoints.current !== 'extra-large';

            if (this.isSmall) {
                this.resetStyle();
                return;
            }

            this.logoContainerBounds = this.$refs.logoContainer.getBoundingClientRect();

            this.mainContainerBounds = this.$refs.mainContainer.getBoundingClientRect();

            this.stickyContainerBounds = JSON.parse(JSON.stringify(this.$refs.stickyContainer.getBoundingClientRect()));
            this.stickyContainerBounds.y += ScrollManager.position;
            this.stickyContainerBounds.top += ScrollManager.position;
            this.stickyContainerBounds.bottom += ScrollManager.position;

            this.bounds = JSON.parse(JSON.stringify(this.$el.getBoundingClientRect()));
            this.bounds.y += ScrollManager.position;
            this.bounds.top += ScrollManager.position;
            this.bounds.bottom += ScrollManager.position;

            this.height = WindowResizeObserver.height;

            this.initialDistance = this.bounds.height - this.height;
        },

        updateStickyPosition() {
            if (this.isSmall || this.isTouch) return;

            const target = this.height - (this.bounds.bottom - this.stickyContainerBounds.bottom) - this.stickyContainerBounds.height;
            const current = this.stickyContainerBounds.top - ScrollManager.position;
            const offset = target - current;

            const relativeOffset = math.clamp(offset / (this.bounds.height - this.height), -1, 1);
            const mappedRelativeOffset = mapRange(relativeOffset, -1, 1, 0, 1);

            const translateY = Math.min(offset, 0);

            this.$refs.stickyContent.style.transform = `translateY(${translateY}px)`;
        },

        resetStyle() {
            this.$refs.stickyContent.style.transform = 'none';
        },

        setupEventListeners() {
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
            gsap.ticker.add(this.tickHandler);
        },

        removeEventListeners() {
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
            gsap.ticker.remove(this.tickHandler);
        },

        resizeHandler() {
            this.getBounds();
        },

        tickHandler() {
            if (this.isSmall || !this.isInView) return;

            this.updateStickyPosition();
        },

        mousemoveHandler(e) {
            if (!this.allowMouseInteraction || this.isTouch) return;
            const positionX = e.clientX;
            const slice = WindowResizeObserver.width / this.sliceSize;
            const index = Math.floor(positionX / slice);
            this.activeImageIndex = index % this.data.images.length;
        },
    },

    components: {
        Logo,
    },
};
