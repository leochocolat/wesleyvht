// Mixins
import utils from '@/mixins/utils';

// Components
import BlockProject from '@/components/BlockProject';

export default {
    props: ['data'],

    mixins: [utils],

    components: {
        BlockProject,
    },
};
