<template>
    <div class="card-availability">

        <span class="card-title heading-6">*</span>

        <RichText :document="data.availability" class="card-content heading-6" />

        <div class="credits">

            <span class="role paragraph-2">
                {{ globalData.fields.footer.fields.developmentCredit.fields.role }}
            </span>

            <span class="separator paragraph-2">
                -
            </span>

            <ButtonArrowWrapper>

                <a :href="globalData.fields.footer.fields.developmentCredit.fields.website" target="_blank" rel="noopener noreferrer" class="button paragraph-2">
                    {{ globalData.fields.footer.fields.developmentCredit.fields.name }}
                </a>

            </ButtonArrowWrapper>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
