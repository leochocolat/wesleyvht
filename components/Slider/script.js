// Vendor
import { gsap } from 'gsap';
// import { Pane } from 'tweakpane';

// Utils
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import math from '@/utils/math';
import easings from '@/utils/easings';

// Components
import MediaGallery from '@/components/MediaGallery';
import CursorSlider from '@/components/CursorSlider';
import ScrollManager from '@/utils/ScrollManager';
import device from '@/utils/device';

// Mixins
import scrollTrigger from '@/mixins/scrollTrigger';

export default {
    props: ['index', 'medias'],

    mixins: [scrollTrigger],

    mounted() {
        if (device.isTouch()) return;

        this.cursorPosition = { x: 0, y: 0 };

        this.cursorBackgroundPosition = {
            current: { x: 0, y: 0 },
            target: { x: 0, y: 0 },
        };

        this.cursorTextPosition = {
            current: { x: 0, y: 0 },
            target: { x: 0, y: 0 },
        };

        this.cursorBackgroundVelocity = { x: 0, y: 0 };
        this.cursorTextVelocity = { x: 0, y: 0 };

        this.mousePosition = {
            x: 0,
            y: 0,
        };

        this.settings = {
            attractionArea: 0.6,
            attractionStrength: 0.1,
            snapArea: 0.5,
            snapAreaMax: 1,
            snapAreaMin: 0.5,
            background: {
                lerp: 0.02,
                bounce: 0.81,
                attractionStrength: 1,
            },
            text: {
                lerp: 0.02,
                bounce: 0.804,
                attractionStrength: 0.95,
            },
        };

        this.getBounds();
        this.setupEventListeners();

        this.setupDebugger();
    },

    beforeDestroy() {
        if (device.isTouch()) return;

        this.removeEventListeners();
    },

    methods: {
        getBounds() {
            this.bounds = this.$el.getBoundingClientRect();
            this.cursorBounds = this.$refs.cursor.$el.getBoundingClientRect();
            this.viewportWidth = WindowResizeObserver.width;
            this.viewportHeight = WindowResizeObserver.height;

            this.bounds.y += ScrollManager.position;
            this.cursorBounds.y += ScrollManager.position;
        },

        checkDistance() {
            const offsetCursor = {
                x: this.mousePosition.x - this.bounds.x + (this.bounds.x - this.cursorBounds.x) - this.cursorBounds.width / 2,
                y: this.mousePosition.y - this.bounds.y + (this.bounds.y - this.cursorBounds.y) - this.cursorBounds.height / 2 + ScrollManager.position,
            };

            this.cursorPosition.x = offsetCursor.x;
            this.cursorPosition.y = offsetCursor.y;

            const distance = Math.sqrt(offsetCursor.x * offsetCursor.x + offsetCursor.y * offsetCursor.y);
            const hyp = Math.sqrt((this.bounds.width * this.bounds.width) + (this.bounds.height * this.bounds.height));

            if (Math.abs(offsetCursor.x) > this.bounds.width / 2 * this.settings.snapArea || Math.abs(offsetCursor.y) > this.bounds.height / 2 * this.settings.snapArea) {
                this.settings.snapArea = this.settings.snapAreaMin;

                const attraction = easings.easeInCirc(math.clamp(1 - distance / hyp * this.settings.attractionArea, 0, 1));
                const angle = math.angle(offsetCursor, { x: 0, y: 0 });
                const attractionStrength = this.bounds.width * this.settings.attractionStrength;

                this.cursorBackgroundPosition.target.x = attraction * attractionStrength * this.settings.background.attractionStrength * Math.cos(angle);
                this.cursorBackgroundPosition.target.y = attraction * attractionStrength * this.settings.background.attractionStrength * Math.sin(angle);

                this.cursorTextPosition.target.x = attraction * attractionStrength * this.settings.text.attractionStrength * Math.cos(angle);
                this.cursorTextPosition.target.y = attraction * attractionStrength * this.settings.text.attractionStrength * Math.sin(angle);
            } else {
                this.cursorBackgroundPosition.target.x = this.cursorPosition.x;
                this.cursorBackgroundPosition.target.y = this.cursorPosition.y;

                this.cursorTextPosition.target.x = this.cursorPosition.x;
                this.cursorTextPosition.target.y = this.cursorPosition.y;

                this.settings.snapArea = this.settings.snapAreaMax;
            }
        },

        updateCursorPosition() {
            const previousCursorBackgroundPosition = { x: this.cursorBackgroundPosition.current.x, y: this.cursorBackgroundPosition.current.y };

            this.cursorBackgroundPosition.current.x = math.lerp(this.cursorBackgroundPosition.current.x + (this.cursorBackgroundVelocity.x * this.settings.background.bounce), this.cursorBackgroundPosition.target.x, this.settings.background.lerp);
            this.cursorBackgroundPosition.current.y = math.lerp(this.cursorBackgroundPosition.current.y + (this.cursorBackgroundVelocity.y * this.settings.background.bounce), this.cursorBackgroundPosition.target.y, this.settings.background.lerp);

            this.cursorBackgroundVelocity.x = this.cursorBackgroundPosition.current.x - previousCursorBackgroundPosition.x;
            this.cursorBackgroundVelocity.y = this.cursorBackgroundPosition.current.y - previousCursorBackgroundPosition.y;

            const previousCursorTextPosition = { x: this.cursorTextPosition.current.x, y: this.cursorTextPosition.current.y };

            this.cursorTextPosition.current.x = math.lerp(this.cursorTextPosition.current.x + (this.cursorTextVelocity.x * this.settings.text.bounce), this.cursorTextPosition.target.x, this.settings.text.lerp);
            this.cursorTextPosition.current.y = math.lerp(this.cursorTextPosition.current.y + (this.cursorTextVelocity.y * this.settings.text.bounce), this.cursorTextPosition.target.y, this.settings.text.lerp);

            this.cursorTextVelocity.x = this.cursorTextPosition.current.x - previousCursorTextPosition.x;
            this.cursorTextVelocity.y = this.cursorTextPosition.current.y - previousCursorTextPosition.y;

            // Apply transform
            this.$refs.cursor.$refs.background.style.transform = `translate(${this.cursorBackgroundPosition.current.x}px, ${this.cursorBackgroundPosition.current.y}px)`;
            this.$refs.cursor.$refs.text.style.transform = `translate(${this.cursorTextPosition.current.x}px, ${this.cursorTextPosition.current.y}px)`;
        },

        setupEventListeners() {
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
            window.addEventListener('mousemove', this.mousemoveHandler);
            gsap.ticker.add(this.tickHandler);
        },

        removeEventListeners() {
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
            window.removeEventListener('mousemove', this.mousemoveHandler);
            gsap.ticker.remove(this.tickHandler);
        },

        resizeHandler() {
            this.getBounds();
        },

        mousemoveHandler(e) {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        },

        tickHandler() {
            if (!this.isInView) return;

            this.checkDistance();
            this.updateCursorPosition();
        },

        /**
         * Debug
         */
        setupDebugger() {
            // this.debugger = new Pane({ title: 'Cursor' });

            // this.debugger.addInput(this.settings, 'attractionStrength', { min: 0, max: 0.5 });

            // const bg = this.debugger.addFolder({ title: 'Background' });
            // bg.addInput(this.settings.background, 'lerp', { min: 0, max: 0.2 });
            // bg.addInput(this.settings.background, 'bounce', { min: 0, max: 1 });

            // const text = this.debugger.addFolder({ title: 'Text' });
            // text.addInput(this.settings.text, 'lerp', { min: 0, max: 0.2 });
            // text.addInput(this.settings.text, 'bounce', { min: 0, max: 1 });

            // this.debugger.element.style.zIndex = 10000;
            // this.debugger.element.style.position = 'fixed';
        },
    },

    components: {
        MediaGallery,
        CursorSlider,
    },
};
