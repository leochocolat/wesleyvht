// Mixins
import utils from '@/mixins/utils';
import scrollTrigger from '@/mixins/scrollTrigger';

// Components
import BlockProject from '@/components/BlockProject';

export default {
    props: ['data'],

    mixins: [utils, scrollTrigger],

    data() {
        return {
            sectionId: 'work',
            isActive: false,
            activeInterval: [0.5, 0.95],
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
            if (screenProgress > this.activeInterval[0] && progress < this.activeInterval[1]) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        },
    },

    components: {
        BlockProject,
    },
};
