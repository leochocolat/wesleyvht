<template>
    <footer class="the-footer">

        <div class="main-container container">

            <div class="row">

                <div class="credits">

                    <span class="role paragraph-1">
                        {{ data.developmentCredit.fields.role }}
                    </span>

                    <span class="separator paragraph-1">
                        -
                    </span>

                    <ButtonArrowWrapper>

                        <a :href="data.developmentCredit.fields.website" target="_blank" rel="noopener noreferrer" class="button paragraph-1">
                            {{ data.developmentCredit.fields.name }}
                        </a>

                    </ButtonArrowWrapper>

                </div>

                <div class="copyrights heading-2">
                    {{ data.copyright }}
                </div>

            </div>

        </div>

    </footer>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
