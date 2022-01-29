// Vendor
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';

// Utils
import Browser from '@/utils/Browser';

export default {
    props: ['source', 'alt', 'width', 'height', 'sizes', 'low'],

    data() {
        return {
            breakpoints: [0, 375, 768, 1024, 1440],
            thumbnail: true,
            isLoaded: false,
            isOldSafari: false,
        };
    },

    computed: {
        ...mapGetters({
            isSafari: 'device/browser/isSafari',
        }),
    },

    mounted() {
        if (this.isSafari) {
            const majorVersion = Browser.browser.version.split('.')[0];
            this.isOldSafari = parseInt(majorVersion) < 14;
        }
    },

    methods: {
        /**
         * Private
         */
        loadHandler() {
            gsap.to(this.$refs.imageFull, {
                duration: 0.3,
                autoAlpha: 1,
                onComplete: () => {
                    this.isLoaded = true;
                },
            });
        },
    },
};
