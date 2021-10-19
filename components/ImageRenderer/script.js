// Vendor
import gsap from 'gsap';

export default {
    props: ['source', 'alt', 'width', 'height', 'sizes', 'low'],

    data() {
        return {
            breakpoints: [0, 768, 1024, 1280, 1920],
        };
    },

    methods: {
        /**
         * Private
         */
        loadHandler() {
            gsap.to(this.$refs.imageFull, { duration: 0.5, autoAlpha: 1 });
        },
    },
};
