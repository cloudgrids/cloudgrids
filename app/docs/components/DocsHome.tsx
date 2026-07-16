'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { BookOpen, Clock, Code2, FileText, Layers, Rocket, Search, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';

const DOC_CATEGORIES = [
	{
		title: 'Getting Started',
		description: 'Deploy your first project in under 5 minutes.',
		icon: Rocket,
		href: '/docs/guides',
		color: 'text-green-500 bg-green-500/10'
	},
	{
		title: 'API Reference',
		description: 'Full REST API docs with request/response examples.',
		icon: Code2,
		href: '/docs/api',
		color: 'text-blue-500 bg-blue-500/10'
	},
	{
		title: 'Deployment Guides',
		description: 'Framework-specific guides for Next.js, Node, Python, Go.',
		icon: Terminal,
		href: '/docs/guides',
		color: 'text-orange-500 bg-orange-500/10'
	},
	{
		title: 'Tutorials',
		description: 'Step-by-step tutorials from beginner to advanced.',
		icon: BookOpen,
		href: '/docs/guides',
		color: 'text-purple-500 bg-purple-500/10'
	},
	{
		title: 'Examples',
		description: 'Open source example projects and use cases.',
		icon: FileText,
		href: '/docs/guides',
		color: 'text-cyan-500 bg-cyan-500/10'
	},
	{
		title: 'SDKs',
		description: 'Official TypeScript, Python, and Go SDK references.',
		icon: Layers,
		href: '/docs/api',
		color: 'text-pink-500 bg-pink-500/10'
	}
];

const RECENTLY_UPDATED = [
	{ title: 'GitHub Deployment Guide', category: 'Guides', updatedDays: 1 },
	{ title: 'POST /deployments', category: 'API Reference', updatedDays: 2 },
	{ title: 'Environment Variables Setup', category: 'Guides', updatedDays: 3 },
	{ title: 'Custom Domains & SSL', category: 'Guides', updatedDays: 5 }
];

const CATEGORY_BADGE_STYLES: Record<string, string> = {
	Guides: 'bg-orange-500/10 text-orange-500',
	'API Reference': 'bg-blue-500/10 text-blue-500',
	SDK: 'bg-pink-500/10 text-pink-500'
};

export function DocsHome() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-10">
			<div className="mb-10 text-center">
				<h1 className="mb-3 text-4xl font-extrabold tracking-tight">Documentation</h1>
				<p className="mb-6 text-muted-foreground">Everything you need to build on CloudGrids.</p>
				<div className="relative mx-auto max-w-lg">
					<Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input className="h-12 pl-11 text-base" placeholder="Search documentation…" />
				</div>
			</div>

			<div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{DOC_CATEGORIES.map((cat) => {
					const Icon = cat.icon;
					return (
						<Link key={cat.title} href={cat.href}>
							<Card className="group h-full cursor-pointer border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
								<CardHeader className="pb-2">
									<div className={`mb-2 flex size-10 items-center justify-center rounded-lg ${cat.color}`}>
										<Icon className="size-5" />
									</div>
									<CardTitle className="text-sm">{cat.title}</CardTitle>
									<CardDescription className="text-xs">{cat.description}</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					);
				})}
			</div>

			<Separator className="mb-8" />

			<div>
				<h2 className="mb-4 text-lg font-bold">Recently Updated</h2>
				<div className="flex flex-col gap-3">
					{RECENTLY_UPDATED.map((doc) => (
						<div
							key={doc.title}
							className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50"
						>
							<div className="flex items-center gap-3">
								<FileText className="size-4 text-muted-foreground" />
								<span className="text-sm font-medium">{doc.title}</span>
								<Badge variant="outline" className={`text-xs ${CATEGORY_BADGE_STYLES[doc.category] ?? ''}`}>
									{doc.category}
								</Badge>
							</div>
							<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
								<Clock className="size-3" />
								{doc.updatedDays === 1 ? 'Yesterday' : `${doc.updatedDays} days ago`}
							</div>
						</div>
					))}
				</div>
				<div className="mt-6 flex gap-3">
					<Link href="/docs/api" className={cn(buttonVariants({ variant: 'default' }), '')}>
						<Code2 className="size-4" />
						API Reference
					</Link>
					<Link href="/docs/guides" className={cn(buttonVariants({ variant: 'outline' }), '')}>
						<Zap className="size-4" />
						Guides
					</Link>
				</div>
			</div>
		</div>
	);
}
