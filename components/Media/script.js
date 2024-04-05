// Components
import ImageRenderer from '@/components/ImageRenderer';
import VideoRenderer from '@/components/VideoRenderer';

export default {
    props: ['data', 'isActive', 'autoplay'],

    watch: {
        isActive(isActive) {
            if (isActive) {
                if (this.$refs.videoRenderer) this.$refs.videoRenderer.play();
            } else if (this.$refs.videoRenderer) this.$refs.videoRenderer.pause();
        },
    },

    mounted() {
        if (this.isActive) {
            if (this.$refs.videoRenderer) this.$refs.videoRenderer.play();
        }

        if (this.autoplay) {
            if (this.$refs.videoRenderer) this.$refs.videoRenderer.play();
        }
    },

    computed: {
        isVideo() {
            return this.data.fields.file.contentType.includes('video');
        },
    },

    methods: {
        play() {
            this.$refs.videoRenderer?.play();
        },

        pause() {
            this.$refs.videoRenderer?.pause();
        },
    },

    components: {
        ImageRenderer,
        VideoRenderer,
    },
};
