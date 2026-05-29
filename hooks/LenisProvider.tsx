'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);
	const pathname = usePathname();

	// Initialise Lenis once
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			touchMultiplier: 2,
			infinite: false
		});

		lenisRef.current = lenis;

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	// Reset scroll to top on every route change
	useEffect(() => {
		const lenis = lenisRef.current;
		if (!lenis) return;
		lenis.stop();
		lenis.scrollTo(0, { immediate: true });
		lenis.start();
	}, [pathname]);

	return <>{children}</>;
}
