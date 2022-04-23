// Vendor
import { Pane } from 'tweakpane';
import { gsap } from 'gsap';

// Modules
import Particle from '@/utils/Particle';

// Utils
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import ScrollManager from '@/utils/ScrollManager';

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
        createParticle(position, { size, opacity }) {
            const image = this.particleImage;
            const particle = new Particle({
                root: this,
                image,
                position,
                size,
                opacity,
            });
            this.particles.push(particle);
        },

        createParticles(position, { size, opacity }) {
            const image = this.particleImage;

            const radius = 0;

            for (let i = 0; i < this.settings.particles.amount; i++) {
                const offset = { x: 0, y: 0 };

                offset.x = Math.cos(i / this.settings.particles.amount * Math.PI * 2) * radius;
                offset.y = Math.sin(i / this.settings.particles.amount * Math.PI * 2) * radius;

                position.x += offset.x - radius / 4;
                position.y += offset.y;

                opacity *= 1 - Math.random() * this.settings.particles.opacityRandomness;

                const particle = new Particle({
                    root: this,
                    image,
                    position,
                    size,
                    opacity,
                });

                this.particles.push(particle);
            }
        },

        /**
         * Private
         */
        setup() {
            this.contactCard = document.querySelector('.js-card-contact');

            this.particles = [];

            this.settings = {
                dpr: 2,
                particles: {
                    amount: 5,
                    opacityRandomness: 0.3,
                },
            };

            this.frameCount = 0;

            this.width = WindowResizeObserver.width;
            this.height = WindowResizeObserver.height;

            this.$el.width = this.width * this.settings.dpr;
            this.$el.height = this.height * this.settings.dpr;

            this.canvas = this.$el;
            this.ctx = this.canvas.getContext('2d');

            this.particleImage = new Image();
            this.particleImage.src = './images/heart.svg';

            this.isParticlesFilteringAllowed = false;
            this.particlesFilteringInterval = 60; // Frames;

            this.setupEventListeners();
            this.getBounds();

            this.setupDebugger();
        },

        getBounds() {
            this.contactCardBounds = this.contactCard.getBoundingClientRect();
            this.contactCardBounds.y += ScrollManager.position;
        },

        filterParticles() {
            if (!this.isParticlesFilteringAllowed) return;

            this.particles = this.particles.filter((particle) => {
                return !particle.isDead;
            });

            this.isParticlesFilteringAllowed = false;
        },

        update() {
            this.updateParticles();

            if (this.frameCount % this.particlesFilteringInterval === 0) {
                this.isParticlesFilteringAllowed = true;
            }

            this.frameCount++;
        },

        updateParticles() {
            this.filterParticles();

            for (let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];
                particle.update();
            }
        },

        // Global
        draw() {
            this.ctx.save();
            this.ctx.scale(this.settings.dpr, this.settings.dpr);

            this.ctx.clearRect(0, 0, this.width, this.height);

            this.drawParticles(this.ctx);

            this.ctx.restore();
        },

        // Mouse
        drawParticles(ctx) {
            for (let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];
                if (particle.isDead) continue;
                particle.draw(ctx);
            }
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

            this.canvas.width = this.width * this.settings.dpr;
            this.canvas.height = this.height * this.settings.dpr;

            this.getBounds();
        },

        tickHandler() {
            this.update();
            this.draw();
        },

        /**
         * Debug
         */
        setupDebugger() {
            this.debugger = new Pane({ title: 'Canvas Contact Card' });

            const particles = this.debugger.addFolder({ title: 'Particles' });
            particles.addInput(this.settings.particles, 'amount', { min: 0, max: 50, step: 1 });
            particles.addInput(this.settings.particles, 'opacityRandomness', { min: 0, max: 0.5 });

            this.debugger.element.style.zIndex = 10000;
            this.debugger.element.style.position = 'fixed';
        },
    },
};
