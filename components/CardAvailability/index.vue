<template>
    <div class="card-availability">

        <span class="card-title paragraph-1">{{ staticCopy.contact.availability }}</span>

        <RichText :document="data.availability" class="card-content heading-6" />

        <div class="credits">

            <span class="role paragraph-2">
                {{ data.developmentCredit.fields.role }}
            </span>

            <span class="separator paragraph-2">
                -
            </span>

            <ButtonArrowWrapper>

                <a :href="data.developmentCredit.fields.website" target="_blank" rel="noopener noreferrer" class="button paragraph-2">
                    {{ data.developmentCredit.fields.name }}
                </a>

            </ButtonArrowWrapper>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
