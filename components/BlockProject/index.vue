<template>
    <div class="block-project">

        <div class="row">

            <!-- Col Content -->
            <div class="col-left">

                <div class="content">

                    <!-- Introduction -->
                    <div ref="introduction" class="introduction">

                        <div class="titles">

                            <h6 class="heading-6 project-title">
                                {{ data.name }}
                            </h6>

                            <p class="paragraph-1 project-subtitle">
                                {{ data.tag.fields.name }}
                            </p>

                        </div>

                        <RichText :document="data.description" class="paragraph-2 project-description" />

                    </div>

                    <div class="list-container">

                        <!-- Navigation -->
                        <div class="navigation">

                            <ButtonToggle :is-open="isOpen" @click.native="toggleClickHandler" />

                            <div class="indicator paragraph-2">

                                ({{ currentIndex + 1 }}-{{ data.medias.length }})

                            </div>

                        </div>

                        <!-- List -->
                        <ul ref="list" class="list">

                            <li v-for="(item, index) in listItems" :key="index" ref="listItem" class="list-item">

                                <div ref="listItemTitle" class="paragraph-2 list-item-title">
                                    {{ item.title }}
                                </div>

                                <ul ref="sublist" class="sublist">

                                    <li v-for="(subItem, subIndex) in item.items" :key="`sublist-${subIndex}`" ref="sublistItem" class="sublist-item">

                                        <ButtonArrowWrapper v-if="subItem.url && subItem.url !== ''" ref="buttonWrapper" class="button-arrow-wrapper">

                                            <a v-if="subItem.url" class="button link paragraph-2" :href="subItem.url" target="_blank" rel="noopener noreferrer">
                                                {{ subItem.label }}
                                            </a>

                                        </ButtonArrowWrapper>

                                        <p v-else class="paragraph-2">
                                            {{ subItem.label }}
                                        </p>

                                    </li>

                                </ul>

                            </li>

                        </ul>

                    </div>

                </div>

            </div>

            <!-- Col Image -->
            <div class="col-right">

                <div class="image-container">

                    <Slider :index="currentIndex" :medias="data.medias" @click.native="clickNextHandler" />

                </div>

            </div>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
