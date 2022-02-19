<template>
    <nav class="the-navigation-scroll">

        <div ref="main" class="main">

            <div class="background"></div>

            <div class="navigation-container">

                <div class="row">

                    <div ref="colButtonHome" class="col-button-home">

                        <TheButtonHome />

                    </div>

                    <div ref="colButtons" class="col-buttons">

                        <div v-for="(item, index) in staticCopy.sections" :key="index" ref="buttonNavigation" class="button-container" :class="activeSectionId === item.id ? 'is-active' : ''">

                            <div class="button-wrapper">

                                <ButtonNavigation :id="item.id" :label="item.name" />

                                <span ref="activeIndicator" class="active-indicator" :data-section-id="item.id"></span>

                            </div>

                        </div>

                    </div>

                    <div class="col-socials">

                        <div
                            v-for="(item, index) in data.socials"
                            :key="index"
                            ref="buttonSocial"
                            class="social-container"
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

                        <button class="button button-toggle-navigation" @click="clickHandler">

                            <IconToggleNavigation ref="iconToggleNavigation" class="icon-toggle-navigation" />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </nav>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
