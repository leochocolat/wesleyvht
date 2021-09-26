// Vendor
import { mapGetters } from 'vuex';

// Copy
import staticCopy from '@/assets/copy';

// Components
import RichText from '@/components/RichText';

export default {
    data() {
        return {
            staticCopy,
        };
    },

    computed: {
        ...mapGetters({
            breakpoint: 'device/breakpoint',
            isTouch: 'device/isTouch',
            isDebug: 'context/isDebug',
            isDevelopment: 'context/isDevelopment',
            isProduction: 'context/isProduction',
        }),
    },

    components: {
        RichText,
    },
};
