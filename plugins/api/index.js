/**
 * Api plugin
 *
 * @plugin
 *
 * @example
 * $api.getPosts()
 */
import contentfulModule from './contentful';

const apiFactory = (error, store, req, route, redirect) => ({
    ...contentfulModule({ error, store }),
});

export default (context, inject) => {
    const { app, error, store, route, req, redirect } = context;
    const api = apiFactory(error, store, req, route, redirect);

    inject('api', api);
};
