<template>
    <div class="media-gallery">

        <Media v-for="(item, i) in medias" :key="i" :data="medias[index]" :class="i === index ? 'is-active' : ''" />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
