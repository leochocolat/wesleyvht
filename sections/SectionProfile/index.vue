<template>
    <section class="section-profile">

        <div class="main-container container">

            <h6 class="heading heading-1">
                {{ data.title }}
            </h6>

            <div class="row">

                <div class="col-image">

                    <div class="image-container">

                    </div>

                </div>

                <div class="col-text">

                    <div class="text-container">

                        <RichText class="paragraph paragraph-2" :document="data.content" />

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
