'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Code2, Database, GitBranch, Globe, Layout, Sparkles, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';

const MOCK_TEMPLATES = [
	{
		id: 'nextjs-mongo',
		name: 'Next.js + MongoDB',
		description: 'Full-stack Next.js app with MongoDB, authentication, and API routes pre-configured.',
		icon: Layout,
		tags: ['Next.js', 'MongoDB', 'TypeScript'],
		category: 'web',
		stars: 312
	},
	{
		id: 'nextjs-stripe',
		name: 'Next.js + Stripe',
		description: 'SaaS starter with Stripe subscriptions, billing portal, and webhook handling.',
		icon: Layout,
		tags: ['Next.js', 'Stripe', 'PostgreSQL'],
		category: 'web',
		stars: 487
	},
	{
		id: 'discord-bot',
		name: 'Discord Bot',
		description: 'Production-ready Discord bot with slash commands, event handlers, and database.',
		icon: Bot,
		tags: ['discord.js', 'TypeScript', 'Docker'],
		category: 'bot',
		stars: 201
	},
	{
		id: 'fastapi',
		name: 'FastAPI Starter',
		description: 'Python FastAPI with JWT auth, PostgreSQL, Alembic migrations, and Docker.',
		icon: Code2,
		tags: ['Python', 'FastAPI', 'PostgreSQL'],
		category: 'api',
		stars: 178
	},
	{
		id: 'ai-chatbot',
		name: 'AI Chatbot',
		description: 'Streaming AI chatbot with OpenAI, chat history, rate limiting, and cost tracking.',
		icon: Sparkles,
		tags: ['Next.js', 'OpenAI', 'Vercel AI'],
		category: 'ai',
		stars: 623
	},
	{
		id: 'go-api',
		name: 'Go REST API',
		description: 'Clean Go REST API with Chi router, PostgreSQL, Redis caching, and Docker compose.',
		icon: Database,
		tags: ['Go', 'PostgreSQL', 'Redis'],
		category: 'api',
		stars: 144
	},
	{
		id: 'nestjs-api',
		name: 'NestJS API',
		description: 'Enterprise-grade NestJS API with JWT, Swagger, rate limiting, and TypeORM.',
		icon: GitBranch,
		tags: ['NestJS', 'TypeScript', 'PostgreSQL'],
		category: 'api',
		stars: 267
	},
	{
		id: 'ai-agent',
		name: 'AI Agent',
		description: 'Autonomous AI agent with tool use, memory, scheduling, and deployment hooks.',
		icon: Zap,
		tags: ['TypeScript', 'OpenAI', 'LangChain'],
		category: 'ai',
		stars: 389
	},
	{
		id: 'portfolio',
		name: 'Portfolio Site',
		description: 'Minimal Next.js portfolio with MDX blog, dark mode, and fast performance.',
		icon: Globe,
		tags: ['Next.js', 'MDX', 'Tailwind'],
		category: 'web',
		stars: 156
	}
];

const CATEGORY_TABS = ['All', 'web', 'bot', 'api', 'ai'] as const;

export function TemplateGrid() {
	const [activeCategory, setActiveCategory] = useState<string>('All');

	const filtered = useMemo(() => {
		if (activeCategory === 'All') return MOCK_TEMPLATES;
		return MOCK_TEMPLATES.filter((t) => t.category === activeCategory);
	}, [activeCategory]);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Templates</h1>
				<p className="text-sm text-muted-foreground">One-click starter templates — deploy in seconds</p>
			</div>

			<Tabs value={activeCategory} onValueChange={setActiveCategory}>
				<TabsList className="mb-6">
					{CATEGORY_TABS.map((cat) => (
						<TabsTrigger key={cat} value={cat} className="capitalize">
							{cat === 'All' ? 'All' : cat === 'web' ? 'Web App' : cat === 'bot' ? 'Bot' : cat === 'api' ? 'API' : 'AI'}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent value={activeCategory}>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{filtered.map((t) => {
							const Icon = t.icon;
							return (
								<Card
									key={t.id}
									className="group flex flex-col gap-0 py-0 overflow-hidden border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
								>
									<CardHeader className="p-5 pb-3">
										<div className="flex items-center justify-between mb-2">
											<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
												<Icon className="size-4 text-primary" />
											</div>
											<span className="text-xs text-muted-foreground">⭐ {t.stars}</span>
										</div>
										<CardTitle className="text-sm">{t.name}</CardTitle>
										<CardDescription className="text-xs leading-relaxed">{t.description}</CardDescription>
									</CardHeader>
									<CardContent className="flex flex-col gap-3 p-5 pt-0">
										<div className="flex flex-wrap gap-1.5">
											{t.tags.map((tag) => (
												<Badge key={tag} variant="secondary" className="text-xs">
													{tag}
												</Badge>
											))}
										</div>
										<div className="flex gap-2 mt-auto">
											<Button size="sm" id={`template-deploy-${t.id}`} className="flex-1">
												<Zap className="size-3.5" />
												Deploy
											</Button>
											<Button size="sm" variant="outline" id={`template-view-${t.id}`}>
												View
											</Button>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
