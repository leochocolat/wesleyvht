// Mixons
import scrollTrigger from '@/mixins/scrollTrigger';
import utils from '@/mixins/utils';

// Components
import CardAvailability from '@/components/CardAvailability';
import CardContact from '@/components/CardContact';
import CardSocials from '@/components/CardSocials';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    data() {
        return {
            sectionId: 'contact',
            isActive: false,
            activeInterval: [0, 2],
        };
    },

    watch: {
        isActive(isActive) {
            if (isActive) {
                this.$root.navigationScroll.setActiveSection(this.sectionId);
            }
        },
    },

    methods: {
        scrollThrough(progress, screenProgress) {
            if (screenProgress > this.activeInterval[0] && screenProgress < this.activeInterval[1]) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },
    },

    components: {
        CardAvailability,
        CardContact,
        CardSocials,
    },
};
