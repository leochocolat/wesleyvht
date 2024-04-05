// Mixins
import scrollTrigger from '@/mixins/scrollTrigger';
import utils from '@/mixins/utils';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    data() {
        return {
            sectionId: 'profile',
            isActive: false,
            activeInterval: [0.5, 2.5],
        };
    },

    watch: {
        isActive(isActive) {
            if (isActive) {
                this.$root.navigationScroll?.setActiveSection(this.sectionId);
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
};
