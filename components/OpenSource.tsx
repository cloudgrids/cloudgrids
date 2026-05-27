'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EARLY_ACCESS_FORM_URL, STATS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

export function OpenSource() {
	return (
		<section id="open-source" className="py-24 px-4">
			<div className="mx-auto max-w-6xl">
				<div className="overflow-hidden rounded-2xl border border-border bg-card">
					<div className="grid grid-cols-1 md:grid-cols-2">
						<div className="flex flex-col justify-center gap-6 p-8 md:p-12">
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4 }}
							>
								<Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
									Open Source
								</Badge>
								<h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
									Built in the open, shipping for real
								</h2>
								<p className="text-sm text-muted-foreground md:text-base leading-relaxed">
									CloudGrids is fully MIT-licensed and developed in public. Read the code, audit the infrastructure
									decisions, fork it, and contribute back. Transparency is core to how we build.
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.15 }}
								className="flex flex-wrap gap-3"
							>
								<Button
									id="open-source-github-cta"
									nativeButton={false}
									render={<a href="https://github.com/cloudgrids" target="_blank" rel="noopener noreferrer" />}
									className="gap-2"
								>
									<GitBranch className="size-4" />
									View on GitHub
								</Button>
								<Button
									id="open-source-early-access-cta"
									variant="outline"
									nativeButton={false}
									render={<a href={EARLY_ACCESS_FORM_URL} target="_blank" rel="noopener noreferrer" />}
								>
									Request Early Access
								</Button>
							</motion.div>
						</div>

						<div className="flex flex-col justify-center gap-4 border-t border-border bg-muted/30 p-8 md:border-l md:border-t-0 md:p-12">
							{STATS.map((stat, i) => {
								const Icon = stat.icon;
								return (
									<motion.div
										key={stat.label}
										initial={{ opacity: 0, x: 16 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: i * 0.1 }}
										className="flex items-center gap-4"
									>
										<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
											<Icon className="size-5 text-primary" aria-hidden="true" />
										</div>
										<div>
											<p className="text-lg font-bold text-foreground">{stat.value}</p>
											<p className="text-xs text-muted-foreground">{stat.label}</p>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
