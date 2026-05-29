'use client';

import { AuthCard } from '@/components/ui/auth-card';
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const DIGITS = 6;

export default function TwoFactorPage() {
	const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(''));
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = (index: number, value: string) => {
		const v = value.replace(/\D/g, '').slice(-1);
		const next = [...digits];
		next[index] = v;
		setDigits(next);
		setError('');
		if (v && index < DIGITS - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !digits[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, DIGITS);
		const next = [...digits];
		pasted.split('').forEach((char, i) => { next[i] = char; });
		setDigits(next);
		inputRefs.current[Math.min(pasted.length, DIGITS - 1)]?.focus();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const code = digits.join('');
		if (code.length < DIGITS) {
			setError('Please enter all 6 digits.');
			return;
		}
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			// Simulate wrong code for demo
			setError('Invalid code. Please try again.');
			setDigits(Array(DIGITS).fill(''));
			inputRefs.current[0]?.focus();
		}, 1500);
	};

	return (
		<AuthCard
			title="Two-factor authentication"
			description="Enter the 6-digit code from your authenticator app"
			footer={
				<>
					<Link href="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
						← Back to sign in
					</Link>
				</>
			}
		>
			<form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
				{/* Icon */}
				<div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
					<ShieldCheck className="size-7 text-primary" />
				</div>

				{/* OTP digit boxes */}
				<div className="flex gap-2.5" onPaste={handlePaste}>
					{digits.map((digit, i) => (
						<input
							key={i}
							ref={(el) => { inputRefs.current[i] = el; }}
							id={`otp-digit-${i}`}
							type="text"
							inputMode="numeric"
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(i, e.target.value)}
							onKeyDown={(e) => handleKeyDown(i, e)}
							className={`
								h-13 w-11 rounded-xl border text-center text-lg font-bold tracking-widest
								bg-background text-foreground transition-all duration-150 outline-none
								focus:border-primary focus:ring-2 focus:ring-primary/30
								${error ? 'border-destructive shake' : 'border-border'}
							`}
							aria-label={`Digit ${i + 1}`}
						/>
					))}
				</div>

				{/* Error */}
				{error && (
					<p className="text-sm text-destructive text-center -mt-2">{error}</p>
				)}

				<Button
					id="2fa-submit"
					type="submit"
					className="w-full gap-2"
					disabled={isLoading}
				>
					{isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
					{isLoading ? 'Verifying…' : 'Verify code'}
				</Button>

				{/* Resend */}
				<div className="text-center text-sm text-muted-foreground">
					<p>Didn&apos;t receive a code?</p>
					<button
						id="2fa-resend"
						type="button"
						className="mt-1 inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
					>
						<RotateCcw className="size-3.5" />
						Resend code
					</button>
				</div>
			</form>
		</AuthCard>
	);
}
