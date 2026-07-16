'use client';

import { EarlyAccess } from '@/components/EarlyAccess';
import { Logo } from '@/components/Logo';
import { OpenSource } from '@/components/OpenSource';
import { SectionGlow } from '@/components/section/section-glow';
import { SectionHeader } from '@/components/section/section-header';
import { SectionWrapper } from '@/components/section/section-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { EARLY_ACCESS_FORM_URL } from '@/lib/constants';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { motion } from 'framer-motion';
import {
	ArrowRight,
	ArrowUpRight,
	Bot,
	Box,
	FileText,
	Image,
	Search,
	Server,
	Sparkles,
	Tag,
	Users
} from 'lucide-react';
import Link from 'next/link';

const PRODUCTS = [
	{
		id: 'hosting',
		icon: Server,
		name: 'Hosting',
		tagline: 'Deploy from GitHub',
		description:
			'Connect your repository and go live on *.cloudgrids.tech in minutes. Automatic builds, subdomain management, logs, and env vars.',
		href: '/hosting',
		status: 'live' as const,
		tags: ['Deployments', 'Subdomains', 'Logs'],
		accent: 'text-blue-500',
		glow: 'hover:border-blue-500/30 hover:shadow-blue-500/5'
	},
	{
		id: 'agents',
		icon: Bot,
		name: 'Agents',
		tagline: 'Deploy AI agents',
		description:
			'Ship autonomous AI agents to production. Marketplace-ready deploys, monitoring, and a managed runtime — all in one place.',
		href: '/agents',
		status: 'coming-soon' as const,
		tags: ['AI Agents', 'Marketplace', 'Runtime'],
		accent: 'text-violet-500',
		glow: 'hover:border-violet-500/30 hover:shadow-violet-500/5'
	},
	{
		id: 'ai-ui',
		icon: Sparkles,
		name: 'AI UI',
		tagline: 'Generate interfaces',
		description:
			'Describe your UI and get production-ready React components instantly. Browse AI-generated designs and ship faster.',
		href: '/ai-ui',
		status: 'coming-soon' as const,
		tags: ['Code Generation', 'React', 'Design'],
		accent: 'text-pink-500',
		glow: 'hover:border-pink-500/30 hover:shadow-pink-500/5'
	},
	{
		id: 'media',
		icon: Image,
		name: 'Media',
		tagline: 'CDN & transforms',
		description:
			'Upload, transform, and serve assets at the edge. Resize, convert, and optimize images and videos with a simple URL API.',
		href: '/media',
		status: 'coming-soon' as const,
		tags: ['CDN', 'Transform', 'Upload'],
		accent: 'text-orange-500',
		glow: 'hover:border-orange-500/30 hover:shadow-orange-500/5'
	},
	{
		id: 'metadata',
		icon: Tag,
		name: 'Metadata',
		tagline: 'SEO & meta endpoints',
		description:
			'Generate Open Graph images, meta tags, and structured data at the edge. Preview how your pages look when shared.',
		href: '/metadata',
		status: 'coming-soon' as const,
		tags: ['SEO', 'Open Graph', 'Edge'],
		accent: 'text-green-500',
		glow: 'hover:border-green-500/30 hover:shadow-green-500/5'
	},
	{
		id: 'scraping',
		icon: Search,
		name: 'Scraping',
		tagline: 'Structured extraction',
		description:
			'Extract structured data from any website. Schedule crawls, export results, and build data pipelines without boilerplate.',
		href: '/scraping',
		status: 'coming-soon' as const,
		tags: ['Crawling', 'Extraction', 'Exports'],
		accent: 'text-cyan-500',
		glow: 'hover:border-cyan-500/30 hover:shadow-cyan-500/5'
	},
	{
		id: 'creator',
		icon: Users,
		name: 'Creator',
		tagline: 'Monetise your content',
		description:
			'Analytics, paywall, and content tools for indie creators. Understand your audience and turn it into revenue.',
		href: '/creator',
		status: 'coming-soon' as const,
		tags: ['Analytics', 'Paywall', 'Content'],
		accent: 'text-yellow-500',
		glow: 'hover:border-yellow-500/30 hover:shadow-yellow-500/5'
	},
	{
		id: 'boilerplates',
		icon: Box,
		name: 'Boilerplates',
		tagline: 'One-click starters',
		description:
			'Production-ready templates for Next.js, FastAPI, Discord bots, AI wrappers, and more. Deploy in seconds.',
		href: '/boilerplates',
		status: 'coming-soon' as const,
		tags: ['Templates', 'Starters', 'One-click'],
		accent: 'text-red-500',
		glow: 'hover:border-red-500/30 hover:shadow-red-500/5'
	},
	{
		id: 'docs',
		icon: FileText,
		name: 'Docs',
		tagline: 'Unified documentation',
		description:
			'API references, deployment guides, and technical resources for the entire CloudGrids ecosystem. Everything in one place.',
		href: '/docs',
		status: 'coming-soon' as const,
		tags: ['API Docs', 'Guides', 'References'],
		accent: 'text-slate-400',
		glow: 'hover:border-slate-400/30 hover:shadow-slate-400/5'
	}
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlatformPage() {
	return (
		<main className="relative min-h-screen">
			{/* ── Hero ── */}
			<section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 pt-14 text-center overflow-hidden">
				<SectionGlow variant="wide" />
				<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 bg-linear-to-b from-transparent via-primary/30 to-transparent" />

				<div className="relative z-10 mx-auto w-full max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.05 }}
						className="mb-6 flex justify-center"
					>
						<StatusBadge>Now in Beta — Start building for free</StatusBadge>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.85 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mb-7 flex justify-center"
					>
						<Logo width={80} height={80} className="drop-shadow-xl" />
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.18 }}
						className="mb-5 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
					>
						The developer platform <span className="text-primary">for everything</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.28 }}
						className="mx-auto mb-10 max-w-xl text-base text-muted-foreground md:text-lg leading-relaxed"
					>
						CloudGrids is an open-source platform for developers, indie hackers, and AI builders — from deployment and
						hosting to AI tools, media, metadata, and more.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.38 }}
						className="flex flex-wrap items-center justify-center gap-3"
					>
						<Link href="/hosting">
							<Button id="hero-cta-hosting" size="lg" className="gap-2 shadow-lg shadow-primary/20">
								<Server className="size-4 shrink-0" />
								Start with Hosting
								<ArrowRight className="size-4 shrink-0" />
							</Button>
						</Link>
						<a href={EARLY_ACCESS_FORM_URL} target="_blank" rel="noopener noreferrer">
							<Button id="hero-cta-access" size="lg" variant="outline">
								Request Early Access
							</Button>
						</a>
					</motion.div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.6 }}
						className="mt-5 text-xs text-muted-foreground"
					>
						Free subdomain included · MIT licensed · No credit card required
					</motion.p>
				</div>

				{/* Scroll hint */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1.1 }}
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
				>
					<span className="text-xs text-muted-foreground/50">Explore the platform</span>
					<div className="h-8 w-px bg-linear-to-b from-border to-transparent" />
				</motion.div>
			</section>

			{/* ── Platform Products ── */}
			<SectionWrapper id="platform">
				<SectionHeader
					badge="Platform"
					title={
						<>
							Everything you need, <span className="text-primary">in one place</span>
						</>
					}
					description="A growing suite of products built for the modern developer stack. Start with what you need today — more shipping every week."
				/>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{PRODUCTS.map((product, i) => {
						const Icon = product.icon;
						const isLive = product.status === 'live';
						return (
							<motion.div
								key={product.id}
								custom={i}
								variants={fadeInUp}
								initial="hidden"
								whileInView="visible"
								viewport={viewportOnce}
							>
								<Link href={product.href} id={`product-card-${product.id}`} className="block h-full">
									<div
										className={`group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${product.glow}`}
									>
										{/* Icon + status badge */}
										<div className="flex items-center justify-between gap-2">
											<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
												<Icon
													className={`size-5 transition-colors ${product.accent} opacity-70 group-hover:opacity-100`}
													aria-hidden="true"
												/>
											</div>
											{isLive ? (
												<Badge
													variant="outline"
													className="text-xs border-primary/25 bg-primary/8 text-primary font-medium"
												>
													Live
												</Badge>
											) : (
												<Badge variant="secondary" className="text-xs font-medium">
													Soon
												</Badge>
											)}
										</div>

										{/* Name + tagline + description */}
										<div className="flex flex-1 flex-col gap-1 min-w-0">
											<div className="flex items-center gap-1.5 min-w-0">
												<h3 className="truncate text-sm font-bold text-foreground">{product.name}</h3>
											</div>
											<p className="text-xs font-semibold text-primary">{product.tagline}</p>
											<p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
												{product.description}
											</p>
										</div>

										{/* Tags */}
										<div className="flex flex-wrap gap-1.5">
											{product.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
												>
													{tag}
												</span>
											))}
										</div>

										{/* Explore hint */}
										<div className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
											<span>Open {product.name}</span>
											<ArrowUpRight className="size-3 shrink-0" />
										</div>
									</div>
								</Link>
							</motion.div>
						);
					})}
				</div>
			</SectionWrapper>

			{/* ── Open Source ── */}
			<OpenSource />

			{/* ── Early Access ── */}
			<EarlyAccess />
		</main>
	);
}
