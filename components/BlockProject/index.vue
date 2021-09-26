<template>
    <div class="block-project">

        <div class="row">

            <div class="col-left">

                <div class="content">

                    <h6 class="heading-6 project-title">
                        {{ data.name }}
                    </h6>

                    <p class="paragraph-1 project-subtitle">
                        {{ data.tag.fields.name }}
                    </p>

                    <RichText :document="data.description" class="paragraph-2 project-description" />

                    <ul class="list">

                        <li v-for="(item, index) in listItems" :key="index" class="list-item">

                            <div class="paragraph-2 list-item-title">
                                {{ item.title }}
                            </div>

                            <ul class="sublist">

                                <li v-for="(subItem, subIndex) in item.items" :key="`sublist-${subIndex}`" class="sublist-item">

                                    <ButtonArrowWrapper>

                                        <a v-if="subItem.url" class="button paragraph-2" :href="subItem.url" target="_blank" rel="noopener noreferrer">
                                            {{ subItem.label }}
                                        </a>

                                    </ButtonArrowWrapper>

                                </li>

                            </ul>

                        </li>

                    </ul>

                </div>

            </div>

            <div class="col-right">

                <div class="image-container"></div>

            </div>

        </div>

        <!-- {{ data.name }} -->

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
