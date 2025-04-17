// https://codepen.io/BrianCross/pen/PoWapLP -> Original
// https://codepen.io/GreenSock/pen/XWzRraJ -> GSAP Copy

import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function gsapObserver() {
    console.log('gsapObserver function called');
    gsap.registerPlugin(Observer, ScrollTrigger);

    const container = document.querySelector('[data-gsap-observer-container]');
    console.log(container);
    if (!container) return;

    ScrollTrigger.create({
        trigger: container,
        // start: 'top top',
        // end: () => `+=${container.offsetHeight}`, // pin for full height
        start: 'top center',
        end: 'top center',
        pin: true,
        scrub: false,
        markers: true, // turn on if you want to debug
        // once: true,
        onEnter: () => initObserver(container),
    });
}

function initObserver(container) {
    const sections = container.querySelectorAll('[data-section-observer]');
    const bgContainers = gsap.utils.toArray(container.querySelectorAll('[data-gsap-observer-bg]'));
    const outerContainers = gsap.utils.toArray(container.querySelectorAll('[data-gsap-observer-outer-container]'));
    const innerContainers = gsap.utils.toArray(container.querySelectorAll('[data-gsap-observer-inner-container]'));

    let currentIndex = -1;
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating = false;

    gsap.set(outerContainers, { yPercent: 100 });
    gsap.set(innerContainers, { yPercent: -100 });

    function goToSection(index, direction) {
        console.log('goToSection');
        index = wrap(index);
        animating = true;
        console.log('goToSection', index, direction);

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' },
            onComplete: () => {
                animating = false;
                currentIndex = index;
            },
        });

        if (currentIndex >= 0) {
            gsap.set(sections[currentIndex], { zIndex: 0 });
            tl.to(bgContainers[currentIndex], {
                yPercent: -15 * dFactor,
            }).set(sections[currentIndex], { autoAlpha: 0 });
        }

        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo(
            [outerContainers[index], innerContainers[index]],
            {
                yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
            },
            {
                yPercent: 0,
            },
            0,
        ).fromTo(bgContainers[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
    }

    Observer.create({
        target: container,
        type: 'wheel,touch,pointer',
        wheelSpeed: -1,
        onDown: () => !animating && goToSection(currentIndex - 1, -1),
        onUp: () => !animating && goToSection(currentIndex + 1, 1),
        tolerance: 10,
        preventDefault: true,
    });

    goToSection(0, 1);
}
