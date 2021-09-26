<template>
    <div class="default">

        <!-- Navigation -->
        <TheNavigation :data="data.fields.header.fields" />

        <!-- Router Views -->
        <Nuxt />

        <!-- Footer -->
        <TheFooter :data="data.fields.footer.fields" />

        <!-- Debug -->
        <DebugMediaQueries />
        <DebugGrid />

    </div>
</template>

<script src="./default/script.js"></script>
<style src="./default/style.scss" lang="scss"></style>
