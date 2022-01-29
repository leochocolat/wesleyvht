<template>
    <div class="page-home">

        <!-- Intro -->
        <SectionIntro id="intro" :data="data.fields.header.fields" />

        <!-- Projects -->
        <SectionProjects id="work" :data="data.fields.sectionProjects" />

        <!-- Profile -->
        <SectionProfile id="profile" :data="data.fields.sectionProfile.fields" />

        <!-- Recognitions -->
        <SectionRecognitions id="recognitions" :data="data.fields.sectionRecognitions.fields" />

        <!-- Partners -->
        <SectionPartners id="partners" :data="data.fields.sectionPartners.fields" />

        <!-- Contact -->
        <SectionContact id="contact" :data="data.fields.sectionContact.fields" />

    </div>
</template>

<script src="./home/script.js"></script>
<style src="./home/style.scss" lang="scss" scoped></style>
