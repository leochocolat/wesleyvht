<template>
    <div class="card-socials">

        <div class="container">

            <span class="card-title paragraph-1">{{ staticCopy.contact.socials }}</span>

            <div class="socials">

                <ButtonArrowWrapper v-for="(item, index) in data.socials" :key="index" class="button-socials">

                    <a :href="item.fields.url" target="_blank" rel="noopener noreferrer" class="button paragraph-1">

                        {{ item.fields.name }}

                    </a>

                </ButtonArrowWrapper>

            </div>

            <div class="copyrights heading-3">
                {{ data.copyright }}
            </div>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
