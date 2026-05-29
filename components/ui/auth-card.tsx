import { Logo } from '@/components/Logo';
import { SectionGlow } from '@/components/section/section-glow';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface AuthCardProps {
	title: string;
	description: string;
	children: ReactNode;
	/** Optional footer content below the card (e.g. "Already have an account? Log in") */
	footer?: ReactNode;
}

/**
 * Centered card shell used by all auth pages.
 * Renders the CloudGrids logo, a heading, description, and the form slot.
 *
 * @example
 * <AuthCard title="Welcome back" description="Sign in to your account">
 *   <LoginForm />
 * </AuthCard>
 */
export function AuthCard({ title, description, children, footer }: AuthCardProps) {
	return (
		<div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16 overflow-hidden">
			<SectionGlow variant="balanced" />

			<div className="relative z-10 w-full max-w-md">
				{/* Logo */}
				<div className="mb-8 flex flex-col items-center gap-3">
					<Link href="/" aria-label="CloudGrids home">
						<Logo width={48} height={48} className="drop-shadow-lg transition-transform hover:scale-105" />
					</Link>
					<div className="text-center">
						<h1 className="text-2xl font-extrabold tracking-tight text-foreground">{title}</h1>
						<p className="mt-1 text-sm text-muted-foreground">{description}</p>
					</div>
				</div>

				{/* Card */}
				<div className="rounded-2xl border border-border bg-card/80 p-7 shadow-xl shadow-black/5 backdrop-blur-sm dark:shadow-black/30">
					{children}
				</div>

				{/* Footer link */}
				{footer && (
					<p className="mt-5 text-center text-sm text-muted-foreground">{footer}</p>
				)}
			</div>
		</div>
	);
}
