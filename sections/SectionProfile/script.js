// Mixins
import utils from '@/mixins/utils';

export default {
    props: ['data'],

    mixins: [utils],

    mounted() {
        console.log(this.data);
    },
};
