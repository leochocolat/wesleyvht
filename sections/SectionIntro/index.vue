<template>
    <section class="section-intro" @mousemove="mousemoveHandler">

        <div ref="mainContainer" class="main-container">

            <div class="row">

                <div ref="stickyContainer" class="col-text sticky-container">

                    <div ref="stickyContent" class="sticky-content">

                        <div ref="textContainer" class="text-container">

                            <div class="paragraph-2 text-title">
                                Introduction
                            </div>

                            <RichText :document="data.introduction" class="paragraph-2 text" />

                        </div>

                    </div>

                </div>

                <div class="col-image">

                    <div ref="logoContainer" class="logo-container">

                        <Logo ref="logo" class="logo" />

                    </div>

                    <!-- <div ref="imageContainer" class="image-container">

                        <ImageRenderer
                            class="image is-active"
                            :source="data.images[0].fields.file.url"
                            :alt="data.images[0].fields.title"
                            :sizes="[500, 1000, 1200, 1200, 1600]"
                            :width="data.images[0].fields.file.details.image.width"
                            :height="data.images[0].fields.file.details.image.height"
                            :low="10"
                        />

                    </div> -->

                    <div ref="imageContainer" class="image-container" :class="{ 'is-enabled': allowMouseInteraction }" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">

                        <!-- <ImageRenderer
                            v-for="(item, index) in data.images"
                            :key="index"
                            class="image"
                            :class="activeImageIndex === index ? 'is-active' : ''"
                            :source="item.fields.file.url"
                            :alt="item.fields.title"
                            :sizes="[500, 1000, 1200, 1200, 1600]"
                            :width="item.fields.file.details.image.width"
                            :height="item.fields.file.details.image.height"
                            :low="10"
                        /> -->

                        <Media ref="media" :autoplay="true" :data="data.video" class="is-active" :is-active="true" />

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
