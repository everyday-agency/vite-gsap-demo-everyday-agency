import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function gsapVerticalScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector('[data-gsap-vertical-scroll]');

    if (!container) return;

    verticalScroll(container);
}

function verticalScroll(container) {
    gsap.registerPlugin(ScrollTrigger);

    // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
    let allowScroll = true;

    // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
    let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause();

    let currentIndex = 0;
    // let swipePanels = gsap.utils.toArray('.swipe-section .panel');
    let swipePanels = gsap.utils.toArray('[data-gspa-vertical-scroll-panel]');

    // set z-index levels for the swipe panels
    gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

    // create an observer and disable it to start
    let intentObserver = ScrollTrigger.observe({
        type: 'wheel,touch, pointer, scroll',
        onUp: () => allowScroll && gotoPanel(currentIndex - 1, false, container),
        onDown: () => allowScroll && gotoPanel(currentIndex + 1, true, container),
        tolerance: 10,
        preventDefault: true,
        onEnable(self) {
            allowScroll = false;

            // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
            scrollTimeout.restart(true);

            let savedScroll = self.scrollY();

            // if the native scroll repositions, force it back to where it should be
            self._restoreScroll = () => self.scrollY(savedScroll);

            document.addEventListener('scroll', self._restoreScroll, { passive: false });
        },
        onDisable: (self) => document.removeEventListener('scroll', self._restoreScroll),
    });
    intentObserver.disable();

    // handle the panel swipe animations
    function gotoPanel(index, isScrollingDown, container) {
        // return to normal scroll if we're at the end or back up to the start
        if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
            // resume native scroll
            intentObserver.disable();
            return;
        }
        allowScroll = false;
        scrollTimeout.restart(true);

        let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
        gsap.to(target, {
            yPercent: isScrollingDown ? -100 : 0,
            duration: 0.75,
        });

        currentIndex = index;
    }

    // pin swipe section and initiate observer
    ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: 'top top',

        // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end
        end: '+=200',

        onEnter: (self) => {
            // in case the native scroll jumped past the end and then we force it back to where it should be.
            if (intentObserver.isEnabled) {
                return;
            }

            // jump to just one pixel past the start of this section so we can hold there.
            self.scroll(self.start + 1);

            // STOP native scrolling
            intentObserver.enable();
        },
        onEnterBack: (self) => {
            // in case the native scroll jumped backward past the start and then we force it back to where it should be.
            if (intentObserver.isEnabled) {
                return;
            }
            // jump to one pixel before the end of this section so we can hold there.
            self.scroll(self.end - 1);

            // STOP native scrolling
            intentObserver.enable();
        },
    });
}
