<template>
    <div class="page-home">

        <!-- Intro -->
        <SectionIntro :data="data.fields.header.fields" />

        <!-- Projects -->
        <SectionProjects :data="data.fields.sectionProjects" />

        <!-- Profile -->
        <SectionProfile :data="data.fields.sectionProfile.fields" />

        <!-- Recognitions -->
        <SectionRecognitions :data="data.fields.sectionRecognitions.fields" />

        <!-- Partners -->
        <SectionPartners :data="data.fields.sectionPartners.fields" />

        <!-- Contact -->
        <SectionContact :data="data.fields.sectionContact.fields" />

    </div>
</template>

<script src="./home/script.js"></script>
<style src="./home/style.scss" lang="scss" scoped></style>
