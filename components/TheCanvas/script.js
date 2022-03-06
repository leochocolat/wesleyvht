// Vendor
import ScrollManager from '@/utils/ScrollManager';
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import { gsap } from 'gsap';

export default {
    created() {
        this.$root.canvas = this;
    },

    mounted() {
        this.$nextTick(() => {
            this.setup();
        });
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        setup() {
            this.contactCard = document.querySelector('.js-card-contact');

            this.settings = {
                dpr: 2,
                contactCard: {
                    backgroundColor: '#EBEBEB',
                },
            };

            this.width = WindowResizeObserver.width;
            this.height = WindowResizeObserver.height;

            this.$el.width = this.width * this.settings.dpr;
            this.$el.height = this.height * this.settings.dpr;

            this.ctx = this.$el.getContext('2d');

            this.setupEventListeners();
            this.getBounds();
        },

        getBounds() {
            this.contactCardBounds = this.contactCard.getBoundingClientRect();
            this.contactCardBounds.y += ScrollManager.position;
        },

        draw() {
            this.ctx.save();
            this.ctx.scale(this.settings.dpr, this.settings.dpr);

            this.ctx.clearRect(0, 0, this.width, this.height);

            this.drawContactCard();

            this.ctx.restore();
        },

        drawContactCard() {
            this.ctx.fillStyle = this.settings.contactCard.backgroundColor;
            this.fillRoundedRect(this.contactCardBounds.x, this.contactCardBounds.y - ScrollManager.position, this.contactCardBounds.width, this.contactCardBounds.height, 12);
            this.ctx.fill();
        },

        fillRoundedRect(x, y, width, height, radius) {
            if (width < 2 * radius) radius = width / 2;
            if (height < 2 * radius) radius = height / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x + radius, y);
            this.ctx.arcTo(x + width, y, x + width, y + height, radius);
            this.ctx.arcTo(x + width, y + height, x, y + height, radius);
            this.ctx.arcTo(x, y + height, x, y, radius);
            this.ctx.arcTo(x, y, x + width, y, radius);
            this.ctx.closePath();
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
            this.width = WindowResizeObserver.width;
            this.height = WindowResizeObserver.height;

            this.$el.width = this.width * this.settings.dpr;
            this.$el.height = this.height * this.settings.dpr;

            this.getBounds();
        },

        tickHandler() {
            this.draw();
        },
    },
};
