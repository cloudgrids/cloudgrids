'use client';

import { SectionHeader } from '@/components/section/section-header';
import { SectionWrapper } from '@/components/section/section-wrapper';
import { Button } from '@/components/ui/button';
import { StatRow } from '@/components/ui/stat-row';
import { EARLY_ACCESS_FORM_URL, STATS } from '@/lib/constants';
import { fadeIn } from '@/lib/motion';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

export function OpenSource() {
	return (
		<SectionWrapper id="open-source">
			<div className="overflow-hidden rounded-2xl border border-border bg-card">
				<div className="grid grid-cols-1 md:grid-cols-2">
					{/* Left: text + CTAs */}
					<div className="flex flex-col justify-center gap-6 p-8 md:p-12">
						<motion.div
							custom={0}
							variants={fadeIn}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<SectionHeader
								badge="Open Source"
								title="Built in the open, shipping for real"
								description="CloudGrids is fully MIT-licensed and developed in public. Read the code, audit the infrastructure decisions, fork it, and contribute back. Transparency is core to how we build."
								className="mb-0 text-left"
							/>
						</motion.div>

						<motion.div
							custom={0.15}
							variants={fadeIn}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
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

					{/* Right: stats panel */}
					<div className="flex flex-col justify-center gap-4 border-t border-border bg-muted/30 p-8 md:border-l md:border-t-0 md:p-12">
						{STATS.map((stat, i) => (
							<StatRow
								key={stat.label}
								icon={stat.icon}
								value={stat.value}
								label={stat.label}
								index={i}
							/>
						))}
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
}
