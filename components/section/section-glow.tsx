import { cn } from '@/lib/utils';

interface SectionGlowProps {
	/** Shape of the glow ellipse: 'wide' for Hero (70% wide), 'balanced' for EarlyAccess (60%). */
	variant?: 'wide' | 'balanced';
	className?: string;
}

/**
 * Decorative radial-gradient glow overlay.
 * Drop inside a `relative overflow-hidden` container and it will fill the bounds.
 *
 * @example
 * <section className="relative overflow-hidden">
 *   <SectionGlow variant="wide" />
 *   ...content
 * </section>
 */
export function SectionGlow({ variant = 'balanced', className }: SectionGlowProps) {
	const lightGradient =
		variant === 'wide'
			? 'bg-[radial-gradient(ellipse_70%_50%_at_50%_55%,oklch(0.5_0.2_230/10%),transparent)]'
			: 'bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,oklch(0.5_0.2_230/7%),transparent)]';

	const darkGradient =
		variant === 'wide'
			? 'dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_55%,oklch(0.72_0.18_220/12%),transparent)]'
			: 'dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,oklch(0.72_0.18_220/9%),transparent)]';

	return (
		<>
			<div
				className={cn(
					'pointer-events-none absolute inset-0',
					lightGradient,
					darkGradient,
					className
				)}
			/>
			{variant === 'balanced' && (
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
			)}
		</>
	);
}
