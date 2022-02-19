// Vendor
import gsap from 'gsap';
import { Pane } from 'tweakpane';

// Utils
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import math from '@/utils/math';

// Components
import MediaGallery from '@/components/MediaGallery';
import CursorSlider from '@/components/CursorSlider';
import ScrollManager from '@/utils/ScrollManager';

export default {
    props: ['index', 'medias'],

    mounted() {
        this.cursorPosition = { x: 0, y: 0 };

        this.cursorBackgroundPosition = { x: 0, y: 0 };
        this.cursorTextPosition = { x: 0, y: 0 };

        this.cursorBackgroundVelocity = { x: 0, y: 0 };
        this.cursorTextVelocity = { x: 0, y: 0 };

        this.mousePosition = {
            x: 0,
            y: 0,
        };

        this.settings = {
            background: {
                lerp: 0.02,
                bounce: 0.81,
            },
            text: {
                lerp: 0.02,
                bounce: 0.804,
            },
        };

        this.getBounds();
        this.setupEventListeners();

        this.setupDebugger();
    },

    beforeDestroy() {
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

        updateCursorPosition() {
            console.log(this.settings.background.lerp);

            const offsetCursor = {
                x: this.bounds.x - this.cursorBounds.x,
                y: this.bounds.y - this.cursorBounds.y,
            };

            this.cursorPosition.x = this.mousePosition.x - this.bounds.x + offsetCursor.x - this.cursorBounds.width / 2;
            this.cursorPosition.y = this.mousePosition.y - this.bounds.y + offsetCursor.y - this.cursorBounds.height / 2 + ScrollManager.position;

            const previousCursorBackgroundPosition = { x: this.cursorBackgroundPosition.x, y: this.cursorBackgroundPosition.y };

            this.cursorBackgroundPosition.x = math.lerp(this.cursorBackgroundPosition.x + (this.cursorBackgroundVelocity.x * this.settings.background.bounce), this.cursorPosition.x, this.settings.background.lerp);
            this.cursorBackgroundPosition.y = math.lerp(this.cursorBackgroundPosition.y + (this.cursorBackgroundVelocity.y * this.settings.background.bounce), this.cursorPosition.y, this.settings.background.lerp);

            this.cursorBackgroundVelocity.x = this.cursorBackgroundPosition.x - previousCursorBackgroundPosition.x;
            this.cursorBackgroundVelocity.y = this.cursorBackgroundPosition.y - previousCursorBackgroundPosition.y;

            const previousCursorTextPosition = { x: this.cursorTextPosition.x, y: this.cursorTextPosition.y };

            this.cursorTextPosition.x = math.lerp(this.cursorTextPosition.x + (this.cursorTextVelocity.x * this.settings.text.bounce), this.cursorPosition.x, this.settings.text.lerp);
            this.cursorTextPosition.y = math.lerp(this.cursorTextPosition.y + (this.cursorTextVelocity.y * this.settings.text.bounce), this.cursorPosition.y, this.settings.text.lerp);

            this.cursorTextVelocity.x = this.cursorTextPosition.x - previousCursorTextPosition.x;
            this.cursorTextVelocity.y = this.cursorTextPosition.y - previousCursorTextPosition.y;

            this.$refs.cursor.$refs.background.style.transform = `translate(${this.cursorBackgroundPosition.x}px, ${this.cursorBackgroundPosition.y}px)`;
            this.$refs.cursor.$refs.text.style.transform = `translate(${this.cursorTextPosition.x}px, ${this.cursorTextPosition.y}px)`;
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
            this.updateCursorPosition();
        },

        /**
         * Debug
         */
        setupDebugger() {
            // this.debugger = new Pane({ title: 'Cursor' });

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
