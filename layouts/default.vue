<template>
    <div class="default">

        <!-- Navigation -->
        <!-- <TheNavigationScroll :data="data.fields.header.fields" /> -->

        <!-- Scroll Container -->
        <ScrollContainer>

            <!-- Navigation -->
            <TheNavigation :data="data.fields.header.fields" />

            <!-- Router Views -->
            <Nuxt />

        </ScrollContainer>

        <!-- Canvas -->
        <TheCanvas />

        <!-- Debug -->
        <DebugMediaQueries />
        <DebugGrid />

    </div>
</template>

<script src="./default/script.js"></script>
<style src="./default/style.scss" lang="scss"></style>
