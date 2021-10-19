<template>
    <div class="image-renderer">

        <picture class="picture-low">

            <!-- webp source -->
            <source :srcset="`${source}?w=${low}&fm=webp`" type="image/webp">

            <!-- jpeg source -->
            <source :srcset="`${source}?w=${low}&fm=jpg`" type="image/jpeg">

            <!-- Image element with fallback jpg -->
            <img
                class="image-low"
                draggable="false"
                :src="`${source}?w=${low}&fm=jpg`"
                :alt="alt"
                :width="width"
                :height="height"
            >

        </picture>

        <picture class="picture-full">

            <!-- webp source -->
            <source :media="`(min-width: ${breakpoints[0]}px) and (max-width: ${breakpoints[1]}px)`" :srcset="`${source}?w=${sizes[0]}&fm=webp`" type="image/webp">
            <source :media="`(min-width: ${breakpoints[1]}px) and (max-width: ${breakpoints[2]}px)`" :srcset="`${source}?w=${sizes[1]}&fm=webp`" type="image/webp">
            <source :media="`(min-width: ${breakpoints[2]}px) and (max-width: ${breakpoints[3]}px)`" :srcset="`${source}?w=${sizes[2]}&fm=webp`" type="image/webp">
            <source :media="`(min-width: ${breakpoints[3]}px) and (max-width: ${breakpoints[4]}px)`" :srcset="`${source}?w=${sizes[3]}&fm=webp`" type="image/webp">
            <source :media="`(min-width: ${breakpoints[4]}px)`" :srcset="`${source}?w=${sizes[4]}&fm=webp`" type="image/webp">

            <!-- jpeg source -->
            <source :media="`(min-width: ${breakpoints[0]}px)`" :srcset="`${source}?w=${sizes[0]}&fm=jpg`" type="image/jpeg">
            <source :media="`(min-width: ${breakpoints[1]}px)`" :srcset="`${source}?w=${sizes[1]}&fm=jpg`" type="image/jpeg">
            <source :media="`(min-width: ${breakpoints[2]}px)`" :srcset="`${source}?w=${sizes[2]}&fm=jpg`" type="image/jpeg">
            <source :media="`(min-width: ${breakpoints[3]}px)`" :srcset="`${source}?w=${sizes[3]}&fm=jpg`" type="image/jpeg">
            <source :media="`(min-width: ${breakpoints[4]}px)`" :srcset="`${source}?w=${sizes[4]}&fm=jpg`" type="image/jpeg">

            <!-- Image element with fallback jpg -->
            <img
                ref="imageFull"
                class="image-full"
                draggable="false"
                :src="`${source}?w=${sizes[2]}&fm=jpg`"
                :alt="alt"
                :width="width"
                :height="height"
                @load="loadHandler"
            >

        </picture>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
