'use client';

import { Badge } from '@/components/ui/badge';
import { IconBox } from '@/components/ui/icon-box';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { viewportOnce } from '@/lib/motion';

type FeatureStatus = 'live' | 'coming-soon';

interface FeatureCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	/** Animation stagger index (passed as framer-motion `custom`). */
	index?: number;
	/** When provided, renders a step number in the top-right corner (HowItWorks style). */
	stepNumber?: string | number;
	/** When provided, renders a Live/Coming-soon badge in the top-right corner (PlatformFeatures style). */
	status?: FeatureStatus;
	className?: string;
}

/**
 * Animated feature/step card — handles both HowItWorks steps and PlatformFeatures grid items.
 *
 * - Pass `stepNumber` for the numbered step style (HowItWorks).
 * - Pass `status` for the live/coming-soon badge style (PlatformFeatures).
 * - Both props are optional — the card works as a plain icon card too.
 *
 * @example
 * // Step card
 * <FeatureCard icon={GitBranch} title="Connect GitHub" description="..." stepNumber="01" index={0} />
 *
 * // Feature card with status
 * <FeatureCard icon={Zap} title="Auto Build" description="..." status="live" index={1} />
 */
export function FeatureCard({
	icon,
	title,
	description,
	index = 0,
	stepNumber,
	status,
	className
}: FeatureCardProps) {
	const isLive = status === 'live';

	const cardBase = cn(
		'group relative flex flex-col gap-3 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5',
		status !== undefined
			? isLive
				? 'border-primary/30 bg-primary/3 hover:border-primary/50 hover:shadow-md hover:shadow-primary/8'
				: 'border-border bg-card hover:border-border/80 hover:shadow-sm'
			: 'border-border bg-card hover:-translate-y-1 hover:border-primary/40 hover:shadow-md dark:hover:shadow-primary/5',
		className
	);

	return (
		<motion.div
			custom={index}
			variants={{
				hidden: { opacity: 0, y: 24 },
				visible: (i: number) => ({
					opacity: 1,
					y: 0,
					transition: { duration: 0.4, delay: i * 0.1 }
				})
			}}
			initial="hidden"
			whileInView="visible"
			viewport={viewportOnce}
			className={cardBase}
		>
			{/* Top row: icon box + step number OR status badge */}
			<div className="flex items-center justify-between">
				<IconBox
					icon={icon}
					size={stepNumber !== undefined ? 'lg' : 'md'}
					variant={status === undefined || isLive ? 'primary' : 'muted'}
				/>

				{stepNumber !== undefined && (
					<span className="font-mono text-4xl font-extrabold text-border transition-colors group-hover:text-primary/20">
						{stepNumber}
					</span>
				)}

				{status !== undefined && (
					isLive ? (
						<Badge variant="outline" className="text-xs border-primary/25 bg-primary/8 text-primary font-medium">
							Live
						</Badge>
					) : (
						<Badge variant="secondary" className="text-xs font-medium">
							Coming soon
						</Badge>
					)
				)}
			</div>

			{/* Content */}
			<div>
				<h3 className="mb-1.5 text-sm font-semibold text-foreground">{title}</h3>
				<p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
			</div>
		</motion.div>
	);
}
