'use client';

import { SectionGlow } from '@/components/section/section-glow';
import { SectionWrapper } from '@/components/section/section-wrapper';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
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
		<SectionWrapper
			id="early-access"
			className="relative overflow-hidden"
			containerClassName="text-center"
			maxWidth="3xl"
		>
			<SectionGlow variant="balanced" />

			<div className="relative">
				{/* Status badge */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="mb-6 flex justify-center"
				>
					<StatusBadge className="px-4 py-1.5 text-xs font-semibold">
						Pre-launch · Accepting early signups
					</StatusBadge>
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
		</SectionWrapper>
	);
}
