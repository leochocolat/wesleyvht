// Utils
import ScrollManager from '@/utils/ScrollManager';
import globalOffsetTop from '@/utils/globalOffsetTop';
import WindowResizeObserver from '@/utils/WindowResizeObserver';

export default {
    data() {
        return {
            isInView: false,
        };
    },

    mounted() {
        this.__setupObserver();
        this.__getBounds();
        this.__setupEventListeners();
    },

    beforeDestroy() {
        this.observer?.disconnect();
        this.__removeEventListeners();
    },

    methods: {
        /**
         * Private
         */
        __setupObserver() {
            this.observer = new IntersectionObserver(this.__intersectionObserverHandler, {});
            this.observer.observe(this.$el);
        },

        __getBounds() {
            const dimensions = {
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
            };

            const position = {
                x: 0,
                y: globalOffsetTop(this.$el),
            };

            this.__bounds = { dimensions, position };
        },

        __intersectionObserverHandler(e) {
            const target = e[0];

            if (target.isIntersecting) {
                this.isInView = true;
            } else {
                this.isInView = false;
            }
        },

        __setupEventListeners() {
            ScrollManager.addEventListener('scroll', this.__scrollHandler);
            WindowResizeObserver.addEventListener('resize', this.__resizeHandler);
        },

        __removeEventListeners() {
            ScrollManager.removeEventListener('scroll', this.__scrollHandler);
            WindowResizeObserver.removeEventListener('resize', this.__resizeHandler);
        },

        __scrollHandler() {
            const offsetTop = (ScrollManager.position + this.__bounds.dimensions.height) - this.__bounds.position.y;
            const progress = (offsetTop / this.__bounds.dimensions.height) / 2;
            if (this.scrollThrough && typeof this.scrollThrough === 'function') this.scrollThrough(progress);
        },

        __resizeHandler() {
            this.__getBounds();
        },
    },
};
