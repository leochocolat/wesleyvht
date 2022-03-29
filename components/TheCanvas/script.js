// Vendor
import { Pane } from 'tweakpane';
import { gsap } from 'gsap';

// Utils
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import ScrollManager from '@/utils/ScrollManager';
import math from '@/utils/math';

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
        /**
         * Public
         */
        showGradient() {
            this.timelineHideGradient?.kill();
            this.timelineShowGradient = new gsap.timeline();
            this.timelineShowGradient.to(this.settings.mouseGradient, { duration: 1, radius: 0.25, ease: 'power3.out' }, 0);
            this.timelineShowGradient.to(this.settings.mouseGradient, { duration: 1, opacity: 0.5, ease: 'sine.inOut' }, 0);
        },

        hideGradient() {
            this.timelineShowGradient?.kill();
            this.timelineHideGradient = new gsap.timeline();
            this.timelineHideGradient.to(this.settings.mouseGradient, { duration: 0.5, radius: 0, ease: 'sine.inOut' }, 0);
            this.timelineHideGradient.to(this.settings.mouseGradient, { duration: 0.5, opacity: 0, ease: 'sine.inOut' }, 0);
        },

        /**
         * Private
         */
        setup() {
            this.contactCard = document.querySelector('.js-card-contact');

            this.mousePosition = { x: 0, y: 0 };

            this.settings = {
                dpr: 2,
                contactCard: {
                    backgroundColor: { r: 235, g: 235, b: 235 },
                },
                mouseGradient: {
                    radius: 0,
                    color: { r: 212, g: 212, b: 212 },
                    opacity: 0,
                    hardness: 0,
                    position: { x: 0, y: 0 },
                    lerp: 0.15,
                    clearAlpha: 0.2,
                },
                whiteNoise: {
                    opacity: 0.2,
                    max: 50,
                },
            };

            this.width = WindowResizeObserver.width;
            this.height = WindowResizeObserver.height;

            this.$el.width = this.width * this.settings.dpr;
            this.$el.height = this.height * this.settings.dpr;

            this.canvas = this.$el;
            this.canvas2 = this.canvas.cloneNode();
            this.canvas3 = this.canvas.cloneNode();
            this.ctx = this.canvas.getContext('2d');
            this.ctx2 = this.canvas2.getContext('2d');
            this.ctx3 = this.canvas3.getContext('2d');

            this.setupEventListeners();
            this.getBounds();
            // this.createWhiteNoiseTexture();

            this.setupDebugger();
        },

        getBounds() {
            this.contactCardBounds = this.contactCard.getBoundingClientRect();
            this.contactCardBounds.y += ScrollManager.position;
        },

        createWhiteNoiseTexture() {
            this.imageData = this.ctx.createImageData(this.width * this.settings.dpr, this.height * this.settings.dpr);

            for (let i = 0; i < this.imageData.data.length; i += 4) {
                const color = Math.random() * this.settings.whiteNoise.max;
                const opacity = this.settings.whiteNoise.opacity * 255;
                this.imageData.data[i] = color;
                this.imageData.data[i + 1] = color;
                this.imageData.data[i + 2] = color;
                this.imageData.data[i + 3] = opacity;
            }
        },

        update() {
            this.updateMouseGradientPosition();
        },

        updateMouseGradientPosition() {
            this.settings.mouseGradient.position.x = math.lerp(this.settings.mouseGradient.position.x, this.mousePosition.x, this.settings.mouseGradient.lerp);
            this.settings.mouseGradient.position.y = math.lerp(this.settings.mouseGradient.position.y, this.mousePosition.y, this.settings.mouseGradient.lerp);
        },

        // Global
        draw() {
            this.ctx.save();
            this.ctx.scale(this.settings.dpr, this.settings.dpr);

            this.ctx.clearRect(0, 0, this.width, this.height);

            this.drawContactCard(this.ctx);

            this.ctx.globalCompositeOperation = 'source-atop';

            this.ctx.drawImage(this.canvas2, 0, 0, this.width, this.height);

            this.ctx.restore();
        },

        // Mouse
        draw2() {
            this.ctx2.save();
            this.ctx2.scale(this.settings.dpr, this.settings.dpr);

            this.ctx2.fillStyle = `rgba(${this.settings.contactCard.backgroundColor.r}, ${this.settings.contactCard.backgroundColor.g}, ${this.settings.contactCard.backgroundColor.b}, ${this.settings.mouseGradient.clearAlpha})`;
            this.ctx2.fillRect(0, 0, this.width, this.height);

            this.drawMouseGradient(this.ctx2);

            this.ctx2.restore();
        },

        // White Noise
        draw3() {
            // this.ctx3.save();
            // this.ctx3.scale(this.settings.dpr, this.settings.dpr);

            // this.ctx3.clearRect(0, 0, this.width, this.height);

            // this.ctx3.putImageData(this.imageData, 0, 0);

            // this.ctx3.restore();
        },

        drawContactCard(ctx) {
            const alpha = 1;
            ctx.fillStyle = `rgba(${this.settings.contactCard.backgroundColor.r}, ${this.settings.contactCard.backgroundColor.g}, ${this.settings.contactCard.backgroundColor.b}, ${alpha})`;
            this.fillRoundedRect(ctx, this.contactCardBounds.x, this.contactCardBounds.y - ScrollManager.position, this.contactCardBounds.width, this.contactCardBounds.height, 12);
            ctx.fill();
        },

        drawMouseGradient(ctx) {
            const { x, y } = this.settings.mouseGradient.position;
            const { color, opacity, hardness } = this.settings.mouseGradient;
            const radius = this.settings.mouseGradient.radius * this.contactCardBounds.width;

            ctx.save();

            ctx.globalAlpha = opacity;

            ctx.beginPath();

            // ctx.filter = `blur(${hardness * radius * 0.5}px)`;
            const gradientColors = [
                { color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, progress: 0 },
                { color: `rgba(${color.r}, ${color.g}, ${color.b}, 0)`, progress: 1 },
            ];

            const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);

            for (let i = 0; i < gradientColors.length; i++) {
                const gradientColor = gradientColors[i];
                gradient.addColorStop(gradientColor.progress, gradientColor.color);
            }

            ctx.fillStyle = gradient;

            ctx.fillStyle = color;
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.closePath();

            ctx.restore();
        },

        fillRoundedRect(ctx, x, y, width, height, radius) {
            if (width < 2 * radius) radius = width / 2;
            if (height < 2 * radius) radius = height / 2;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
        },

        setupEventListeners() {
            window.addEventListener('mousemove', this.mousemoveHandler);
            WindowResizeObserver.addEventListener('resize', this.resizeHandler);
            gsap.ticker.add(this.tickHandler);
        },

        removeEventListeners() {
            window.removeEventListener('mousemove', this.mousemoveHandler);
            WindowResizeObserver.removeEventListener('resize', this.resizeHandler);
            gsap.ticker.remove(this.tickHandler);
        },

        mousemoveHandler(e) {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        },

        resizeHandler() {
            this.width = WindowResizeObserver.width;
            this.height = WindowResizeObserver.height;

            this.canvas.width = this.width * this.settings.dpr;
            this.canvas.height = this.height * this.settings.dpr;

            this.canvas2.width = this.canvas.width;
            this.canvas2.height = this.canvas.height;

            this.canvas3.width = this.canvas.width;
            this.canvas3.height = this.canvas.height;

            this.getBounds();
        },

        tickHandler() {
            this.update();
            this.draw();
            this.draw2();
            // this.draw3();
        },

        /**
         * Debug
         */
        setupDebugger() {
            this.debugger = new Pane({ title: 'Canvas Contact Card' });

            const mouseGradient = this.debugger.addFolder({ title: 'Mouse gradient' });
            mouseGradient.addInput(this.settings.mouseGradient, 'radius', { min: 0, max: 1 });
            mouseGradient.addInput(this.settings.mouseGradient, 'opacity', { min: 0, max: 1 });
            mouseGradient.addInput(this.settings.mouseGradient, 'color');
            mouseGradient.addInput(this.settings.mouseGradient, 'hardness', { min: 0, max: 1 });
            mouseGradient.addInput(this.settings.mouseGradient, 'lerp', { min: 0, max: 1 });
            mouseGradient.addInput(this.settings.mouseGradient, 'clearAlpha', { min: 0, max: 1 });
            const whiteNoise = this.debugger.addFolder({ title: 'White Noise' });
            whiteNoise.addInput(this.settings.whiteNoise, 'opacity', { min: 0, max: 1 });

            this.debugger.element.style.zIndex = 10000;
            this.debugger.element.style.position = 'fixed';
        },
    },
};
