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

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 1500);
	};

	return (
		<AuthCard
			title="Welcome back"
			description="Sign in to your CloudGrids account"
			footer={
				<>
					Don&apos;t have an account?{' '}
					<Link href="/auth/signup" className="font-medium text-primary underline-offset-4 hover:underline">
						Sign up free
					</Link>
				</>
			}
		>
			{/* OAuth buttons */}
			<div className="grid grid-cols-2 gap-2 mb-5">
				<Button id="login-google" variant="outline" className="w-full gap-2" type="button">
					<GoogleIcon />
					Google
				</Button>
				<Button id="login-github" variant="outline" className="w-full gap-2" type="button">
					<GitBranch className="size-4" />
					GitHub
				</Button>
			</div>

			<div className="relative mb-5">
				<Separator />
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
					or continue with email
				</span>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="login-email">Email</Label>
					<Input
						id="login-email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<div className="flex items-center justify-between">
						<Label htmlFor="login-password">Password</Label>
						<Link
							href="/auth/forgot-password"
							className="text-xs text-primary underline-offset-4 hover:underline"
						>
							Forgot password?
						</Link>
					</div>
					<div className="relative">
						<Input
							id="login-password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="current-password"
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

				<label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground select-none">
					<input
						type="checkbox"
						id="login-remember"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
						className="size-3.5 rounded accent-primary"
					/>
					Remember me for 30 days
				</label>

				<Button id="login-submit" type="submit" className="w-full gap-2 mt-1" disabled={isLoading}>
					{isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
					{isLoading ? 'Signing in…' : 'Sign in'}
				</Button>
			</form>

			{/* 2FA note */}
			<p className="mt-4 text-center text-xs text-muted-foreground">
				Using two-factor auth?{' '}
				<Link href="/auth/2fa" className="text-primary underline-offset-4 hover:underline">
					Enter your code
				</Link>
			</p>
		</AuthCard>
	);
}
