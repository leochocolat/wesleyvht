export default {
    props: ['index', 'length'],

    computed: {
        indexString() {
            const index = this.index + 1;
            const indexString = index < 10 ? `0${index}` : `${index}`;
            return indexString;
        },
    },
};
