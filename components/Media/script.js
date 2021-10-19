// Components
import ImageRenderer from '@/components/ImageRenderer';

export default {
    props: ['data'],

    components: {
        ImageRenderer,
    },

    mounted() {
        console.log(this.data);
    },
};
