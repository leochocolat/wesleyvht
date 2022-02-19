<template>
    <div class="slider">

        <MediaGallery :index="index" :medias="medias" />

        <CursorSlider ref="cursor" :index="index" :length="medias.length" />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
