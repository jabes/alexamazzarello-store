import glob from 'glob'
import path from 'path'

const dynamicRoutes = getDynamicPaths({
    '/page': 'page/*.json',
});

export default {
    mode: 'universal',

    head: {
        title: "Alexa Mazzarello",
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: "Static content generator for ecom store front."
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },

    loading: {
        color: '#fff'
    },

    css: [],
    plugins: [],

    modules: [
        '@nuxtjs/markdownit',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
    ],

    markdownit: {
        injected: true,
        preset: 'default',
        breaks: true,
        html: true,
    },

    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    build: {
        extend(config, ctx) {},
    },

    generate: {
        routes: dynamicRoutes
    }
}

function getDynamicPaths(urlFilepathTable) {
    return [].concat(
        ...Object.keys(urlFilepathTable).map(url => {
            let filepathGlob = urlFilepathTable[url];
            return glob
                .sync(filepathGlob, {cwd: 'content'})
                .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
        })
    );
}