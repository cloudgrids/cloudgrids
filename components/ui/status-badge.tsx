import { cn } from '@/lib/utils';

/**
 * Pulsing dot indicator used inside status/announcement badge pills.
 * Renders a ping-animated outer ring + solid inner dot.
 */
export function PulsingDot({ className }: { className?: string }) {
	return (
		<span className={cn('relative flex size-1.5', className)}>
			<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
			<span className="relative inline-flex rounded-full size-1.5 bg-primary" />
		</span>
	);
}

interface StatusBadgeProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * Pill badge with a pulsing dot indicator — used to signal live/pre-launch status.
 *
 * @example
 * <StatusBadge>Early Access — Be the first to deploy</StatusBadge>
 * <StatusBadge>Pre-launch · Accepting early signups</StatusBadge>
 */
export function StatusBadge({ children, className }: StatusBadgeProps) {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary',
				className
			)}
		>
			<PulsingDot />
			{children}
		</div>
	);
}
