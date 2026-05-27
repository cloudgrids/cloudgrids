'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { GitBranch, Globe, Mail } from 'lucide-react';

const steps = [
	{
		step: '01',
		icon: GitBranch,
		title: 'Build your project',
		description:
			'Create anything — a website, an app, a tool, a library. Any tech stack is welcome. All we ask is that it be open source.'
	},
	{
		step: '02',
		icon: Mail,
		title: 'Transfer your repo',
		description:
			"To get a subdomain, transfer your project's GitHub repository to the @cloudgrids organization. You retain admin access! Open a GitHub issue or email us to coordinate."
	},
	{
		step: '03',
		icon: Globe,
		title: 'Ship it',
		description:
			"We'll set up the subdomain and point it to your deployment. Your project goes live on *.cloudgrids.tech — for free!"
	}
];

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
						Get your own <span className="text-primary">*.cloudgrids.tech</span>
					</h2>
					<p className="mx-auto max-w-lg text-sm text-muted-foreground md:text-base">
						Three simple steps to get your project hosted under the CloudGrids umbrella.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{steps.map((s, i) => {
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

								{i < steps.length - 1 && (
									<div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border md:block" />
								)}
							</motion.div>
						);
					})}
				</div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="mt-10 text-center text-sm text-muted-foreground"
				>
					Ready?{' '}
					<a
						href="https://github.com/cloudgrids"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-primary underline-offset-4 hover:underline"
					>
						Open a GitHub issue
					</a>{' '}
					or email{' '}
					<a
						href="mailto:support@cloudgrids.tech"
						className="font-medium text-primary underline-offset-4 hover:underline"
					>
						support@cloudgrids.tech
					</a>
				</motion.p>
			</div>
		</section>
	);
}
