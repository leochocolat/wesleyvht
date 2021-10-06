// Mixins
import utils from '@/mixins/utils';

// Utils
import math from '@/utils/math';

// Components
import MediaGallery from '@/components/MediaGallery';
import ButtonArrowWrapper from '@/components/ButtonArrowWrapper';
import ButtonToggle from '@/components/ButtonToggle';

export default {
    props: ['data'],

    mixins: [utils],

    data() {
        return {
            isOpen: false,
            currentIndex: 0,
        };
    },

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

    watch: {
        isOpen(isOpen) {
            // Do some shit
        },
    },

    methods: {
        /**
         * Private
         */
        toggleClickHandler() {
            this.isOpen = !this.isOpen;
        },

        clickNextHandler() {
            this.currentIndex = math.modulo(this.currentIndex + 1, this.data.medias.length);
        },

        clickPreviousHandler() {
            this.currentIndex = math.modulo(this.currentIndex - 1, this.data.medias.length);
        },
    },

    components: {
        MediaGallery,
        ButtonArrowWrapper,
        ButtonToggle,
    },
};
