import type { Variants } from 'framer-motion';

/** Fade up with staggered delay — pass `custom={index}` on the motion element. */
export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: i * 0.1 }
	})
};

/** Simple fade-in (no y movement). */
export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: (delay: number = 0) => ({
		opacity: 1,
		transition: { duration: 0.4, delay }
	})
};

/** Slide in from the right — pass `custom={index}` for stagger. */
export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 16 },
	visible: (i: number = 0) => ({
		opacity: 1,
		x: 0,
		transition: { duration: 0.4, delay: i * 0.1 }
	})
};

/** Common viewport options for whileInView triggers. */
export const viewportOnce = { once: true, margin: '-60px' } as const;
