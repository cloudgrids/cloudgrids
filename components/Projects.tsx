'use client';

import { SectionHeader } from '@/components/section/section-header';
import { SectionWrapper } from '@/components/section/section-wrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TagChip } from '@/components/ui/tag-chip';
import { ALL_PROJECTS } from '@/lib/constants';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function Projects() {
	return (
		<SectionWrapper id="projects">
			<SectionHeader
				badge="Ecosystem"
				title="The CloudGrids ecosystem"
				description="A growing suite of open-source tools, packages, and platform products — all under one roof."
			/>

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
							viewport={viewportOnce}
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
											<TagChip key={tag}>{tag}</TagChip>
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
		</SectionWrapper>
	);
}
