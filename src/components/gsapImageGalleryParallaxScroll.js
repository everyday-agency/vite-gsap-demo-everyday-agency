import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function gsapImageGalleryParallaxScroll() {
    console.log('gsapImageGalleryParallaxScroll function called');
    gsap.registerPlugin(ScrollTrigger);

    const gsapImageGalleryContainer = document.querySelector(
        '[data-gsap-image-gallery]',
    );

    if (!gsapImageGalleryContainer) return;

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: gsapImageGalleryContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0,
            markers: true,
            invalidateOnRefresh: true,
        },
    });

    timeline.to(gsapImageGalleryContainer.querySelectorAll('[data-speed]'), {
        y: (i, el) =>
            (1 - parseFloat(el.getAttribute('data-speed'))) *
            gsapImageGalleryContainer.offsetHeight,
        ease: 'none',
        stagger: {
            amount: 0.1,
        },
    });
}
