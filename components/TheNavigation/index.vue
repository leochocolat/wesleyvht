<template>
    <nav class="the-navigation">

        <div class="main-container">

            <div class="row">

                <div ref="colButtonHome" class="col-button-home nav-item">

                    <TheButtonHome ref="buttonHome" />

                </div>

                <div ref="colButtons" class="col-buttons">

                    <div v-for="(item, index) in staticCopy.sections" ref="buttonNavigation" :key="index" class="button-container nav-item">

                        <ButtonNavigation :id="item.id" :label="item.name" @click="clickHandler" />

                    </div>

                </div>

                <div ref="colSocials" class="col-socials">

                    <div
                        v-for="(item, index) in data.socials"
                        :key="index"
                        ref="buttonSocial"
                        class="social-container nav-item"
                    >

                        <a
                            :href="item.fields.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="button button-social"
                        >
                            {{ item.fields.buttonLabel }}
                        </a>

                    </div>

                </div>

                <div class="col-button-toggle-navigation">

                    <button ref="buttonToggle" class="button button-toggle-navigation nav-item" @click="clickHandler">

                        <IconToggleNavigation ref="iconToggleNavigation" class="icon-toggle-navigation" />

                    </button>

                </div>

            </div>

        </div>

    </nav>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
