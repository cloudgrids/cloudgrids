'use client';

import { SectionHeader } from '@/components/section/section-header';
import { SectionWrapper } from '@/components/section/section-wrapper';
import { FeatureCard } from '@/components/ui/feature-card';
import { STEPS } from '@/lib/constants';
import { fadeIn } from '@/lib/motion';
import { motion } from 'framer-motion';

export function HowItWorks() {
	return (
		<SectionWrapper id="how-it-works">
			<SectionHeader
				badge="How it works"
				title={
					<>
						From GitHub to live in{' '}
						<span className="text-primary">minutes</span>
					</>
				}
				description="Three steps from your repository to a live deployment on *.cloudgrids.tech."
			/>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{STEPS.map((s, i) => (
					<div key={s.step} className="relative">
						<FeatureCard
							icon={s.icon}
							title={s.title}
							description={s.description}
							stepNumber={s.step}
							index={i}
						/>
						{i < STEPS.length - 1 && (
							<div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border md:block" />
						)}
					</div>
				))}
			</div>

			<motion.div
				custom={0.5}
				variants={fadeIn}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="mt-10 text-center text-sm text-muted-foreground"
			>
				Ready to deploy?{' '}
				<a
					href="#early-access"
					onClick={(e) => {
						e.preventDefault();
						document.querySelector('#early-access')?.scrollIntoView({ behavior: 'smooth' });
					}}
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					Request early access
				</a>{' '}
				or email{' '}
				<a
					href="mailto:support@cloudgrids.tech"
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					support@cloudgrids.tech
				</a>
			</motion.div>
		</SectionWrapper>
	);
}
