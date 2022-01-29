// Utils
import ScrollManager from '@/utils/ScrollManager';

export default {
    props: ['label', 'id'],

    methods: {
        clickHandler() {
            ScrollManager.scrollTo(`#${this.id}`);
        },
    },
};
