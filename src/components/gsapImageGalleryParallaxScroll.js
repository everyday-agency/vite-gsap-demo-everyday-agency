import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function gsapImageGalleryParallaxScroll() {
    console.log('gsapImageGalleryParallaxScroll function called');
    gsap.registerPlugin(ScrollTrigger);

    const gsapImageGalleryContainer = document.querySelector(
        '[data-gsap-image-gallery]',
    );

    const gsapHeadlineScale = document.querySelector('[data-headline-scale]');

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

    timeline
        .to(gsapImageGalleryContainer.querySelectorAll('[data-speed]'), {
            y: (i, el) =>
                (1 - parseFloat(el.getAttribute('data-speed'))) *
                gsapImageGalleryContainer.offsetHeight,
            ease: 'none',
            stagger: {
                amount: 0.1,
            },
        })
        .to(gsapHeadlineScale, {
            scrollTrigger: {
                trigger: gsapHeadlineScale,
                start: 'top bottom',
                end: 'center center',
                scrub: true,
                markers: true,
            },
            scale: 2,
            y: -200,
        });
}
