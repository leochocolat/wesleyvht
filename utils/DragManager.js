const TAP_TRESHOLD = 1;

class DragManager {
    constructor(options) {
        this.el = options.el;

        this._touchStartPosition = { x: 0, y: 0 };
        this._touchPosition = { x: 0, y: 0 };
        this._dragDelta = { x: 0, y: 0 };

        this._touchStartPositionScroll = { x: 0, y: 0 };
        this._touchPositionScroll = { x: 0, y: 0 };
        this._touchDeltaScroll = { x: 0, y: 0 };

        this._isDragging = false;

        this._dragDirection = null;

        this._enable = true;

        this._bindAll();
        this._setup();
    }

    /**
     * Public
     */
    dispose() {
        this._removeEventListeners();
    }

    addEventListener(eventName, func) {
        switch (eventName) {
            case 'dragstart':
                this._dragstartCallback = func;
                break;
            case 'drag':
                this._dragCallback = func;
                break;
            case 'dragend':
                this._dragendCallback = func;
                break;
            case 'tap':
                this._tapCallback = func;
                break;
        }
    }

    enable() {
        this._enable = true;
    }

    disable() {
        this._enable = false;
    }

    /**
     * Private
     */
    _setup() {
        this._setupEventListeners();
    }

    _bindAll() {
        this._touchstartHandler = this._touchstartHandler.bind(this);
        this._touchmoveHandler = this._touchmoveHandler.bind(this);
        this._touchendHandler = this._touchendHandler.bind(this);
        this._mousedownHandler = this._mousedownHandler.bind(this);
        this._mousemoveHandler = this._mousemoveHandler.bind(this);
        this._mouseupHandler = this._mouseupHandler.bind(this);
        this._touchStartScrollHandler = this._touchStartScrollHandler.bind(this);
        this._touchScrollHandler = this._touchScrollHandler.bind(this);
        this._touchEndScrollHandler = this._touchEndScrollHandler.bind(this);
    }

    _setupEventListeners() {
        if (this.isTouch()) {
            this.el.addEventListener('touchstart', this._touchstartHandler);
            window.addEventListener('touchmove', this._touchmoveHandler);
            window.addEventListener('touchend', this._touchendHandler);
        } else {
            this.el.addEventListener('mousedown', this._mousedownHandler);
            window.addEventListener('mousemove', this._mousemoveHandler);
            window.addEventListener('mouseup', this._mouseupHandler);
        }

        document.addEventListener('touchstart', this._touchStartScrollHandler, { passive: false });
        document.addEventListener('touchmove', this._touchScrollHandler, { passive: false });
        document.addEventListener('touchend', this._touchEndScrollHandler, { passive: false });
    }

    _removeEventListeners() {
        if (this.isTouch()) {
            this.el.removeEventListener('touchstart', this._touchstartHandler);
            window.removeEventListener('touchmove', this._touchmoveHandler);
            window.removeEventListener('touchend', this._touchendHandler);
        } else {
            this.el.removeEventListener('mousedown', this._mousedownHandler);
            window.removeEventListener('mousemove', this._mousemoveHandler);
            window.removeEventListener('mouseup', this._mouseupHandler);
        }

        document.removeEventListener('touchstart', this._touchStartScrollHandler, { passive: false });
        document.removeEventListener('touchmove', this._touchScrollHandler, { passive: false });
        document.removeEventListener('touchend', this._touchEndScrollHandler, { passive: false });
    }

    /**
     * Handlers
     */
    _dragstartHandler(e) {
        if (!this._enable) return;
        if (!this._dragstartCallback) return;
        this._dragstartCallback(e);
    }

    _dragHandler(e) {
        if (!this._enable) return;
        if (!this._dragCallback) return;
        this._dragCallback(e);
    }

    _dragendHandler(e) {
        if (!this._enable) return;
        if (!this._dragendCallback) return;
        this._dragendCallback(e);
    }

    _tapHandler(e) {
        if (!this._enable) return;
        if (!this._tapCallback) return;
        this._tapCallback(e);
    }

    // Mouse
    _mousedownHandler(e) {
        this._isDraging = true;

        const position = {
            x: e.clientX,
            y: e.clientY,
        };

        const delta = { x: 0, y: 0 };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._touchStartPosition.x = position.x;
        this._touchStartPosition.y = position.y;

        this._dragstartHandler({ position, delta, element: this.el });
    }

    _mousemoveHandler(e) {
        if (!this._isDraging) return;

        const position = {
            x: e.clientX,
            y: e.clientY,
        };

        const delta = {
            x: this._touchPosition.x - position.x,
            y: this._touchPosition.y - position.y,
        };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._dragDelta.x = delta.x;
        this._dragDelta.y = delta.y;

        this._dragHandler({ position, delta, element: this.el });
    }

    _mouseupHandler() {
        const position = this._touchPosition;
        const delta = this._dragDelta;

        if (this._isDraging && Math.abs(position.x - this._touchStartPosition.x) < TAP_TRESHOLD) {
            this._tapHandler({ position, delta, element: this.el });
        }

        if (this._isDraging) {
            this._dragendHandler({ position, delta, element: this.el });
        }

        this._isDraging = false;
    }

    // Touch
    _touchstartHandler(e) {
        this._isDraging = true;

        const position = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };

        const delta = { x: 0, y: 0 };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._touchStartPosition.x = position.x;
        this._touchStartPosition.y = position.y;

        if (this._dragDirection === 'vertical') return;

        this._dragstartHandler({ position, delta, element: this.el });
    }

    _touchmoveHandler(e) {
        if (!this._isDraging) return;

        const position = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };

        const delta = {
            x: this._touchPosition.x - position.x,
            y: this._touchPosition.y - position.y,
        };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._dragDelta.x = delta.x;
        this._dragDelta.y = delta.y;

        if (this._dragDirection === 'vertical') return;

        this._dragHandler({ position, delta });
    }

    _touchendHandler() {
        const position = this._touchPosition;
        const delta = this._dragDelta;

        if (this._isDraging && Math.abs(position.x - this._touchStartPosition.x) < TAP_TRESHOLD) {
            this._tapHandler({ position, delta, element: this.el });
        }

        if (this._dragDirection === 'vertical') return;

        if (this._isDraging) {
            this._dragendHandler({ position, delta, element: this.el });
        }

        this._isDraging = false;
    }

    _touchStartScrollHandler(e) {
        if (this._dragDirection) return;

        const position = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };

        this._touchPositionScroll.x = position.x;
        this._touchPositionScroll.y = position.y;

        this._touchStartPositionScroll.x = position.x;
        this._touchStartPositionScroll.y = position.y;
    }

    _touchScrollHandler(e) {
        const position = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };

        const delta = {
            x: this._touchPositionScroll.x - position.x,
            y: this._touchPositionScroll.y - position.y,
        };

        this._touchPositionScroll.x = position.x;
        this._touchPositionScroll.y = position.y;

        this._touchDeltaScroll.x = delta.x;
        this._touchDeltaScroll.y = delta.y;

        if (this._dragDirection === 'horizontal' && this._isDraging) e.preventDefault();

        // Only set direction once
        // It will be reset on touch end
        if (this._dragDirection) return;

        if (Math.abs(this._touchDeltaScroll.y) > Math.abs(this._dragDelta.x)) this._dragDirection = 'vertical';
        else this._dragDirection = 'horizontal';
    }

    _touchEndScrollHandler(e) {
        this._dragDirection = null;
    }

    /**
     * Utils
     */
    isTouch() {
        return 'ontouchstart' in window;
    }
}

export default DragManager;
