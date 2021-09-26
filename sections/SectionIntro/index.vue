<template>
    <section class="section-intro">

        <div class="main-container">

            <div class="row">

                <div class="col-text">

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

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
