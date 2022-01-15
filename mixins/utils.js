// Vendor
import { mapGetters } from 'vuex';

// Copy
import staticCopy from '@/assets/copy';

// Components
import RichText from '@/components/RichText';
import ImageRenderer from '@/components/ImageRenderer';

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
        ImageRenderer,
    },
};
