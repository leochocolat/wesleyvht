export default {
    mounted() {
        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * Public
         */
        show() {
            this.$el.style.opacity = 1;
        },

        hide() {
            this.$el.style.opacity = 0;
        },

        /**
         * Private
         */
        setupEventListeners() {
            window.addEventListener('keydown', this.keydownHandler);
            window.addEventListener('keyup', this.keyupHandler);
        },

        removeEventListeners() {
            window.removeEventListener('keydown', this.keydownHandler);
            window.removeEventListener('keyup', this.keyupHandler);
        },

        keydownHandler(e) {
            if (e.key === 'Control') {
                this.show();
            }
        },

        keyupHandler(e) {
            this.hide();
        },
    },
};
