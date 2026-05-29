'use client';

import { GithubStar } from '@/components/GithubStar';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
	Bot,
	Box,
	ChevronDown,
	FileText,
	Image,
	LogIn,
	Menu,
	Search,
	Server,
	Sparkles,
	Tag,
	UserPlus,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// ─── Products list (shared between desktop dropdown + mobile sheet) ────────────

const PRODUCTS = [
	{
		id: 'hosting',
		icon: Server,
		name: 'Hosting',
		tagline: 'Deploy from GitHub',
		href: '/hosting',
		live: true,
		accent: 'text-blue-500 bg-blue-500/10',
	},
	{
		id: 'agents',
		icon: Bot,
		name: 'Agents',
		tagline: 'Deploy AI agents',
		href: '/agents',
		live: false,
		accent: 'text-violet-500 bg-violet-500/10',
	},
	{
		id: 'ai-ui',
		icon: Sparkles,
		name: 'AI UI',
		tagline: 'Generate interfaces',
		href: '/ai-ui',
		live: false,
		accent: 'text-pink-500 bg-pink-500/10',
	},
	{
		id: 'media',
		icon: Image,
		name: 'Media',
		tagline: 'CDN & transforms',
		href: '/media',
		live: false,
		accent: 'text-orange-500 bg-orange-500/10',
	},
	{
		id: 'metadata',
		icon: Tag,
		name: 'Metadata',
		tagline: 'SEO & meta endpoints',
		href: '/metadata',
		live: false,
		accent: 'text-green-500 bg-green-500/10',
	},
	{
		id: 'scraping',
		icon: Search,
		name: 'Scraping',
		tagline: 'Structured extraction',
		href: '/scraping',
		live: false,
		accent: 'text-cyan-500 bg-cyan-500/10',
	},
	{
		id: 'creator',
		icon: Users,
		name: 'Creator',
		tagline: 'Monetise content',
		href: '/creator',
		live: false,
		accent: 'text-yellow-500 bg-yellow-500/10',
	},
	{
		id: 'boilerplates',
		icon: Box,
		name: 'Boilerplates',
		tagline: 'One-click starters',
		href: '/boilerplates',
		live: false,
		accent: 'text-red-500 bg-red-500/10',
	},
	{
		id: 'docs',
		icon: FileText,
		name: 'Docs',
		tagline: 'Unified documentation',
		href: '/docs',
		live: false,
		accent: 'text-slate-400 bg-slate-400/10',
	},
];

const TOP_LINKS = [
	{ label: 'Hosting', href: '/hosting' },
	{ label: 'Docs', href: '/docs' },
	{ label: 'Boilerplates', href: '/boilerplates' },
];

// ─── Component ────────────────────────────────────────────────────────────────

	export function AppNavbar() {
	const [scrolled, setScrolled] = useState(false);
	const [productsOpen, setProductsOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-50 transition-all duration-300',
				scrolled
					? 'border-b border-border bg-background/90 shadow-sm backdrop-blur-md'
					: 'border-b border-border/40 bg-background/70 backdrop-blur-sm'
			)}
		>
			<nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">

				{/* ── Logo ── */}
				<Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="CloudGrids home">
					<Logo width={28} height={28} className="transition-transform duration-200 group-hover:scale-110" />
					<span className="hidden text-sm font-bold tracking-tight text-foreground sm:block">CloudGrids</span>
				</Link>

				{/* ── Desktop centre nav ── */}
				<div className="hidden items-center gap-0.5 lg:flex">
					{/* Top-level links */}
					{TOP_LINKS.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							id={`appnav-${link.label.toLowerCase()}`}
							className={cn(
								'rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground',
								pathname === link.href || pathname.startsWith(link.href + '/')
									? 'font-medium text-foreground'
									: 'text-muted-foreground'
							)}
						>
							{link.label}
						</Link>
					))}

					{/* Products dropdown */}
					<DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
						<DropdownMenuTrigger
							id="appnav-products-trigger"
							className={cn(
								'inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground focus:outline-none',
								productsOpen ? 'bg-muted text-foreground' : 'text-muted-foreground'
							)}
						>
							Products
							<ChevronDown
								className={cn('size-3.5 transition-transform duration-200', productsOpen && 'rotate-180')}
							/>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							align="center"
							sideOffset={8}
							className="!w-[560px] p-4"
						>
							{/* Header */}
							<div className="mb-3 flex items-center justify-between border-b border-border pb-3">
								<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Platform Products
								</p>
								<Badge variant="secondary" className="text-xs">
									{PRODUCTS.filter((p) => p.live).length} live · {PRODUCTS.filter((p) => !p.live).length} coming
								</Badge>
							</div>

							{/* Product grid */}
							<div className="grid grid-cols-3 gap-1">
								{PRODUCTS.map((product) => {
									const Icon = product.icon;
									return (
										<Link
											key={product.id}
											href={product.href}
											id={`appnav-product-${product.id}`}
											onClick={() => setProductsOpen(false)}
											className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-muted"
										>
											<div className={cn('mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md', product.accent.split(' ')[1])}>
												<Icon className={cn('size-3.5', product.accent.split(' ')[0])} />
											</div>
											<div className="min-w-0">
												<div className="flex items-center gap-1.5">
													<span className="text-xs font-semibold text-foreground">{product.name}</span>
													{product.live && (
														<span className="rounded-full bg-primary/10 px-1.5 py-px text-[10px] font-medium text-primary">
															Live
														</span>
													)}
												</div>
												<p className="mt-0.5 truncate text-[11px] text-muted-foreground">{product.tagline}</p>
											</div>
										</Link>
									);
								})}
							</div>

							{/* Footer CTA */}
							<div className="mt-3 border-t border-border pt-3">
								<Link
									href="/"
									onClick={() => setProductsOpen(false)}
									className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
								>
									View all products on the platform →
								</Link>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* ── Right slot ── */}
				<div className="flex items-center gap-1.5">
					<ThemeToggle />
					<GithubStar />

					{/* Auth buttons – desktop */}
					<Link href="/auth/login" id="appnav-login" className="hidden md:inline-flex">
						<Button size="sm" variant="ghost" className="gap-1.5">
							<LogIn className="size-3.5" />
							Log in
						</Button>
					</Link>
					<Link href="/auth/signup" id="appnav-signup" className="hidden md:inline-flex">
						<Button size="sm" className="gap-1.5">
							<UserPlus className="size-3.5" />
							Sign up
						</Button>
					</Link>

					{/* Mobile hamburger */}
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger
							id="appnav-mobile-menu"
							render={
								<Button
									size="icon-sm"
									variant="ghost"
									className="lg:hidden"
									aria-label="Open menu"
								/>
							}
						>
							<Menu className="size-4" />
						</SheetTrigger>

						<SheetContent side="right" className="w-80 overflow-y-auto p-0">
							<SheetHeader className="border-b border-border px-4 py-3">
								<SheetTitle className="flex items-center gap-2">
									<Logo width={22} height={22} />
									<span className="text-sm font-bold">CloudGrids</span>
								</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-5 p-4">
								{/* Quick links */}
								<div>
									<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										Navigation
									</p>
									<div className="flex flex-col gap-0.5">
										{TOP_LINKS.map((link) => (
											<Link
												key={link.label}
												href={link.href}
												onClick={() => setMobileOpen(false)}
												className={cn(
													'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
													pathname === link.href ? 'font-medium text-foreground' : 'text-muted-foreground'
												)}
											>
												{link.label}
											</Link>
										))}
									</div>
								</div>

								{/* Platform products */}
								<div>
									<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										Platform
									</p>
									<div className="flex flex-col gap-0.5">
										{PRODUCTS.map((product) => {
											const Icon = product.icon;
											return (
												<Link
													key={product.id}
													href={product.href}
													id={`appnav-mobile-${product.id}`}
													onClick={() => setMobileOpen(false)}
													className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-muted"
												>
													<div className={cn('flex size-7 items-center justify-center rounded-md', product.accent.split(' ')[1])}>
														<Icon className={cn('size-3.5', product.accent.split(' ')[0])} />
													</div>
													<div className="min-w-0 flex-1">
														<div className="flex items-center gap-2">
															<span className="text-sm font-medium text-foreground">{product.name}</span>
															{product.live && (
																<span className="rounded-full bg-primary/10 px-1.5 py-px text-[10px] font-medium text-primary">
																	Live
																</span>
															)}
														</div>
														<p className="text-xs text-muted-foreground">{product.tagline}</p>
													</div>
												</Link>
											);
										})}
									</div>
								</div>

								{/* Auth buttons */}
								<div className="flex flex-col gap-2 border-t border-border pt-4">
									<Link href="/auth/login" onClick={() => setMobileOpen(false)}>
										<Button id="appnav-mobile-login" variant="outline" className="w-full gap-2">
											<LogIn className="size-4" />
											Log in
										</Button>
									</Link>
									<Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
										<Button id="appnav-mobile-signup" className="w-full gap-2">
											<UserPlus className="size-4" />
											Sign up free
										</Button>
									</Link>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
