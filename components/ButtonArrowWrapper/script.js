// Vendor
import { gsap } from 'gsap';

// Utils
import device from '@/utils/device';

// Components
import Arrow from '@/assets/icons/arrow.svg?inline';

const TRANSLATE = 7;
const DURATION_HOVER = 0.4;

export default {
    data() {
        return {
            state: '',
        };
    },

    mounted() {
        this.allowHover = true;
    },

    methods: {
        /**
         * Public
         */
        show() {
            this.timelineShow = new gsap.timeline();
            this.timelineShow.fromTo(this.$refs.background, { scale: 0 }, { duration: 0.5, scale: 1, ease: 'back.out(1.5)' }, 0);
            this.timelineShow.fromTo(this.$refs.arrow, { x: -TRANSLATE, y: TRANSLATE }, { duration: 0.6, x: 0, y: 0, ease: 'back.out(4)' }, 0.1);
            this.timelineShow.fromTo(this.$refs.arrow, { alpha: 0 }, { duration: 0.5, alpha: 1, ease: 'power2.inOut' }, 0.1);
            return this.timelineShow;
        },

        hide() {
            this.timelineHide = new gsap.timeline();
            // this.timelineHide.fromTo(this.$refs.arrow, { x: -TRANSLATE, y: TRANSLATE }, { duration: 0.6, x: 0, y: 0, ease: 'power3.in' }, 0.1);
            // this.timelineHide.fromTo(this.$refs.arrow, { alpha: 1 }, { duration: 0.5, alpha: 0, ease: 'power2.inOut' }, 0.1);
            // this.timelineHide.fromTo(this.$refs.background, { scale: 0 }, { duration: 0.5, scale: 1, ease: 'power3.in' }, 0);
            return this.timelineHide;
        },

        /**
         * Private
         */
        hoverIn() {
            if (this.hoverOutTimeline) this.hoverOutTimeline.kill();

            this.hoverInTimeline = new gsap.timeline();
            this.hoverInTimeline.fromTo(this.$refs.arrow, { x: 0, y: 0, alpha: 1 }, { duration: DURATION_HOVER, x: TRANSLATE, y: -TRANSLATE, alpha: 0, ease: 'power2.in' });
            this.hoverInTimeline.fromTo(this.$refs.arrow, { x: -TRANSLATE, y: TRANSLATE, alpha: 0 }, { duration: DURATION_HOVER, x: 0, y: 0, alpha: 1, ease: 'power3.out' });

            this.hoverInTimeline.call(this.setCurrentState, null, 0);
            this.hoverInTimeline.call(this.hoverInCompleteHandler, null);
        },

        hoverOut() {
            if (this.hoverInTimeline) this.hoverInTimeline.kill();

            this.hoverOutTimeline = new gsap.timeline();

            this.hoverOutTimeline.call(this.resetCurrentState, null, 0);
            this.hoverOutTimeline.call(this.hoverOutCompleteHandler, null);
        },

        setCurrentState() {
            this.state = 'hover';
        },

        resetCurrentState() {
            this.state = '';
        },

        /**
         * Handlers
         */
        mouseenterHandler() {
            if (device.isTouch()) return;

            this.mouseOver = true;

            if (!this.allowHover) return;
            this.allowHover = false;
            this.hoverIn();
        },

        mouseleaveHandler() {
            if (device.isTouch()) return;

            this.mouseOver = false;

            if (!this.allowHover) return;
            this.allowHover = false;
            this.hoverOut();
        },

        hoverInCompleteHandler() {
            this.allowHover = true;

            if (!this.mouseOver) {
                this.allowHover = false;
                this.hoverOut();
            }
        },

        hoverOutCompleteHandler() {
            this.allowHover = true;

            if (this.mouseOver) {
                this.allowHover = false;
                this.hoverIn();
            }
        },
    },

    components: {
        Arrow,
    },
};
