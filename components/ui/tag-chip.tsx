import { cn } from '@/lib/utils';

interface TagChipProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * Small pill label for tagging technologies, categories, or features.
 * Used in project cards and anywhere you need a compact tag.
 *
 * @example
 * <TagChip>TypeScript</TagChip>
 * <TagChip>Docker</TagChip>
 */
export function TagChip({ children, className }: TagChipProps) {
	return (
		<span
			className={cn(
				'rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground',
				className
			)}
		>
			{children}
		</span>
	);
}
