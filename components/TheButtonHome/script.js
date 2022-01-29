// Utils
import ScrollManager from '@/utils/ScrollManager';

// Mixins
import utils from '@/mixins/utils';

export default {
    mixins: [utils],

    methods: {
        clickHandler() {
            ScrollManager.scrollTo(0);
        },
    },
};
