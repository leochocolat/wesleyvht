<template>
    <div class="media">

        <ImageRenderer
            :source="data.fields.file.url"
            :alt="data.fields.title"
            :sizes="[400, 750, 1000, 850, 1200]"
            :width="data.fields.file.details.image.width"
            :height="data.fields.file.details.image.height"
            :low="10"
        />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
