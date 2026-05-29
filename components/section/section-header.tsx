'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
	/** Short label shown in the primary-tinted pill badge above the heading. */
	badge: string;
	/** Main heading content. Accepts JSX so you can wrap words in `<span className="text-primary">`. */
	title: ReactNode;
	/** Supporting paragraph below the heading. */
	description?: ReactNode;
	/** Additional className on the wrapper div. */
	className?: string;
}

/**
 * Animated section header: badge → h2 → description paragraph.
 * Used at the top of every marketing section that has a label + heading pair.
 *
 * @example
 * <SectionHeader
 *   badge="Platform"
 *   title={<>Everything you need to <span className="text-primary">ship</span></>}
 *   description="A full deployment platform built around your workflow."
 * />
 */
export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
	return (
		<div className={`mb-12 text-center ${className ?? ''}`}>
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4 }}
			>
				<Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
					{badge}
				</Badge>
			</motion.div>

			<motion.h2
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, delay: 0.08 }}
				className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
			>
				{title}
			</motion.h2>

			{description && (
				<motion.p
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.16 }}
					className="mx-auto max-w-lg text-sm text-muted-foreground md:text-base"
				>
					{description}
				</motion.p>
			)}
		</div>
	);
}
