import './style.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gsapContainer = document.querySelector('.gsap-container');

// Set initial background color (optional, for smoother transition)
gsap.set(gsapContainer, { backgroundColor: 'red' });

// Timeline for background color scroll animation
gsap.timeline({
    scrollTrigger: {
        trigger: gsapContainer,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        markers: true,
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
gsap.to('h1', {
    scrollTrigger: {
        trigger: 'h1',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        markers: true,
    },
    scale: 10,
    y: -200,
    ease: 'none',
});
