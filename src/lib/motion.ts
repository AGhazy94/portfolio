import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Web fonts change line heights, so trigger positions are measured again once they load.
document.fonts.ready.then(() => ScrollTrigger.refresh());

export { gsap, ScrollTrigger };
