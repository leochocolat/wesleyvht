// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';

export default {
    props: ['data'],

    mounted() {
        console.log(this.data);
    },

    components: {
        ButtonArrowWrapper,
    },
};
