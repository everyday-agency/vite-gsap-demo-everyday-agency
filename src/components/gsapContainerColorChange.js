import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function gsapContainerColorChange() {
    gsap.registerPlugin(ScrollTrigger);

    console.log('gsapContainerColorChange function called');

    const gsapContainer = document.querySelector('.gsap-container');
    const gsapHeadlineAnimation = document.querySelector('[data-h1-animation]');

    // Set initial background color (optional, for smoother transition)
    gsap.set(gsapContainer, { backgroundColor: 'red' });

    // Timeline for background color scroll animation
    gsap.timeline({
        scrollTrigger: {
            trigger: gsapContainer,
            start: 'top center',
            end: 'top top',
            scrub: true,
            // markers: true,
        },
    }).to(
        gsapContainer,
        {
            backgroundColor: 'black',
            ease: 'power1.inOut',
            duration: 1,
        },
        5,
    );

    // Scroll-triggered animation for <h1>
    gsap.to(gsapHeadlineAnimation, {
        scrollTrigger: {
            trigger: gsapHeadlineAnimation,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            // markers: true,
        },
        scale: 10,
        y: -200,
        ease: 'none',
    });
}
