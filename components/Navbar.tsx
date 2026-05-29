'use client';

import { GithubStar } from '@/components/GithubStar';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { NAVBAR_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';

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
					{NAVBAR_LINKS.map((link) => (
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
					<Link href="/auth/login" id="nav-login" className="hidden md:inline-flex">
						<Button size="sm" variant="outline" className="gap-1.5">
							<LogIn className="size-3.5" />
							Log in
						</Button>
					</Link>
					<Link href="/auth/signup" id="nav-signup" className="hidden md:inline-flex">
						<Button size="sm" className="gap-1.5">
							<UserPlus className="size-3.5" />
							Sign up
						</Button>
					</Link>
				</div>
			</nav>
		</header>
	);
}
