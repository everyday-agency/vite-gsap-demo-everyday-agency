import './style.css';

import { gsapContainerColorChange } from './components/gsapContainerColorChange';

import { gsapImageGalleryParallaxScroll } from './components/gsapImageGalleryParallaxScroll';

import { gsapVerticalScroll } from './components/gsapVerticalScroll';

document.addEventListener('DOMContentLoaded', () => {
    gsapContainerColorChange();
    gsapImageGalleryParallaxScroll();
    gsapVerticalScroll();
});
