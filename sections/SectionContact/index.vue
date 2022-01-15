<template>
    <section class="section-contact">

        <div class="container main-container">

            <div class="row">

                <div class="col">

                    <CardAvailability :data="data" />

                </div>

                <div class="col">

                    <CardAvailability :data="data" />

                </div>

                <div class="col">

                    <CardAvailability :data="data" />

                    <!-- <p class="col-title paragraph-1">

                        {{ staticCopy.contact.socials }}

                    </p>

                    <div class="socials">

                        <ButtonArrowWrapper v-for="(item, index) in data.socials" :key="index" class="button-socials">

                            <a :href="item.fields.url" target="_blank" rel="noopener noreferrer" class="button paragraph-1">

                                {{ item.fields.name }}

                            </a>

                        </ButtonArrowWrapper>

                    </div> -->

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
