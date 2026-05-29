'use client';

import { IconBox } from '@/components/ui/icon-box';
import { slideInRight } from '@/lib/motion';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatRowProps {
	icon: LucideIcon;
	value: React.ReactNode;
	label: string;
	/** Stagger animation index. */
	index?: number;
}

/**
 * Horizontally-laid stat item: icon box → bold value → muted label.
 * Used in the OpenSource section stats panel.
 *
 * @example
 * <StatRow icon={Star} value="MIT" label="Licensed" index={0} />
 * <StatRow icon={GitBranch} value="100%" label="Open source" index={1} />
 */
export function StatRow({ icon, value, label, index = 0 }: StatRowProps) {
	return (
		<motion.div
			custom={index}
			variants={slideInRight}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			className="flex items-center gap-4"
		>
			<IconBox icon={icon} size="lg" variant="primary" className="shrink-0" />
			<div>
				<p className="text-lg font-bold text-foreground">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		</motion.div>
	);
}
