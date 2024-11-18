export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Wesley van’t Hart',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        ],
    },

    // Loading
    loading: {
        height: '0',
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/styles/app.scss'],

    /*
     ** CSS Style Resources
     */
    styleResources: {
        scss: [
            '@/assets/styles/resources/_variables.scss',
            '@/assets/styles/resources/_mixins.scss',
            '@/assets/styles/resources/_functions.scss',
            '@/assets/styles/resources/_breakpoints.scss',
        ],
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['@/plugins/init.client.js', '@/plugins/init.js', '@/plugins/api/index.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // Doc: https://github.com/nuxt-community/stylelint-module
        '@nuxtjs/stylelint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/svg',
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            plugins: ['@babel/plugin-proposal-optional-chaining'],
        },

        // Debug safari
        chainWebpack: (config) => {
            if (process.env.NODE_ENV === 'development') {
                config
                    .output
                    .filename('[name].[hash].js')
                    .end();
            }
        },
    },

    env: {
        NODE_ENV: process.env.NODE_ENV,
        // Contentful
        CTF_SPACE_ID: process.env.CTF_SPACE_ID,
        CTF_CDA_ACCESS_TOKEN_DELIVERY: process.env.CTF_CDA_ACCESS_TOKEN_DELIVERY,
    },

    server: {
        port: 3000,
        host: '0.0.0.0',
    },
};
