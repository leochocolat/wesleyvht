// Utils
import device from './device';
import easings from './easings';
import math from './math';
import ScrollManager from './ScrollManager';
import WindowResizeObserver from './WindowResizeObserver';

class Sticky {
    constructor(options = {}) {
        this._options = options;
        this._el = options.el;
        this._trigger = options.trigger;
        this._start = options.start || 0;
        this._end = options.end || 'auto';
        this._markers = options.markers;
        this._progressHandler = options.onProgress;
        this._isTouch = device.isTouch();

        this._scrollPosition = ScrollManager.position;
        this._globalProgress = 0;
        this._progress = 0;
        this._isStickedTouch = false;

        this._bounds = null;

        if (!this._isTouch) this._setup();
        else this._setupTouch();

        if (this._markers) this._markerElements = this._createMarkers();

        this._bindAll();
        this._setupEventListeners();
    }

    /**
     * Public
     */
    get bounds() {
        return this._bounds;
    }

    destroy() {
        this._scrollPosition = null;
        this._removeEventListeners();
        this._destroyMarkers();
    }

    /**
     * Private
     */
    _setup() {
        this._getBounds();
        this._startOffset = this._getStartOffset();
        this._startPosition = this._getStartPosition();
        this._endPosition = this._getEndPosition();
        this._distance = this._endPosition - this._startPosition;

        this._anticipationDistance = this._getAnticipationDistance(this._options.anticipationDistance || 0);
        this._anticipationOffsetSize = this._getAnticipationOffsetSize(this._options.anticipationOffsetSize || 0);

        this._updatePosition();
        this._updateMarkers();
        if (this._progressHandler) this._progressHandler(this._progress);
    }

    _setupTouch() {
        this._getBounds();
        this._startOffset = this._getStartOffset();
        this._startPosition = this._getStartPosition();
        this._endPosition = this._getEndPosition();
        this._distance = this._endPosition - this._startPosition;

        this._anticipationDistance = { top: 0, bottom: 0 };
        this._anticipationOffsetSize = { top: 0, bottom: 0 };

        this._createStickyContainerTouch();

        this._watchPositionTouch();
        if (this._progressHandler) this._progressHandler(this._progress);
    }

    _createStickyContainerTouch() {
        const container = document.createElement('div');
        container.classList.add('sticky-element-container');

        container.style.width = `${this._bounds.width}px`;
        container.style.height = `${this._bounds.height}px`;

        container.style.maxWidth = `${this._bounds.width}px`;
        container.style.maxHeight = `${this._bounds.height}px`;

        this._el.style.width = `${this._bounds.width}px`;
        this._el.style.height = `${this._bounds.height}px`;

        this._el.style.maxWidth = `${this._bounds.width}px`;
        this._el.style.maxHeight = `${this._bounds.height}px`;

        const parent = this._el.parentNode;
        this._el.remove();
        container.appendChild(this._el);
        parent.appendChild(container);
    }

    _createMarkers() {
        const markers = [];

        const start = document.createElement('div');
        start.style.position = this._isTouch ? 'absolute' : 'fixed';
        start.style.top = `${this._startPosition}px`;
        start.style.height = '1px';
        start.style.width = '100%';
        start.style.backgroundColor = 'green';
        document.body.appendChild(start);

        const end = document.createElement('div');
        end.style.position = this._isTouch ? 'absolute' : 'fixed';
        end.style.top = `${this._endPosition}px`;
        end.style.height = '1px';
        end.style.width = '100%';
        end.style.backgroundColor = 'red';
        document.body.appendChild(end);

        markers.push(start);
        markers.push(end);

        if (this._isTouch) return;

        const anticipationTop = document.createElement('div');
        anticipationTop.style.position = 'fixed';
        anticipationTop.style.left = 0;
        anticipationTop.style.top = `${this._startPosition - this._anticipationDistance.top}px`;
        anticipationTop.style.height = `${this._anticipationDistance.top}px`;
        anticipationTop.style.width = '10px';
        anticipationTop.style.backgroundColor = 'blue';
        document.body.appendChild(anticipationTop);

        const anticipationBottom = document.createElement('div');
        anticipationBottom.style.position = 'fixed';
        anticipationBottom.style.left = 0;
        anticipationBottom.style.top = `${this._endPosition}px`;
        anticipationBottom.style.height = `${this._anticipationDistance.bottom}px`;
        anticipationBottom.style.width = '10px';
        anticipationBottom.style.backgroundColor = 'purple';
        document.body.appendChild(anticipationBottom);

        markers.push(anticipationTop);
        markers.push(anticipationBottom);

        return markers;
    }

    _destroyMarkers() {
        if (!this._markerElements) return;

        for (let i = 0; i < this._markerElements.length; i++) {
            const marker = this._markerElements[i];
            marker.remove();
        }
    }

    _getBounds() {
        this._width = WindowResizeObserver.width;
        this._height = WindowResizeObserver.height;
        this._bounds = this._el.getBoundingClientRect();
        this._triggerBounds = this._trigger.getBoundingClientRect();
    }

    _getStartOffset() {
        if (typeof this._start === 'number') return this._start;

        if (typeof this._start === 'string' && this._start.includes('%')) return (parseFloat(this._start) / 100) * this._height;
    }

    _getStartPosition() {
        const startPosition = this._triggerBounds.y + this._scrollPosition - this._startOffset;
        return startPosition;
    }

    _getEndPosition() {
        if (typeof this._end === 'number') return this._startPosition + this._end;

        if (typeof this._end === 'string' && this._end.includes('%')) return this._startPosition + (parseFloat(this._end) / 100) * this._triggerBounds.height;

        return (this._startPosition + this._triggerBounds.height) - this._bounds.height - (this._bounds.y - this._triggerBounds.y);
    }

    _getAnticipationDistance(value) {
        if (typeof value === 'number') return { top: value, bottom: value };

        if (typeof value === 'string' && value.includes('%')) return { top: (parseFloat(value) / 100) * this._triggerBounds.height, bottom: (parseFloat(value) / 100) * this._triggerBounds.height };

        if (typeof value === 'object') {
            const distance = { top: 0, bottom: 0 };

            if (typeof value.top === 'number') distance.top = value.top;
            if (typeof value.bottom === 'number') distance.bottom = value.bottom;

            if (typeof value.top === 'string') distance.top = (parseFloat(value.top) / 100) * this._triggerBounds.height;
            if (typeof value.bottom === 'string') distance.bottom = (parseFloat(value.bottom) / 100) * this._triggerBounds.height;

            return distance;
        }
    }

    _getAnticipationOffsetSize(value) {
        if (typeof value === 'number') return { top: value, bottom: value };

        if (typeof value === 'string' && value.includes('%')) return { top: (parseFloat(value) / 100) * this._triggerBounds.height, bottom: (parseFloat(value) / 100) * this._triggerBounds.height };

        if (typeof value === 'object') {
            const offsetSize = { top: 0, bottom: 0 };

            if (typeof value.top === 'number') offsetSize.top = value.top;
            if (typeof value.bottom === 'number') offsetSize.bottom = value.bottom;

            if (typeof value.top === 'string') offsetSize.top = (parseFloat(value.top) / 100) * this._triggerBounds.height;
            if (typeof value.bottom === 'string') offsetSize.bottom = (parseFloat(value.bottom) / 100) * this._triggerBounds.height;

            return offsetSize;
        }
    }

    _updatePosition() {
        const distanceFromStart = this._startPosition - this._scrollPosition;
        const distanceFromEnd = this._endPosition - this._scrollPosition;

        this._progress = math.clamp((-distanceFromStart) / this._distance, 0, 1);
        this._globalProgress = math.clamp(-(distanceFromStart - this._anticipationDistance.top) / (this._distance + this._anticipationDistance.bottom), 0, 1);
        const offsetY = this._progress * this._distance;

        // Anticipation Top
        const anticipationProgressTop = math.clamp(1 - distanceFromStart / this._anticipationDistance.top, 0, 1);
        const easedAnticipationProgressTop = easings.easeInCubic(anticipationProgressTop);
        const anticipationOffsetTop = easedAnticipationProgressTop * this._anticipationOffsetSize.top;

        // Anticipation Bottom
        const anticipationProgressBottom = math.clamp(1 - distanceFromEnd / this._anticipationDistance.bottom, 0, 1);
        const easedAnticipationProgressBottom = easings.easeInCubic(anticipationProgressBottom);
        const anticipationOffsetBottom = easedAnticipationProgressBottom * this._anticipationOffsetSize.bottom;

        this._transformY(this._el, offsetY + anticipationOffsetTop - this._anticipationOffsetSize.top - anticipationOffsetBottom);
    }

    _watchPositionTouch() {
        const distanceFromStart = this._startPosition - this._scrollPosition;
        const distanceFromEnd = this._endPosition - this._scrollPosition;

        const progress = -distanceFromStart / this._distance;
        this._progress = math.clamp(progress, 0, 1);
        const offsetY = this._progress * this._distance;

        if (progress >= 0 && progress < 1) {
            this._stickTouch();
        }

        if (progress >= 1) {
            this._unstickTouch();
        }

        if (progress < 0) {
            this._resetStickTouch();
        }
    }

    _stickTouch() {
        if (this._isStickedTouch) return;
        this._isStickedTouch = true;

        this._el.style.position = 'fixed';
        this._el.style.left = `${this._bounds.x}px`;
        this._el.style.top = `${this._startOffset}px`;
        this._transformY(this._el, 0);
    }

    _unstickTouch() {
        if (!this._isStickedTouch) return;
        this._isStickedTouch = false;

        this._el.style.position = 'relative';
        this._el.style.left = 'auto';
        this._el.style.top = 'auto';
        this._transformY(this._el, this._distance);
    }

    _resetStickTouch() {
        if (!this._isStickedTouch) return;
        this._isStickedTouch = false;

        this._el.style.position = 'relative';
        this._el.style.left = 'auto';
        this._el.style.top = 'auto';
        this._transformY(this._el, 0);
    }

    _updateMarkers() {
        if (!this._markerElements) return;

        for (let i = 0; i < this._markerElements.length; i++) {
            const marker = this._markerElements[i];
            this._transformY(marker, -this._scrollPosition);
        }
    }

    _bindAll() {
        this._scrollHandler = this._scrollHandler.bind(this);
        this._resizeHandler = this._resizeHandler.bind(this);
    }

    _setupEventListeners() {
        ScrollManager.addEventListener('scroll', this._scrollHandler);
        WindowResizeObserver.addEventListener('resize', this._resizeHandler);
    }

    _removeEventListeners() {
        ScrollManager.removeEventListener('scroll', this._scrollHandler);
        WindowResizeObserver.removeEventListener('resize', this._resizeHandler);
    }

    _scrollHandler() {
        this._scrollPosition = ScrollManager.position;

        if (!this._isTouch) {
            this._updatePosition();
            this._updateMarkers();
        } else {
            this._watchPositionTouch();
        }

        if (this._progressHandler) this._progressHandler({ progress: this._progress, globalProgress: this._globalProgress });
    }

    _resizeHandler() {
        this._resetTransform(this._el);

        if (this._isTouch) this._resetStickTouch();

        if (!this._isTouch) this._setup();
        else this._setupTouch();
    }

    /**
     * Utils
     */
    _transformY(el, y, is3d = true) {
        const transform = is3d ? `translate3d(0px, ${y}px, 0px)` : `translate(0px, ${y}px)`;
        el.style.transform = transform;
    }

    _resetTransform(el) {
        el.style.transform = null;
    }
}

export default Sticky;
