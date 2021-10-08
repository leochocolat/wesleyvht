// Mixins
import utils from '@/mixins/utils';

// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';

export default {
    props: ['data'],

    mixins: [utils],

    computed: {
        list() {
            const items = [];
            const types = [];

            for (let i = 0; i < this.data.list.length; i++) {
                const item = this.data.list[i].fields;
                const type = item.type;

                if (types.includes(type)) {
                    const index = types.indexOf(type);
                    items[index].items.push(item);
                }

                if (!types.includes(type)) {
                    types.push(type);
                    items.push({ type, items: [item] });
                }
            }

            return items;
        },
    },

    components: {
        ButtonArrowWrapper,
    },
};
