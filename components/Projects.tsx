'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_PROJECTS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: i * 0.1 }
	})
};

export function Projects() {
	return (
		<section id="projects" className="py-24 px-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-12 text-center">
					<Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
						Ecosystem
					</Badge>
					<h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
						The CloudGrids ecosystem
					</h2>
					<p className="mx-auto max-w-lg text-sm text-muted-foreground md:text-base">
						A growing suite of open-source tools, packages, and platform products — all under one roof.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{ALL_PROJECTS.map((project, i) => {
						const Icon = project.icon;
						return (
							<motion.div
								key={project.id}
								custom={i}
								variants={fadeInUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-60px' }}
							>
								<Card className="group h-full border-border bg-card py-2 gap-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:hover:shadow-primary/5">
									<CardHeader className="pb-2">
										<CardTitle className="flex items-start justify-between gap-2 text-sm text-foreground">
											<div className="flex items-center gap-2">
												<Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
												<span className="font-semibold">{project.name}</span>
											</div>
											{project.status === 'coming-soon' ? (
												<Badge variant="secondary" className="text-xs shrink-0">
													Soon
												</Badge>
											) : (
												<Badge variant="outline" className="text-xs shrink-0 border-primary/20 text-primary">
													Live
												</Badge>
											)}
										</CardTitle>
									</CardHeader>
									<CardContent className="flex flex-col gap-4 pb-5">
										<CardDescription className="text-xs leading-relaxed text-muted-foreground">
											{project.description}
										</CardDescription>

										<div className="flex flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
												>
													{tag}
												</span>
											))}
										</div>

										{project.links.length > 0 && (
											<div className="mt-auto flex gap-3">
												{project.links.map((link) => (
													<Link
														key={link.label}
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														id={`project-${project.id}-${link.label.toLowerCase()}`}
														className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
													>
														{link.label}
														<ArrowUpRight className="size-3" />
													</Link>
												))}
											</div>
										)}
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
