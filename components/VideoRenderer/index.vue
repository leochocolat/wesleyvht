<template>
    <div class="video-renderer">

        <video
            ref="video"
            class="video"
            :src="source"
            muted
            playsinline
            loop
            @canplay="canplayHandler"
        ></video>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
