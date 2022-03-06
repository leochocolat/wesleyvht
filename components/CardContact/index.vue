<template>
    <div class="js-card-contact card-availability" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler" @click="clickHandler">

        <div class="container">

            <span class="card-title paragraph-1">{{ staticCopy.contact.email }}</span>

            <span ref="email" class="email heading-6">
                {{ label }}
            </span>

            <ButtonArrowWrapper ref="arrow">
                <span class="button-placeholder paragraph-2">placeholder</span>
            </ButtonArrowWrapper>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
