'use client';

import { Badge } from '@/components/ui/badge';
import { PLATFORM_FEATURES } from '@/lib/constants';
import { motion } from 'framer-motion';

const fadeInUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, delay: i * 0.08 }
	})
};

export function PlatformFeatures() {
	return (
		<section id="platform" className="py-24 px-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-12 text-center">
					<Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
						Platform
					</Badge>
					<h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
						Everything you need to ship
					</h2>
					<p className="mx-auto max-w-lg text-sm text-muted-foreground md:text-base">
						A full deployment platform built around your workflow. Some features are live — more shipping soon.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{PLATFORM_FEATURES.map((feature, i) => {
						const Icon = feature.icon;
						const isLive = feature.status === 'live';
						return (
							<motion.div
								key={feature.id}
								custom={i}
								variants={fadeInUp}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-60px' }}
								className={`group relative flex flex-col gap-3 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
									isLive
										? 'border-primary/30 bg-primary/3 hover:border-primary/50 hover:shadow-md hover:shadow-primary/8'
										: 'border-border bg-card hover:border-border/80 hover:shadow-sm'
								}`}
							>
								{/* Status badge */}
								<div className="flex items-center justify-between">
									<div
										className={`flex size-9 items-center justify-center rounded-lg ${
											isLive ? 'bg-primary/15' : 'bg-muted'
										}`}
									>
										<Icon
											className={`size-4.5 ${isLive ? 'text-primary' : 'text-muted-foreground'}`}
											aria-hidden="true"
										/>
									</div>
									{isLive ? (
										<Badge
											variant="outline"
											className="text-xs border-primary/25 bg-primary/8 text-primary font-medium"
										>
											Live
										</Badge>
									) : (
										<Badge variant="secondary" className="text-xs font-medium">
											Coming soon
										</Badge>
									)}
								</div>

								{/* Content */}
								<div>
									<h3 className="mb-1.5 text-sm font-semibold text-foreground">{feature.title}</h3>
									<p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
