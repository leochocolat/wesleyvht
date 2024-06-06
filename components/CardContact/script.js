// Vendor
import { mapGetters } from 'vuex';
import { gsap } from 'gsap';

// Utils
import device from '@/utils/device';
import SoundManager from '@/utils/SoundManager';

// Mixons
import utils from '@/mixins/utils';

// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';
import WindowResizeObserver from '@/utils/WindowResizeObserver';

export default {
    mixins: [utils],

    props: ['data'],

    data() {
        return {
            isCopied: false,
            isHovered: false,
            label: '',
        };
    },

    computed: {
        ...mapGetters({
            globalData: 'data/data',
        }),

        state() {
            let state = this.data.email;

            if (this.isCopied) {
                state = 'Email copied';
            } else if (this.isHovered) {
                state = 'Copy email';
            }

            return state;
        },
    },

    watch: {
        state(state) {
            gsap.killTweensOf(this.$refs.email);
            const timeline = new gsap.timeline();
            timeline.to(this.$refs.email, { duration: 0.1, alpha: 0, ease: 'sine.inOut' });
            timeline.set(this, { label: state });
            timeline.to(this.$refs.email, { duration: 0.1, alpha: 1, ease: 'sine.inOut' });
        },
    },

    created() {
        this.label = this.state;
    },

    mounted() {
        this.mousePosition = { x: 0, y: 0 };

        SoundManager.loadSound(this.data.sound.fields.file.url).then((buffer) => {
            this.sound = buffer;
        });

        this.getBounds();
        this.setupEventListeners();
        // this.$root.canvas.contactCard = this.$el;
    },

    beforeDestroy() {
        this.removeEventListeners();
        clearInterval(this.particleInterval);
    },

    methods: {
        copyToClipBoard() {
            // Only works in secured context
            if (navigator.clipboard) navigator.clipboard.writeText(this.data.email);
        },

        reset() {
            this.isCopied = false;
        },

        getBounds() {
            this.particleBounds = this.$refs.particlePlaceholder.getBoundingClientRect();
        },

        setupEventListeners() {
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
            if (!device.isTouch()) window.addEventListener('mousemove', this.mousemoveHandler);
        },

        removeEventListeners() {
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
            if (!device.isTouch()) window.removeEventListener('mousemove', this.mousemoveHandler);
        },

        mouseenterHandler(e) {
            this.isHovered = true;
            this.$refs.arrow.isHover = true;

            clearInterval(this.particleInterval);

            this.particleInterval = setInterval(() => {
                this.$root.canvas.createParticle(this.mousePosition, { size: this.particleBounds.width, opacity: 0.2 });
            }, 1000);
        },

        mouseleaveHandler() {
            this.isHovered = false;
            this.$refs.arrow.isHover = false;

            clearInterval(this.particleInterval);
        },

        mousemoveHandler(e) {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        },

        clickHandler(e) {
            clearInterval(this.particleInterval);

            this.$root.canvas.createParticles({ x: e.clientX, y: e.clientY }, { size: this.particleBounds.width, opacity: 1 });

            if (this.sound) SoundManager.playEffect(this.sound);

            if (this.isCopied) return;

            this.isCopied = true;
            this.copyToClipBoard();
            this.resetTimeout = setTimeout(this.reset, 1500);
        },

        resizeHandler() {
            this.getBounds();
        },
    },

    components: {
        ButtonArrowWrapper,
    },
};
