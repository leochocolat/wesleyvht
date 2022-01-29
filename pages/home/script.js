// Vendor
import { mapGetters } from 'vuex';

// Mixins
import page from '@/mixins/page';

// Sections
import SectionIntro from '@/sections/SectionIntro';
import SectionProjects from '@/sections/SectionProjects';
import SectionProfile from '@/sections/SectionProfile';
import SectionRecognitions from '@/sections/SectionRecognitions';
import SectionPartners from '@/sections/SectionPartners';
import SectionContact from '@/sections/SectionContact';

export default {
    mixins: [page],

    computed: {
        ...mapGetters({
            data: 'data/data',
        }),
    },

    components: {
        SectionIntro,
        SectionProjects,
        SectionProfile,
        SectionRecognitions,
        SectionPartners,
        SectionContact,
    },
};
