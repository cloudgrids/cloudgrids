'use client';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const badges = ['Open Source · MIT License', 'Free subdomains', 'Built by devs, for devs'];

export function Hero() {
	const scrollTo = (href: string) => {
		document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section
			id="hero"
			className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-14 text-center"
		>
			{/* Subtle background radial */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,oklch(0.5_0.2_230/8%),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,oklch(0.72_0.18_220/10%),transparent)]" />

			<div className="relative z-10 mx-auto max-w-4xl">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.05 }}
					className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
				>
					<Sparkles className="size-3.5" aria-hidden="true" />
					Open Source · MIT License
				</motion.div>

				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="mb-8 flex justify-center"
				>
					<Logo width={96} height={96} className="drop-shadow-xl" />
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.2 }}
					className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl"
				>
					Ship your project on <span className="text-primary">*.cloudgrids.tech</span>
				</motion.h1>

				{/* Sub-headline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.3 }}
					className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg"
				>
					CloudGrids is an open-source organisation that builds developer tools and lets builders host their projects
					under our subdomain — for free.
				</motion.p>

				{/* Feature badges */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.4 }}
					className="mb-10 flex flex-wrap justify-center gap-2"
				>
					{badges.map((badge, i) => (
						<span
							key={i}
							id={`hero-badge-${i}`}
							className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
						>
							{badge}
						</span>
					))}
				</motion.div>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.5 }}
					className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
				>
					<Button id="hero-cta-primary" size="lg" onClick={() => scrollTo('#how-it-works')} className="gap-2">
						Get your subdomain
						<ArrowRight className="size-4" />
					</Button>
					<Button id="hero-cta-secondary" size="lg" variant="outline" onClick={() => scrollTo('#projects')}>
						View projects
					</Button>
				</motion.div>
			</div>

			{/* Scroll hint */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
			>
				<div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
			</motion.div>
		</section>
	);
}
