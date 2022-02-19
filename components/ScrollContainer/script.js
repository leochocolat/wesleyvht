// Vendor
import { mapGetters } from 'vuex';

// Utils
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import ScrollManager from '@/utils/ScrollManager';

export default {
    data() {
        return {
            smooth: false,
        };
    },

    computed: {
        ...mapGetters({
            isLocked: 'scroll/isLocked',
            lockPosition: 'scroll/lockPosition',
            isTouch: 'device/isTouch',
            device: 'device/device',
        }),
    },

    watch: {
        isLocked(newValue) {
            if (newValue) this.lock();
            else this.unlock();
        },
    },

    mounted() {
        this.setup();

        if (!this.isLocked) {
            ScrollManager.enable();
        }
    },

    beforeDestroy() {
        this.removeEventListeners();
        this.$root.updateScroll = null;
        ScrollManager.disable();
        ScrollManager.position = 0;
    },

    methods: {
        /**
         * Public
         */
        update() {
            this.resize();
        },

        getPosition() {
            return ScrollManager.position;
        },

        /**
         * Private
         */
        setup() {
            this.smooth = !this.isTouch;

            this.$store.dispatch('scroll/setLockPosition', 0);
            ScrollManager.setPosition(window.scrollY);

            if (this.smooth) {
                this.setupSmoothScroll();
            } else {
                ScrollManager.disableSmooth();
            }

            this.setupEventListeners();

            // Debug
            window.lock = this.lock;
            window.unlock = this.unlock;

            // Make Update scroll method accessible from every components
            this.$root.updateScroll = this.update;

            if (this.isLocked) {
                ScrollManager.position = 0;
                this.lock();
            } else this.unlock();
        },

        lock() {
            this.$el.style.height = `${WindowResizeObserver.viewportHeight}px`;
            this.$el.style.overflow = 'hidden';

            ScrollManager.disable();

            const position = ScrollManager.position;
            this.$store.dispatch('scroll/setLockPosition', position);
            this.transformY(this.$refs.content, -position);
        },

        unlock() {
            this.$el.style.overflow = 'visible';

            if (this.smooth) {
                this.setupSmoothScroll();
            } else {
                this.$el.style.height = 'auto';
                this.transformY(this.$refs.content, null);
            }

            ScrollManager.update();
            ScrollManager.setPosition(this.lockPosition);
            ScrollManager.enable();
        },

        resize() {
            if (this.smooth) {
                this.setupSmoothScroll();
            }
        },

        setupSmoothScroll() {
            if (this.isLocked) return;
            if (!this.$refs.content) return;

            this.contentHeight = this.$refs.content.offsetHeight;

            this.$el.style.height = `${this.contentHeight}px`;

            const position = ScrollManager.position;

            this.transformY(this.$refs.content, -position, false);

            ScrollManager.update();
            ScrollManager.enable();
        },

        setupEventListeners() {
            ScrollManager.addEventListener('scroll', this.smoothScrollHandler);
            ScrollManager.addEventListener('scroll:end', this.smoothScrollEndHandler);
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
        },

        removeEventListeners() {
            ScrollManager.removeEventListener('scroll', this.smoothScrollHandler);
            ScrollManager.removeEventListener('scroll:end', this.smoothScrollEndHandler);
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
        },

        smoothScrollHandler(e) {
            if (!this.smooth) return;
            const position = -e.position;
            this.transformY(this.$refs.content, position, true);
        },

        smoothScrollEndHandler(e) {
            if (!this.smooth) return;
            const position = -e.position;
            this.transformY(this.$refs.content, position, false);
        },

        resizeHandler() {
            this.$nextTick(this.resize);
        },

        // Utils
        transformY(el, y, is3d) {
            if (y === null) el.style.transform = 'none';
            const transform = is3d ? `translate3d(0px, ${y}px, 0px)` : `translate(0px, ${y}px)`;
            el.style.transform = transform;
        },
    },
};
