'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Clock, Cpu, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STATS = [
	{ label: 'Requests Today', value: '8,421', icon: Zap },
	{ label: 'Monthly Requests', value: '247K', icon: TrendingUp },
	{ label: 'Credits Remaining', value: '52,430', icon: Cpu },
	{ label: 'Avg Response', value: '142ms', icon: Clock }
];

const RECENT_CALLS = [
	{ endpoint: '/extract/article', status: 200, time: '98ms', ts: '2m ago' },
	{ endpoint: '/extract/video', status: 200, time: '211ms', ts: '5m ago' },
	{ endpoint: '/extract/product', status: 200, time: '134ms', ts: '12m ago' },
	{ endpoint: '/bulk/extract', status: 429, time: '—', ts: '20m ago' },
	{ endpoint: '/extract/seo', status: 200, time: '167ms', ts: '1h ago' },
	{ endpoint: '/extract/profile', status: 500, time: '—', ts: '2h ago' }
];

const STATUS_STYLES: Record<number, string> = {
	200: 'bg-green-500/10 text-green-600 dark:text-green-400',
	429: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	500: 'bg-red-500/10 text-red-500'
};

export function MetadataHome() {
	const [tab, setTab] = useState('overview');

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight">Metadata API</h1>
					<p className="mt-1 text-sm text-muted-foreground">Structured web data extraction as an API</p>
				</div>
				<Link
					href="/metadata/playground"
					id="metadata-playground-btn"
					className={cn(buttonVariants({ variant: 'default' }), '')}
				>
					Try Playground <ArrowUpRight className="size-4" />
				</Link>
			</div>

			<div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
				{STATS.map((s) => {
					const Icon = s.icon;
					return (
						<Card key={s.label}>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<p className="text-xs text-muted-foreground">{s.label}</p>
									<Icon className="size-4 text-muted-foreground" />
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold">{s.value}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<Tabs value={tab} onValueChange={setTab}>
				<TabsList className="mb-6">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="calls">Recent Calls</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{[
							{ label: 'API Playground', desc: 'Test extractions in real-time', href: '/metadata/playground' },
							{ label: 'Endpoints', desc: 'Browse all 7 API endpoints', href: '/metadata/endpoints' }
						].map((card) => (
							<Link key={card.label} href={card.href}>
								<Card className="cursor-pointer hover:border-primary/40 transition-all duration-200 hover:-translate-y-1">
									<CardHeader>
										<CardTitle className="text-sm">{card.label}</CardTitle>
										<p className="text-xs text-muted-foreground">{card.desc}</p>
									</CardHeader>
								</Card>
							</Link>
						))}
					</div>
				</TabsContent>
				<TabsContent value="calls">
					<Card>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Endpoint</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>When</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{RECENT_CALLS.map((c, i) => (
										<TableRow key={i}>
											<TableCell className="font-mono text-xs">{c.endpoint}</TableCell>
											<TableCell>
												<Badge variant="outline" className={`text-xs ${STATUS_STYLES[c.status] ?? ''}`}>
													{c.status}
												</Badge>
											</TableCell>
											<TableCell className="text-xs text-muted-foreground">{c.time}</TableCell>
											<TableCell className="text-xs text-muted-foreground">{c.ts}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
