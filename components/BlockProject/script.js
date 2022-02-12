// Vendor
import { gsap } from 'gsap';

// Mixins
import utils from '@/mixins/utils';

// Utils
import math from '@/utils/math';
import Breakpoints from '@/utils/Breakpoints';

// Components
import MediaGallery from '@/components/MediaGallery';
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';
import ButtonToggle from '@/components/ButtonToggle';
import WindowResizeObserver from '@/utils/WindowResizeObserver';

export default {
    props: ['data'],

    mixins: [utils],

    data() {
        return {
            isOpen: false,
            currentIndex: 0,
        };
    },

    computed: {
        // Merge credits and live website url
        listItems() {
            const items = [];
            const titles = [];

            const credits = this.data.credits;

            for (let i = 0; i < credits.length; i++) {
                const credit = credits[i].fields;
                const title = credit.role;
                const item = { label: credit.name, url: credit.website };

                if (titles.includes(title)) {
                    const index = titles.indexOf(title);
                    items[index].items.push(item);
                }

                if (!titles.includes(title)) {
                    titles.push(title);
                    items.push({ title, items: [item] });
                }
            }

            const liveProject = {
                title: 'Live Website',
                items: [
                    {
                        label: this.data.shortUrl || this.data.url,
                        url: this.data.url,
                    },
                ],
            };

            items.push(liveProject);

            return items;
        },
    },

    watch: {
        isOpen(isOpen) {
            if (isOpen) {
                this.show();
            } else {
                this.hide();
            }
        },
    },

    mounted() {
        this.allowClick = true;

        this.getBounds();
        this.initStyle();
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
            const small = Breakpoints.current !== 'large' && Breakpoints.current !== 'extra-large';

            this.timelineShow = new gsap.timeline();
            this.timelineShow.set(this, { allowClick: false }, 0);

            if (small) this.timelineShow.add(this.showSmall(), 0);
            else this.timelineShow.add(this.showLarge(), 0);

            this.timelineShow.set(this, { allowClick: true });

            return this.timelineShow;
        },

        showSmall() {
            const timeline = new gsap.timeline();

            timeline.set(this.$refs.list, { display: 'block' }, 0);

            for (let i = 0; i < this.$refs.listItem.length; i++) {
                const listItem = this.$refs.listItem[i];
                const listItemTitle = this.$refs.listItemTitle[i];
                const sublist = this.$refs.sublist[i];
                const arrow = listItem.querySelector('.button-arrow-wrapper');
                const delay = 0.1;

                timeline.to(listItem, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, i * delay);
                timeline.to(sublist, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, i * delay);
                timeline.to(listItemTitle, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, i * delay);
                if (arrow) timeline.add(arrow.__vue__.show(), i * delay);
            }

            timeline.call(this.$root.updateScroll, null, 0);

            return timeline;
        },

        showLarge() {
            const timeline = new gsap.timeline();

            timeline.to(this.$refs.introduction, { duration: 0.8, y: 0, ease: 'power4.inOut' }, 0);

            for (let i = 0; i < this.$refs.listItem.length; i++) {
                const listItem = this.$refs.listItem[i];
                const listItemTitle = this.$refs.listItemTitle[i];
                const sublist = this.$refs.sublist[i];
                const arrow = listItem.querySelector('.button-arrow-wrapper');
                const stagger = 0.1;
                const delay = 0.5;

                const itemTimeline = new gsap.timeline();
                itemTimeline.to(listItem, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, i * stagger);
                itemTimeline.to(sublist, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, i * stagger);
                itemTimeline.to(listItemTitle, { duration: 0.5, alpha: 1, ease: 'sine.inOut' }, i * stagger);
                if (arrow) itemTimeline.add(arrow.__vue__.show(), i * stagger);

                timeline.add(itemTimeline, delay);
            }

            return timeline;
        },

        hide() {
            const small = Breakpoints.current !== 'large' && Breakpoints.current !== 'extra-large';

            this.timelineHide = new gsap.timeline();

            this.timelineHide.set(this, { allowClick: false }, 0);

            if (small) this.timelineHide.add(this.hideSmall(), 0);
            else this.timelineHide.add(this.hideLarge(), 0);

            this.timelineHide.set(this, { allowClick: true });

            return this.timelineHide;
        },

        hideSmall() {
            const timeline = new gsap.timeline();

            timeline.set(this.$refs.list, { display: 'none' }, 0);
            timeline.set(this.$refs.listItemTitle, { alpha: 0 }, 0);
            timeline.set(this.$refs.listItem, { alpha: 0 }, 0);
            timeline.call(this.$root.updateScroll, null, 0);

            return timeline;
        },

        hideLarge() {
            const timeline = new gsap.timeline();

            timeline.set(this.$refs.listItemTitle, { alpha: 0 }, 0);
            timeline.set(this.$refs.listItem, { alpha: 0 }, 0);
            timeline.call(this.$root.updateScroll, null, 0);
            timeline.set(this.$refs.introduction, { y: this.listBounds.height }, 0);

            return timeline;
        },

        getBounds() {
            this.listBounds = this.$refs.list.getBoundingClientRect();
        },

        initStyle() {
            if (Breakpoints.current !== 'large' && Breakpoints.current !== 'extra-large') {
                this.initStyleSmall();
            } else {
                this.initStyleLarge();
            }
        },

        initStyleLarge() {
            if (!this.isOpen) gsap.set(this.$refs.introduction, { y: this.listBounds.height });
        },

        initStyleSmall() {
            if (!this.isOpen) this.$refs.list.style.display = 'none';
        },

        resetStyle() {
            this.$refs.list.style.display = 'block';
        },

        setupEventListeners() {
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
        },

        removeEventListeners() {
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
        },

        resizeHandler() {
            this.resetStyle();
            this.getBounds();
            this.initStyle();
        },

        toggleClickHandler() {
            if (!this.allowClick) return;
            this.isOpen = !this.isOpen;
        },

        clickNextHandler() {
            this.currentIndex = math.modulo(this.currentIndex + 1, this.data.medias.length);
        },

        clickPreviousHandler() {
            this.currentIndex = math.modulo(this.currentIndex - 1, this.data.medias.length);
        },
    },

    components: {
        MediaGallery,
        ButtonArrowWrapper,
        ButtonToggle,
    },
};
