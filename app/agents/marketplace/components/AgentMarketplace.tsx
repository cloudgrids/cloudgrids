'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Bot, ChartBar, Globe, MessageCircle, Search, TrendingUp, Zap } from 'lucide-react';

const MARKETPLACE_AGENTS = [
	{ id: 'hn-scraper', name: 'HN Daily Digest', type: 'Research', icon: Globe, desc: 'Scrapes Hacker News top stories daily and sends a summary to your email or Slack.', tags: ['scraping', 'research', 'notifications'], deployments: 842, rating: 4.8 },
	{ id: 'price-monitor', name: 'Price Monitor', type: 'Automation', icon: TrendingUp, desc: 'Monitors product prices on Amazon/eBay and alerts when targets are met.', tags: ['e-commerce', 'scraping', 'alerts'], deployments: 1240, rating: 4.9 },
	{ id: 'discord-mod', name: 'Discord Moderator', type: 'Bot', icon: MessageCircle, desc: 'AI-powered Discord mod bot with spam detection, rule enforcement, and welcome messages.', tags: ['discord', 'moderation', 'bot'], deployments: 643, rating: 4.7 },
	{ id: 'seo-audit', name: 'SEO Auditor', type: 'Research', icon: Search, desc: 'Crawls your website and generates detailed SEO audit reports with actionable recommendations.', tags: ['seo', 'research', 'reporting'], deployments: 381, rating: 4.6 },
	{ id: 'github-tracker', name: 'GitHub Tracker', type: 'Research', icon: ChartBar, desc: 'Monitors GitHub repos for stars, issues, and PRs — sends weekly reports.', tags: ['github', 'analytics', 'notifications'], deployments: 527, rating: 4.7 },
	{ id: 'trading-bot', name: 'Crypto Watcher', type: 'Trading', icon: TrendingUp, desc: 'Monitors crypto prices and sends configurable alerts based on your thresholds.', tags: ['crypto', 'alerts', 'trading'], deployments: 293, rating: 4.5 }
];

const TYPES = ['All', 'Research', 'Automation', 'Bot', 'Trading'];

export function AgentMarketplace() {
	const [typeFilter, setTypeFilter] = useState('All');

	const filtered = typeFilter === 'All' ? MARKETPLACE_AGENTS : MARKETPLACE_AGENTS.filter((a) => a.type === typeFilter);

	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>Agent Marketplace</h1><p className='text-sm text-muted-foreground'>Pre-built autonomous agents — deploy in one click</p></div>

			<Tabs value={typeFilter} onValueChange={setTypeFilter}>
				<TabsList className='mb-6'>{TYPES.map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>
				<TabsContent value={typeFilter}>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{filtered.map((agent) => {
							const Icon = agent.icon;
							return (
								<Card key={agent.id} className='flex flex-col gap-0 py-0 overflow-hidden border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'>
									<CardHeader className='p-5 pb-3'>
										<div className='flex items-center gap-2.5 mb-2'>
											<div className='flex size-9 items-center justify-center rounded-lg bg-primary/10'><Icon className='size-4 text-primary' /></div>
											<Badge variant='secondary' className='text-xs'>{agent.type}</Badge>
										</div>
										<CardTitle className='text-sm'>{agent.name}</CardTitle>
										<CardDescription className='text-xs'>{agent.desc}</CardDescription>
									</CardHeader>
									<CardContent className='p-5 pt-0 flex flex-col gap-3'>
										<div className='flex flex-wrap gap-1.5'>{agent.tags.map((t) => <Badge key={t} variant='outline' className='text-xs'>{t}</Badge>)}</div>
										<div className='flex items-center justify-between text-xs text-muted-foreground'><span>⭐ {agent.rating} · {agent.deployments.toLocaleString()} deploys</span></div>
										<div className='flex gap-2'>
											<Button size='sm' className='flex-1' id={`deploy-${agent.id}`}><Zap className='size-3.5' />Deploy</Button>
											<Button size='sm' variant='outline' id={`view-${agent.id}`}><Bot className='size-3.5' /></Button>
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
