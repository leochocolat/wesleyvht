// Vendor
import { mapGetters } from 'vuex';
import { gsap } from 'gsap';

// Mixins
import page from '@/mixins/page';

// Sections
import SectionIntro from '@/sections/SectionIntro';
import SectionProjects from '@/sections/SectionProjects';
import SectionProfile from '@/sections/SectionProfile';
import SectionRecognitions from '@/sections/SectionRecognitions';
import SectionPartners from '@/sections/SectionPartners';
import SectionContact from '@/sections/SectionContact';

export default {
    mixins: [page],

    computed: {
        ...mapGetters({
            data: 'data/data',
        }),
    },

    methods: {
        /**
         * Public
         */
        transitionIn() {
            const timeline = new gsap.timeline();
            timeline.set(this.$el, { alpha: 1 }, 0);
            timeline.add(this.$refs.intro.transitionIn(), 0);
            timeline.call(() => { this.$store.dispatch('scroll/unlock'); }, null, 2.5);
            return timeline;
        },
    },

    components: {
        SectionIntro,
        SectionProjects,
        SectionProfile,
        SectionRecognitions,
        SectionPartners,
        SectionContact,
    },
};
