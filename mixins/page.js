// Vendor
import { mapGetters } from 'vuex';

// Utils
import getPage from '@/utils/getPage';

export default {
    type: 'page',

    computed: {
        ...mapGetters({
            isCompleted: 'preloader/isCompleted',
        }),
    },

    watch: {
        /**
         * Trigger first page reveal when the preloader
         * transition out animation is done
         */
        isCompleted(isCompleted) {
            if (isCompleted) this.__transitionIn();
        },
    },

    methods: {
        __transitionIn() {
            const routeInfos = {
                previous: this.$store.state.router.previous,
                current: this.$store.state.router.current,
            };

            if (this.transitionIn) this.transitionIn(null, routeInfos);
        },
    },

    transition: {
        appear: true,
        mode: 'out-in',
        css: false,

        beforeEnter(el) {
            const page = getPage(el.__vue__);

            if (page && page.transitionInit) page.transitionInit();
        },

        enter(el, done) {
            const routeInfos = {
                previous: this.$store.state.router.previous,
                current: this.$store.state.router.current,
            };

            // On first navigation, let preloader state trigger transitions (see line 17)
            // if (!routeInfos.previous) {
            //     done();
            //     return;
            // }

            const page = getPage(el.__vue__);

            if (page && page.transitionIn) page.transitionIn(done, routeInfos);
            else done();
        },

        leave(el, done) {
            const routeInfos = {
                previous: this.$store.state.router.previous,
                current: this.$store.state.router.current,
            };

            const page = getPage(el.__vue__);

            if (page && page.transitionOut) page.transitionOut(done, routeInfos);
            else done();
        },
    },

    // head() {
    //     if (!this.data) return;
    //     return {
    //         title: this.data.seo_meta_title,
    //         meta: [
    //             { hid: 'description', name: 'description', property: 'description', content: this.data.seo_meta_description },
    //             { hid: 'og:title', name: 'og:title', property: 'og:title', content: this.data.seo_meta_title },
    //             { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.data.seo_meta_description },
    //             { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website' },
    //             // { hid: 'og:url', name: 'og:url', property: 'og:url', content: process.env.BASE_URL_FRONTEND + this.$route.path },
    //             { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.data.seo_og_image ? this.data.seo_og_image.url : '' },
    //             { hid: 'og:image:width', name: 'og:image:width', property: 'og:image:width', content: this.data.seo_og_image && this.data.seo_og_image.dimensions ? this.data.seo_og_image.dimensions.width : '' },
    //             { hid: 'og:image:height', name: 'og:image:height', property: 'og:image:height', content: this.data.seo_og_image && this.data.seo_og_image.dimensions ? this.data.seo_og_image.dimensions.height : '' },
    //         ],
    //     };
    // },
};
