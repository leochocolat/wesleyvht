<template>
    <div class="media-gallery">

        <Media v-for="(item, i) in medias" :key="i" :data="medias[i]" :class="i === index ? 'is-active' : ''" :is-active="i === index" />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
