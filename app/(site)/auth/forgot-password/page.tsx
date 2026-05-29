'use client';

import { AuthCard } from '@/components/ui/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [email, setEmail] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setSent(true);
		}, 1500);
	};

	return (
		<AuthCard
			title="Reset your password"
			description="We'll send you a link to reset your password"
			footer={
				<>
					Remember it?{' '}
					<Link href="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
						Back to sign in
					</Link>
				</>
			}
		>
			{sent ? (
				/* ── Success state ── */
				<div className="flex flex-col items-center gap-4 py-4 text-center">
					<div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
						<CheckCircle className="size-7 text-primary" />
					</div>
					<div>
						<p className="font-semibold text-foreground">Check your inbox</p>
						<p className="mt-1 text-sm text-muted-foreground">
							We sent a reset link to{' '}
							<span className="font-medium text-foreground">{email}</span>.
							It expires in 15 minutes.
						</p>
					</div>
					<Button
						id="forgot-resend"
						variant="outline"
						className="mt-2 w-full gap-2"
						onClick={() => setSent(false)}
					>
						<Mail className="size-4" />
						Send again
					</Button>
				</div>
			) : (
				/* ── Form state ── */
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="forgot-email">Email address</Label>
						<Input
							id="forgot-email"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<p className="text-xs text-muted-foreground">
						Enter the email associated with your account and we&apos;ll email you a link to reset your
						password.
					</p>

					<Button
						id="forgot-submit"
						type="submit"
						className="w-full gap-2 mt-1"
						disabled={isLoading}
					>
						{isLoading ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
						{isLoading ? 'Sending…' : 'Send reset link'}
					</Button>
				</form>
			)}
		</AuthCard>
	);
}
