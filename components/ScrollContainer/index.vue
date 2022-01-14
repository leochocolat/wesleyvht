<template>
    <div class="scroll-container" :class="smooth ? 'is-smooth' : ''">

        <div ref="content" class="scroll-content">
            <slot></slot>
        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
