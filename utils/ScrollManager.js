// Vendor
import { gsap } from 'gsap';

// Utils
import EventDispatcher from './EventDispatcher';
import math from './math';
import WindowResizeObserver from './WindowResizeObserver';

const DEBOUNCE_RATE = 250;

class ScrollManager extends EventDispatcher {
    constructor() {
        super();

        if (!process.client) return;

        // Options
        this._el = window;
        this._isSmooth = true;
        this._damping = 0.15;

        this._isEnabled = true;

        this._isScrolling = false;
        this._position = window.scrollY;
        this._delta = 0;

        this._isSmoothScrolling = false;
        this._smoothPosition = window.scrollY;
        this._smoothDelta = 0;

        this._getScrollHeight();
        this._bindAll();
        this._setupEventListeners();
    }

    /**
     * Lifecycle
     */
    destroy() {
        this._removeEventListeners();
    }

    update() {
        this._getScrollHeight();
    }

    /**
     * Getters
     */
    get position() {
        return this._isSmooth ? this._smoothPosition : this._position;
    }

    get delta() {
        return this._isSmooth ? this._smoothDelta : this._delta;
    }

    /**
     * Getters
     */
    set position(position) {
        if (this._isSmooth) {
            this._smoothPosition = position;
            this._position = position;
            window.scrollTo({ top: position });
            this.dispatchEvent('scroll', { position: this.position, delta: this.delta });
        } else {
            window.scrollTo({ top: position });
        }
    }

    /**
     * Public
     */
    disableSmooth() {
        this._isSmooth = false;
        gsap.ticker.remove(this._tickHandler);
    }

    setPosition(position) {
        this._position = position;
        this._smoothPosition = position;
        window.scrollTo({ top: position });
        this.dispatchEvent('scroll', {
            position: this.position,
            delta: this.delta,
        });
    }

    enable() {
        this._isEnabled = true;
    }

    disable() {
        this._isEnabled = false;
    }

    // todo make it smooth on safari
    scrollTo(target, offset) {
        const offsetValue = offset || 0;
        let scrollDestination;

        switch (typeof target) {
            case 'string':
                if (document.querySelector(`${target}`)) {
                    scrollDestination = document.querySelector(`${target}`).getBoundingClientRect().top + this._position + offsetValue;
                }
                break;

            case 'number':
                scrollDestination = target + offsetValue;
                break;

            case 'object':
                if (target.tagName) {
                    scrollDestination = target.getBoundingClientRect().top + this._position + offsetValue;
                }
                break;

            default:
                console.error('ScrollTo Target is not valid, it has to be either a selector, an absolute position or a node element');
                break;
        }

        scrollDestination = math.clamp(scrollDestination, 0, this._scrollHeight);

        gsap.to(this, { duration: 1.5, position: scrollDestination, ease: 'power3.inOut' });
    }

    /**
     * Private
     */
    _checkScroll() {
        if (!this._isEnabled) return;

        let position = math.lerp(this._smoothPosition, this._position, this._damping);
        position = math.clamp(position, 0, this._scrollHeight);

        const roundedPosition = Math.round(position * 100) / 100;

        const delta = this._smoothPosition - roundedPosition;
        const roundedDelta = Math.round((delta) * 100) / 100;
        const integerDelta = Math.round(delta);

        this._smoothPosition = roundedPosition;
        this._smoothPosition = Math.max(this._smoothPosition, 0);
        this._smoothDelta = roundedDelta;

        if (roundedDelta !== 0) {
            this.smoothScrollHandler();
        } else if (this._isSmoothScrolling) this._smoothScrollEndHandler();
    }

    _getScrollHeight() {
        this._scrollHeight = document.body.offsetHeight - WindowResizeObserver.viewportHeight;
    }

    _bindAll() {
        this._tickHandler = this._tickHandler.bind(this);
        this._scrollHandler = this._scrollHandler.bind(this);
        this._scrollDebounceHandler = this._scrollDebounceHandler.bind(this);
        this._scrollEndHandler = this._scrollEndHandler.bind(this);
    }

    _setupEventListeners() {
        if (this._isSmooth) gsap.ticker.add(this._tickHandler);
        this._el.addEventListener('scroll', this._scrollHandler);
    }

    _removeEventListeners() {
        if (this._isSmooth) gsap.ticker.remove(this._tickHandler);
        this._el.removeEventListener('scroll', this._scrollHandler);
    }

    _tickHandler() {
        this._checkScroll();
    }

    /**
     * Native scroll handlers
     */
    _scrollHandler(e) {
        if (!this._isEnabled) return;

        this._isScrolling = true;

        let position = Math.max(this._el.pageYOffset, 0);
        position = math.clamp(position, 0, this._scrollHeight);
        const delta = this._position - position;

        this._position = position;
        this._delta = delta;

        if (this._isSmooth) return;

        if (this._isScheduledAnimationFrame) return;

        this._isScheduledAnimationFrame = true;
        requestAnimationFrame(this._scrollDebounceHandler);
    }

    _scrollDebounceHandler() {
        this.dispatchEvent('scroll', {
            position: this._position,
            delta: this._delta,
        });

        if (this._scrollTimeout) clearTimeout(this._scrollTimeout);
        this._scrollTimeout = setTimeout(this._scrollEndHandler, DEBOUNCE_RATE);

        this._isScheduledAnimationFrame = false;
    }

    _scrollEndHandler() {
        this._isScrolling = false;

        this._delta = 0;

        this.dispatchEvent('scroll:end', {
            position: this._position,
            delta: this._delta,
        });
    }

    /**
     * Smooth scroll handlers
     */
    smoothScrollHandler() {
        if (!this._isSmooth) return;

        this._isSmoothScrolling = true;

        this.dispatchEvent('scroll', {
            position: this._smoothPosition,
            delta: this._smoothDelta,
        });
    }

    _smoothScrollEndHandler() {
        if (!this._isSmooth) return;

        this._isSmoothScrolling = false;

        this._smoothDelta = 0;

        this.dispatchEvent('scroll:end', {
            position: Math.round(this._smoothPosition),
            delta: this._smoothDelta,
        });
    }
}

export default new ScrollManager();
