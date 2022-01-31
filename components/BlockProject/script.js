// Vendor
import { gsap } from 'gsap';

// Mixins
import utils from '@/mixins/utils';

// Utils
import math from '@/utils/math';

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
            this.$refs.list.style.display = 'block';
            this.$root.updateScroll();

            if (this.$refs.buttonWrapper) {
                for (let i = 0; i < this.$refs.buttonWrapper.length; i++) {
                    this.$refs.buttonWrapper[i].show();
                }
            }

            // const timeline = new gsap.timeline();
            // return timeline;
        },

        hide() {
            this.$refs.list.style.display = 'none';
            this.$root.updateScroll();
            // const timeline = new gsap.timeline();
            // return timeline;
        },

        getBounds() {
            this.listBounds = this.$refs.list.getBoundingClientRect();
        },

        initStyle() {
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
