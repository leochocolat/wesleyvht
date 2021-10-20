// Mixons
import utils from '@/mixins/utils';

// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';

export default {
    props: ['data'],

    mixins: [utils],

    mounted() {
        console.log(this.data);
    },

    components: {
        ButtonArrowWrapper,
    },
};
