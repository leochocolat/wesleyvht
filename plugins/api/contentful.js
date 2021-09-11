const contentfulDelivery = require('contentful');

const configDelivery = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN_DELIVERY,
};

export default function({ error }) {
    const clientDelivery = contentfulDelivery.createClient(configDelivery);

    /**
     * Basics
     */

    /**
     * Returns the list of entries
     * @returns {Array.<Object>} List of all entries
     */
    async function getEntries(lang) {
        let res;
        try {
            res = await clientDelivery.getEntries({
                include: 10,
            });
        } catch (err) {
            res = err.response;
            return error({
                message: err.message,
            });
        }
        return res;
    }

    /**
     * Returns the list of entries by types
     * @param {String} type entry type
     * @returns {Array.<Object>} List of entries
     */
    async function getEntriesByType(type, options = {}) {
        let res;
        try {
            res = await clientDelivery.getEntries({
                content_type: type,
                include: 10,
                ...options,
            });
        } catch (err) {
            res = err.response;
            if (res.status === 404) {
                return error({
                    statusCode: 404,
                    message: 'The page you\'re looking for doesn\'t exist',
                });
            }
        }
        return res;
    }

    /**
     * Returns the entry needed by its id
     * @param {String} id entry id
     * @returns {Object} return the entry
     */
    async function getEntryById(id) {
        let res;
        try {
            res = await clientDelivery.getEntry(id, {
                include: 10,
            });
        } catch (err) {
            res = err.response;
            if (res.status === 404) {
                return error({
                    statusCode: 404,
                    message: 'The page you\'re looking for doesn\'t exist',
                });
            }
        }
        return res;
    }

    return {
        // Basis
        getEntries,
        getEntriesByType,
        getEntryById,
    };
}
