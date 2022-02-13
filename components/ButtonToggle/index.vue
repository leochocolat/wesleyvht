<template>
    <button class="button button-toggle">

        <svg
            ref="svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="group-4" stroke="#000000">
                    <rect
                        id="rectangle"
                        x="0.5"
                        y="0.5"
                        width="23"
                        height="23"
                        rx="11.5"
                    ></rect>
                    <g id="group-open" ref="groupOpen" class="group-open" transform="translate(6.000000, 6.000000)">
                        <line id="path" x1="6" y1="-8.82627305e-15" x2="6" y2="12"></line>
                        <line id="path" x1="-8.51818616e-14" y1="6" x2="12" y2="6"></line>
                    </g>
                    <g id="group-close" ref="groupClose" class="group-close" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) translate(7.000000, 7.000000)">
                        <line id="path-close" x1="5" y1="0" x2="5" y2="10"></line>
                        <line id="path-close" x1="0" y1="5" x2="10" y2="5"></line>
                    </g>
                </g>
            </g>
        </svg>

    </button>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
