<template>
    <NuxtLink class="button the-button-home" to="/" @click.native="clickHandler">
        {{ staticCopy.name }}
    </NuxtLink>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
