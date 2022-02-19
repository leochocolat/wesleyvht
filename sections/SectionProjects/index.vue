<template>
    <section class="section-projects">

        <div class="main-container container">

            <div class="projects">

                <div v-for="(item, index) in data" :key="index" class="project-container">

                    <BlockProject :data="item.fields" />

                </div>

                <!-- <div v-for="(item, index) in 1" :key="index" class="project-container">

                    <BlockProject :data="data[index].fields" />

                </div> -->

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
