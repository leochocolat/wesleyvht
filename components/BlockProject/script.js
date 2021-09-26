// Mixins
import utils from '@/mixins/utils';

// Components
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';

export default {
    props: ['data'],

    mixins: [utils],

    computed: {
        // Merge credits and live website url
        listItems() {
            const items = [];
            const titles = [];

            const credits = this.data.credits;

            for (let i = 0; i < credits.length; i++) {
                const credit = credits[i].fields;
                const title = credit.role;
                const item = { label: credit.name, url: credit.website };

                if (titles.includes(title)) {
                    const index = titles.indexOf(title);
                    items[index].items.push(item);
                }

                if (!titles.includes(title)) {
                    titles.push(title);
                    items.push({ title, items: [item] });
                }
            }

            const liveProject = {
                title: 'Live Website',
                items: [
                    {
                        label: this.data.shortURL || this.data.url,
                        url: this.data.url,
                    },
                ],
            };

            items.push(liveProject);

            return items;
        },
    },

    components: {
        ButtonArrowWrapper,
    },
};
