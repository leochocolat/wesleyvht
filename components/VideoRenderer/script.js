export default {
    props: ['source'],

    methods: {
        /**
         * Public
         */
        play() {
            this.$refs.video.play();
        },

        pause() {
            this.$refs.video.pause();
        },
    },
};
