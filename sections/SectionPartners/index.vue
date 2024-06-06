<template>
    <section class="section-partners">

        <div class="main-container container">

            <div class="row">

                <div class="col-left">

                    <h6 class="heading heading-2">
                        {{ data.title }}
                    </h6>

                </div>

                <div class="col-right">

                    <div class="introduction">

                        <RichText :document="data.introduction" class="paragraph-2" />

                    </div>

                    <div class="lists-row">

                        <div class="list-container">

                            <div class="list-title heading-6">
                                {{ data.titleList1 || staticCopy.partners.clients }}
                            </div>

                            <ul class="list clients">

                                <li v-for="(item, index) in data.clients" :key="index" class="list-item clients">

                                    <a v-if="item.fields.website" class="button paragraph-2" :href="item.fields.website" target="_blank" rel="noopener noreferrer">
                                        {{ item.fields.name }}
                                    </a>
                                    <span v-else class="paragraph-2">
                                        {{ item.fields.name }}
                                    </span>

                                </li>

                            </ul>

                        </div>

                        <div class="list-container">

                            <div class="list-title heading-6">
                                {{ data.titleList2 || staticCopy.partners.agencies }}
                            </div>

                            <ul class="list">

                                <li v-for="(item, index) in data.agencies" :key="index" class="list-item">

                                    <a v-if="item.fields.website" class="button list-item-paragraph paragraph-2" :href="item.fields.website" target="_blank" rel="noopener noreferrer">
                                        {{ item.fields.name }}
                                        <span v-if="item.fields.note" class="label-current footnote">
                                            {{ item.fields.note }}
                                        </span>
                                    </a>

                                    <span v-else class="list-item-paragraph paragraph-2">
                                        {{ item.fields.name }}
                                        <span v-if="item.fields.note" class="label-current footnote">
                                            {{ item.fields.note }}
                                        </span>
                                    </span>

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
