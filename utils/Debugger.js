// Utils
import EventDispatcher from '@/utils/EventDispatcher';

// Vendor
let DDDD = null;
if (process.client) {
    DDDD = require('@/vendor/dddd');
}

class Debugger extends EventDispatcher {
    create() {
        this._create();
    }

    destroy() {
        if (this._dddd) {
            this._dddd.destroy();
            this._dddd = null;
        }
    }

    /**
     * Public
     */
    addLayer(label, options) {
        return this._dddd.addLayer(label, options);
    }

    removeLayer(label) {
        this._dddd.removeLayer(label);
    }

    gotoLayer(label) {
        this._dddd.gotoLayer(label);
    }

    addGroup(label, options) {
        return this._dddd.addGroup(label, options);
    }

    removeGroup(label) {
        return this._dddd.removeGroup(label);
    }

    add(object, property, options) {
        this._dddd.add(object, property, options);
    }

    addButton(label, options) {
        this._dddd.addButton(label, options);
    }

    /**
     * Private
     */
    _create() {
        if (DDDD && !this._dddd) {
            this._dddd = new DDDD({
                onLayerChange: (e) => {
                    this.dispatchEvent('layer:change', e);
                },
            });
            this._dddd.toggleVisibility();
        }
    }
}

/* eslint-disable */
let debug = null;
if (process.client) {
    const urlParams = new URLSearchParams(window.location.search);
    if (process.env.NODE_ENV === 'development' && urlParams.get('production') !== '') {
        debug = new Debugger();
    }
}
export default debug;
