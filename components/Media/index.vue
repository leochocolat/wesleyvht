<template>
    <div class="media">

        <VideoRenderer v-if="isVideo" ref="videoRenderer" :source="data.fields.file.url" />

        <ImageRenderer
            v-else
            :source="data.fields.file.url"
            :alt="data.fields.title"
            :sizes="[500, 1000, 1200, 1200, 1600]"
            :width="data.fields.file.details.image.width"
            :height="data.fields.file.details.image.height"
            :low="10"
        />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
