class AudioManager {
    constructor() {
        if (!process.client) return;
        this._context = new AudioContext();
        this._gain = this._context.createGain();
        this._gain.connect(this._context.destination);
    }

    /**
     * Getters
     */
    get context() {
        return this._context;
    }

    /**
     * Public
     */
    loadSound(path) {
        const promise = new Promise((resolve, reject) => {
            window.fetch(path)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this._context.decodeAudioData(arrayBuffer))
                .then((audioBuffer) => {
                    resolve(audioBuffer);
                });
        });

        return promise;
    }

    playEffect(buffer, volume = 2, frequency = 0) {
        this._gain.gain.value = volume;
        const source = this._context.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = 1 + frequency;
        source.connect(this._gain);
        source.start();
    }
}

export default new AudioManager();
