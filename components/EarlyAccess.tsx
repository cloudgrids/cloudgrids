'use client';

import { Button } from '@/components/ui/button';
import { EARLY_ACCESS_FORM_URL } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const perks = [
	'Free *.cloudgrids.tech subdomain',
	'Early deployer badge on your profile',
	'Direct input into the platform roadmap',
	'Priority access when GitHub import ships'
];

export function EarlyAccess() {
	return (
		<section id="early-access" className="py-24 px-4 relative overflow-hidden">
			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,oklch(0.5_0.2_230/7%),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,oklch(0.72_0.18_220/9%),transparent)]" />
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

			<div className="relative mx-auto max-w-3xl text-center">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary"
				>
					<span className="relative flex size-1.5">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
						<span className="relative inline-flex rounded-full size-1.5 bg-primary" />
					</span>
					Pre-launch · Accepting early signups
				</motion.div>

				{/* Headline */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.45, delay: 0.1 }}
					className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
				>
					Be the first to deploy on <span className="text-primary">CloudGrids</span>
				</motion.h2>

				{/* Sub-headline */}
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.18 }}
					className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground md:text-base leading-relaxed"
				>
					We are building the deployment layer for the next generation of developers. Sign up for early access and shape
					the platform from the ground up.
				</motion.p>

				{/* Perks */}
				<motion.ul
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.26 }}
					className="mb-10 inline-flex flex-col gap-2.5 text-left"
				>
					{perks.map((perk) => (
						<li key={perk} className="flex items-center gap-2.5 text-sm text-muted-foreground">
							<CheckCircle className="size-4 shrink-0 text-primary" />
							{perk}
						</li>
					))}
				</motion.ul>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.34 }}
					className="flex flex-col items-center gap-3"
				>
					<a href={EARLY_ACCESS_FORM_URL} target="_blank" rel="noopener noreferrer">
						<Button id="early-access-cta" size="lg" className="gap-2 px-8 shadow-lg shadow-primary/25 text-base">
							Request Early Access
							<ArrowRight className="size-4" />
						</Button>
					</a>
					<p className="text-xs text-muted-foreground">No credit card required · Takes 30 seconds</p>
				</motion.div>

				{/* Bottom note */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.5 }}
					className="mt-14 pt-8 border-t border-border"
				>
					<p className="text-xs text-muted-foreground">
						Already building something?{' '}
						<a
							href="mailto:support@cloudgrids.tech"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Email us directly
						</a>{' '}
						and we will get you set up manually while the platform is in development.
					</p>
				</motion.div>
			</div>
		</section>
	);
}
