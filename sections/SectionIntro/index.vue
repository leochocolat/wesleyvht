<template>
    <section class="section-intro">

        <div class="main-container">

            <div class="row">

                <div ref="colText" class="col-text">

                    <div class="paragraph-2 text-title">
                        Introduction
                    </div>

                    <RichText :document="data.introduction" class="paragraph-2 text" />

                </div>

                <div class="col-image">

                    <div class="logo-container">

                        <Logo />

                    </div>

                    <div class="image-container">

                        <ImageRenderer
                            class="image"
                            :source="data.images[0].fields.file.url"
                            :alt="data.images[0].fields.title"
                            :sizes="[500, 1000, 1200, 1200, 1600]"
                            :width="data.images[0].fields.file.details.image.width"
                            :height="data.images[0].fields.file.details.image.height"
                            :low="10"
                        />

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
