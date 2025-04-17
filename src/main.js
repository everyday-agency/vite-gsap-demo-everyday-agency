import './style.css';

import { gsapContainerColorChange } from './components/gsapContainerColorChange';

import { gsapImageGalleryParallaxScroll } from './components/gsapImageGalleryParallaxScroll';

document.addEventListener('DOMContentLoaded', () => {
    gsapContainerColorChange();
    gsapImageGalleryParallaxScroll();
});
