import gsap from 'gsap';

export default {
    props: ['isOpen'],

    watch: {
        isOpen(isOpen) {
            // Do some shit

            if (this.isOpen) {
                this.open();
            } else {
                this.close();
            }
        },
    },

    methods: {
        open() {
            this.timelineClose?.kill();
            this.timelineOpen = new gsap.timeline();
            this.timelineOpen.to(this.$refs.groupOpen, { duration: 0.3, alpha: 0, ease: 'sine.inOut' });
            this.timelineOpen.to(this.$refs.groupClose, { duration: 0.3, alpha: 1, ease: 'sine.inOut' });
        },

        close() {
            this.timelineOpen?.kill();
            this.timelineClose = new gsap.timeline();
            this.timelineClose.to(this.$refs.groupClose, { duration: 0.3, alpha: 0, ease: 'sine.inOut' });
            this.timelineClose.to(this.$refs.groupOpen, { duration: 0.3, alpha: 1, ease: 'sine.inOut' });
        },
    },
};
