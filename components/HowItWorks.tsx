'use client';

import { Badge } from '@/components/ui/badge';
import { STEPS } from '@/lib/constants';
import { motion } from 'framer-motion';

const fadeInUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: i * 0.15 }
	})
};

export function HowItWorks() {
	return (
		<section id="how-it-works" className="py-24 px-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-12 text-center">
					<Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
						How it works
					</Badge>
					<h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
						From GitHub to live in{' '}<span className="text-primary">minutes</span>
					</h2>
					<p className="mx-auto max-w-lg text-sm text-muted-foreground md:text-base">
						Three steps from your repository to a live deployment on *.cloudgrids.tech.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{STEPS.map((s, i) => {
						const Icon = s.icon;
						return (
							<motion.div
								key={s.step}
								custom={i}
								variants={fadeInUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-60px' }}
								className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md dark:hover:shadow-primary/5"
							>
								<div className="flex items-center justify-between">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Icon className="size-5 text-primary" aria-hidden="true" />
									</div>
									<span className="font-mono text-4xl font-extrabold text-border transition-colors group-hover:text-primary/20">
										{s.step}
									</span>
								</div>

								<div>
									<h3 className="mb-2 text-sm font-bold text-foreground">{s.title}</h3>
									<p className="text-xs leading-relaxed text-muted-foreground">{s.description}</p>
								</div>

								{i < STEPS.length - 1 && (
									<div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border md:block" />
								)}
							</motion.div>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="mt-10 text-center text-sm text-muted-foreground"
				>
					Ready to deploy?{' '}
					<a
						href="#early-access"
						onClick={(e) => { e.preventDefault(); document.querySelector('#early-access')?.scrollIntoView({ behavior: 'smooth' }); }}
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
			</div>
		</section>
	);
}
