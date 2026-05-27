'use client';

import { GithubStar } from '@/components/GithubStar';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'How it works', href: '#how-it-works' },
	{ label: 'Open Source', href: '#open-source' }
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const scrollTo = (href: string) => {
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-50 transition-all duration-300',
				scrolled
					? 'border-b border-border bg-background/90 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/60'
					: 'bg-transparent'
			)}
		>
			<nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex items-center gap-2.5 group" aria-label="CloudGrids home">
					<Logo width={28} height={28} className="transition-transform duration-200 group-hover:scale-110" />
					<span className="text-base font-bold tracking-tight text-foreground">CloudGrids</span>
				</Link>

				<div className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<button
							key={link.label}
							id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
							onClick={() => scrollTo(link.href)}
							className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						>
							{link.label}
						</button>
					))}
				</div>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<GithubStar />
					<Button
						size="sm"
						id="nav-get-subdomain"
						onClick={() => scrollTo('#how-it-works')}
						className="hidden md:inline-flex"
					>
						Get a subdomain
					</Button>
				</div>
			</nav>
		</header>
	);
}
