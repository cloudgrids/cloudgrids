'use client';

import { AuthCard } from '@/components/ui/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, GitBranch, Loader2 } from 'lucide-react';

function GoogleIcon() {
	return (
		<svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
			<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
			<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
			<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
			<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
		</svg>
	);
}
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [agreed, setAgreed] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 1500);
	};

	return (
		<AuthCard
			title="Create your account"
			description="Start deploying from GitHub in minutes"
			footer={
				<>
					Already have an account?{' '}
					<Link href="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
						Sign in
					</Link>
				</>
			}
		>
			{/* OAuth buttons */}
			<div className="grid grid-cols-2 gap-2 mb-5">
				<Button id="signup-google" variant="outline" className="w-full gap-2" type="button">
					<GoogleIcon />
					Google
				</Button>
				<Button id="signup-github" variant="outline" className="w-full gap-2" type="button">
					<GitBranch className="size-4" />
					GitHub
				</Button>
			</div>

			<div className="relative mb-5">
				<Separator />
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
					or sign up with email
				</span>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="signup-firstname">First name</Label>
						<Input id="signup-firstname" type="text" placeholder="Jane" autoComplete="given-name" required />
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="signup-lastname">Last name</Label>
						<Input id="signup-lastname" type="text" placeholder="Doe" autoComplete="family-name" />
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="signup-email">Email</Label>
					<Input id="signup-email" type="email" placeholder="you@example.com" autoComplete="email" required />
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="signup-password">Password</Label>
					<div className="relative">
						<Input
							id="signup-password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Min. 8 characters"
							autoComplete="new-password"
							minLength={8}
							required
							className="pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((v) => !v)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
						</button>
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="signup-confirm">Confirm password</Label>
					<div className="relative">
						<Input
							id="signup-confirm"
							type={showConfirm ? 'text' : 'password'}
							placeholder="Re-enter password"
							autoComplete="new-password"
							required
							className="pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowConfirm((v) => !v)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							aria-label={showConfirm ? 'Hide password' : 'Show password'}
						>
							{showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
						</button>
					</div>
				</div>

				<label className="flex cursor-pointer items-start gap-2 text-sm text-muted-foreground select-none">
					<input
						type="checkbox"
						id="signup-terms"
						checked={agreed}
						onChange={(e) => setAgreed(e.target.checked)}
						className="mt-0.5 size-3.5 rounded accent-primary"
						required
					/>
					<span>
						I agree to the{' '}
						<Link href="/legal" className="text-primary underline-offset-4 hover:underline">
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
							Privacy Policy
						</Link>
					</span>
				</label>

				<Button id="signup-submit" type="submit" className="w-full gap-2 mt-1" disabled={isLoading || !agreed}>
					{isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
					{isLoading ? 'Creating account…' : 'Create account'}
				</Button>
			</form>
		</AuthCard>
	);
}
