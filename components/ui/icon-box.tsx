import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type IconBoxSize = 'sm' | 'md' | 'lg';
type IconBoxVariant = 'primary' | 'muted';

interface IconBoxProps {
	icon: LucideIcon;
	size?: IconBoxSize;
	variant?: IconBoxVariant;
	className?: string;
	/** Passed to the inner svg icon element. */
	iconClassName?: string;
	'aria-hidden'?: boolean | 'true' | 'false';
}

const sizeMap: Record<IconBoxSize, { box: string; icon: string }> = {
	sm: { box: 'size-8', icon: 'size-4' },
	md: { box: 'size-9', icon: 'size-4.5' },
	lg: { box: 'size-10', icon: 'size-5' }
};

const variantMap: Record<IconBoxVariant, { box: string; icon: string }> = {
	primary: { box: 'bg-primary/10', icon: 'text-primary' },
	muted: { box: 'bg-muted', icon: 'text-muted-foreground' }
};

/**
 * Square rounded icon container — the `rounded-lg bg-primary/10` pattern
 * repeated across HowItWorks, PlatformFeatures, and OpenSource.
 *
 * @example
 * <IconBox icon={Zap} size="lg" variant="primary" />
 * <IconBox icon={Globe} size="md" variant="muted" />
 */
export function IconBox({
	icon: Icon,
	size = 'lg',
	variant = 'primary',
	className,
	iconClassName,
	'aria-hidden': ariaHidden = true
}: IconBoxProps) {
	const { box, icon } = { ...sizeMap[size], ...variantMap[variant] };
	return (
		<div
			className={cn('flex shrink-0 items-center justify-center rounded-lg', box, variantMap[variant].box, className)}
		>
			<Icon
				className={cn(sizeMap[size].icon, variantMap[variant].icon, iconClassName)}
				aria-hidden={ariaHidden}
			/>
		</div>
	);
}
