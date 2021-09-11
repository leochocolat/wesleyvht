// Vendor
import { mapGetters } from 'vuex';

export default {
    props: ['error'],

    computed: {
        ...mapGetters({
            isDevelopment: 'context/isDevelopment',
        }),
    },

    mounted() {
        if (this.isDevelopment) return;
        this.$router.push(this.localePath('/error'));
    },
};
