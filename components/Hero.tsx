'use client';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { EARLY_ACCESS_FORM_URL } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, GitBranch, Globe, Zap } from 'lucide-react';

const flowSteps = [
	{ icon: GitBranch, label: 'Connect GitHub' },
	{ icon: Zap, label: 'Auto Build' },
	{ icon: Globe, label: 'Go Live' }
];

export function Hero() {
	const scrollTo = (href: string) => {
		document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section
			id="hero"
			className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-14 text-center overflow-hidden"
		>
			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_55%,oklch(0.5_0.2_230/10%),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_55%,oklch(0.72_0.18_220/12%),transparent)]" />
			<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

			<div className="relative z-10 mx-auto max-w-4xl">
				{/* Status badge */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.05 }}
					className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
				>
					<span className="relative flex size-1.5">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
						<span className="relative inline-flex rounded-full size-1.5 bg-primary" />
					</span>
					Early Access — Be the first to deploy
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
					className="mb-5 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl"
				>
					Deploy your applications{' '}
					<span className="text-primary">from GitHub</span>
				</motion.h1>

				{/* Sub-headline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.3 }}
					className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed"
				>
					Cloud deployment platform built for developers, indie hackers, and AI builders.
					Connect your repository and go live on{' '}
					<span className="font-medium text-foreground">*.cloudgrids.tech</span> in minutes.
				</motion.p>

				{/* Animated flow indicator */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.38 }}
					className="mb-10 flex items-center justify-center gap-1.5 flex-wrap"
				>
					{flowSteps.map((step, i) => {
						const Icon = step.icon;
						return (
							<div key={step.label} className="flex items-center gap-1.5">
								<span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground">
									<Icon className="size-3.5 text-primary" />
									{step.label}
								</span>
								{i < flowSteps.length - 1 && (
									<ChevronRight className="size-3.5 text-muted-foreground/50 shrink-0" />
								)}
							</div>
						);
					})}
				</motion.div>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.48 }}
					className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
				>
					<a href={EARLY_ACCESS_FORM_URL} target="_blank" rel="noopener noreferrer">
						<Button id="hero-cta-primary" size="lg" className="gap-2 shadow-lg shadow-primary/20">
							Request Early Access
							<ArrowRight className="size-4" />
						</Button>
					</a>
					<Button
						id="hero-cta-secondary"
						size="lg"
						variant="outline"
						onClick={() => scrollTo('#how-it-works')}
					>
						See how it works
					</Button>
				</motion.div>

				{/* No CC note */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.7 }}
					className="mt-4 text-xs text-muted-foreground"
				>
					No credit card required · Free subdomain included
				</motion.p>
			</div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1.1 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
			>
				<div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
			</motion.div>
		</section>
	);
}
