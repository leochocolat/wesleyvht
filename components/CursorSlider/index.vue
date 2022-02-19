<template>
    <div class="cursor-slider">
        <div ref="background" class="background"></div>
        <div ref="text" class="text">
            {{ index + 1 }} of {{ length }}
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
