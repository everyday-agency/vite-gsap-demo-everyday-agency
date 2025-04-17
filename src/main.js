import './style.css';

import { gsapContainerColorChange } from './components/gsapContainerColorChange';

import { gsapImageGalleryParallaxScroll } from './components/gsapImageGalleryParallaxScroll';

import { gsapObserver } from './components/gsapObserver';

document.addEventListener('DOMContentLoaded', () => {
    gsapContainerColorChange();
    gsapImageGalleryParallaxScroll();
    gsapObserver();
});
