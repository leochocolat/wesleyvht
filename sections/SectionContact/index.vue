<template>
    <section class="section-contact">

        <div class="container main-container">

            <div class="row">

                <div class="col">

                    <CardAvailability :data="data" />

                </div>

                <div class="col">

                    <CardContact :data="data" />

                </div>

                <div class="col">

                    <CardSocials :data="data" />

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
