import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
	/** HTML id attribute for anchor links. */
	id?: string;
	/** Override or extend the section className. */
	className?: string;
	/** Override or extend the inner container className. */
	containerClassName?: string;
	/** Max-width variant for the inner container (default: max-w-6xl). */
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
}

const maxWidthMap: Record<NonNullable<SectionWrapperProps['maxWidth']>, string> = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	xl: 'max-w-xl',
	'2xl': 'max-w-2xl',
	'3xl': 'max-w-3xl',
	'4xl': 'max-w-4xl',
	'5xl': 'max-w-5xl',
	'6xl': 'max-w-6xl'
};

/**
 * Standard section shell used across every landing-page section.
 * Handles `py-24 px-4` padding and the `mx-auto max-w-6xl` container.
 *
 * @example
 * <SectionWrapper id="how-it-works">
 *   <SectionHeader ... />
 *   ...
 * </SectionWrapper>
 */
export function SectionWrapper({
	id,
	className,
	containerClassName,
	maxWidth = '6xl',
	children,
	...rest
}: SectionWrapperProps) {
	return (
		<section id={id} className={cn('py-24 px-4', className)} {...rest}>
			<div className={cn('mx-auto', maxWidthMap[maxWidth], containerClassName)}>
				{children}
			</div>
		</section>
	);
}
