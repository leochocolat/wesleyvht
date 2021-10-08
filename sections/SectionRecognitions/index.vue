<template>
    <section class="section-recognition">

        <div class="main-container container">

            <h6 class="heading heading-2">
                {{ data.title }}
            </h6>

            <div class="list-labels">

                <div v-for="(label, labelIndex) in staticCopy.recognitions.labels" :key="`label-${labelIndex}`" class="label paragraph-2">
                    {{ label }}
                </div>

            </div>

            <ul class="recognition-type-list">

                <li v-for="(item, i) in list" :key="i" class="recognition-type-list-item">

                    <div class="recognition-type-name paragraph-2">
                        {{ item.type }}
                    </div>

                    <ul class="recognition-list">

                        <li v-for="(recognition, j) in item.items" :key="`recognition-${j}`" class="recognition-list-item">

                            <ButtonArrowWrapper v-if="recognition.url" class="button-arrow">

                                <a :href="recognition.url" target="_blank" rel="noopener noreferrer" class="button recognition">

                                    <div class="recognition-col paragraph-2">
                                        {{ recognition.name }}
                                    </div>

                                    <div class="recognition-col paragraph-2">
                                        {{ recognition.projectName }}
                                    </div>

                                    <div class="recognition-col paragraph-2">
                                        {{ recognition.year }}
                                    </div>

                                </a>

                            </ButtonArrowWrapper>

                            <div v-else class="button recognition">

                                <div class="recognition-col paragraph-2">
                                    {{ recognition.name }}
                                </div>

                                <div class="recognition-col paragraph-2">
                                    {{ recognition.projectName }}
                                </div>

                                <div class="recognition-col paragraph-2">
                                    {{ recognition.year }}
                                </div>

                            </div>

                        </li>

                    </ul>

                </li>

            </ul>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
