<template>
    <div class="button-arrow-wrapper" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
        <slot></slot>
        <div class="arrow-container">
            <div ref="background" class="background"></div>
            <Arrow ref="arrow" />
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
