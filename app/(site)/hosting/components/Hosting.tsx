'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Activity, ArrowUpRight, Globe, Plus, Server, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STATS = [
	{ label: 'Total Deployments', value: '47', icon: Zap, delta: '+3 today' },
	{ label: 'Active Projects', value: '12', icon: Server, delta: '2 building' },
	{ label: 'Bandwidth', value: '2.4 TB', icon: Globe, delta: '+120 GB today' },
	{ label: 'Uptime', value: '99.8%', icon: Activity, delta: 'Last 30 days' }
];

const RECENT_DEPLOYMENTS = [
	{ project: 'my-portfolio', branch: 'main', status: 'live', subdomain: 'portfolio.cloudgrids.tech', ago: '2m ago' },
	{
		project: 'discord-bot',
		branch: 'feat/slash',
		status: 'building',
		subdomain: 'discord-bot.cloudgrids.tech',
		ago: '5m ago'
	},
	{ project: 'ai-wrapper', branch: 'main', status: 'live', subdomain: 'ai-wrapper.cloudgrids.tech', ago: '1h ago' },
	{ project: 'api-service', branch: 'hotfix', status: 'failed', subdomain: 'api.cloudgrids.tech', ago: '2h ago' },
	{ project: 'next-saas', branch: 'main', status: 'live', subdomain: 'next-saas.cloudgrids.tech', ago: '4h ago' }
];

const ACTIVITY_FEED = [
	{ time: '2m ago', event: 'Deployment started', detail: 'my-portfolio → main', type: 'info' },
	{ time: '5m ago', event: 'Build triggered', detail: 'discord-bot → feat/slash', type: 'info' },
	{ time: '12m ago', event: 'Domain verified', detail: 'mysite.com → SSL active', type: 'success' },
	{ time: '1h ago', event: 'Deployment live', detail: 'ai-wrapper → main', type: 'success' },
	{ time: '2h ago', event: 'Build failed', detail: 'api-service → hotfix (exit 1)', type: 'error' },
	{ time: '3h ago', event: 'Env var added', detail: 'DATABASE_URL added to Production', type: 'info' },
	{ time: '5h ago', event: 'Deployment live', detail: 'next-saas → main', type: 'success' }
];

const STATUS_STYLES: Record<string, string> = {
	live: 'bg-green-500/10 text-green-600 dark:text-green-400',
	building: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	failed: 'bg-red-500/10 text-red-500'
};

const ACTIVITY_STYLES: Record<string, string> = {
	info: 'bg-blue-500/10 text-blue-500',
	success: 'bg-green-500/10 text-green-600 dark:text-green-400',
	error: 'bg-red-500/10 text-red-500'
};

export function Hosting() {
	const [tab, setTab] = useState('overview');

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			{/* Header */}
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-foreground">Hosting</h1>
					<p className="mt-1 text-sm text-muted-foreground">GitHub-connected deployments on *.cloudgrids.tech</p>
				</div>
				<Link
					href="/hosting/deployments"
					id="hosting-new-deploy"
					className={cn(buttonVariants({ variant: 'default' }))}
				>
					<Plus className="size-4" />
					New Deployment
				</Link>
			</div>

			{/* Stats */}
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
								<p className="text-2xl font-bold text-foreground">{s.value}</p>
								<p className="mt-0.5 text-xs text-muted-foreground">{s.delta}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Tabs */}
			<Tabs value={tab} onValueChange={setTab}>
				<TabsList className="mb-6">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="deployments">Deployments</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>

				<TabsContent value="overview">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Recent Deployments</CardTitle>
								<Link href="/hosting/deployments" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
									View all <ArrowUpRight className="size-3.5" />
								</Link>
							</div>
						</CardHeader>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Project</TableHead>
										<TableHead>Branch</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Subdomain</TableHead>
										<TableHead>When</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{RECENT_DEPLOYMENTS.map((d) => (
										<TableRow key={d.project}>
											<TableCell className="font-medium">{d.project}</TableCell>
											<TableCell>
												<code className="text-xs bg-muted px-1.5 py-0.5 rounded">{d.branch}</code>
											</TableCell>
											<TableCell>
												<Badge className={STATUS_STYLES[d.status]} variant="outline">
													{d.status}
												</Badge>
											</TableCell>
											<TableCell className="text-xs text-muted-foreground">{d.subdomain}</TableCell>
											<TableCell className="text-xs text-muted-foreground">{d.ago}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="deployments">
					<Card>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Project</TableHead>
										<TableHead>Branch</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Subdomain</TableHead>
										<TableHead>When</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{RECENT_DEPLOYMENTS.map((d) => (
										<TableRow key={d.project + d.ago}>
											<TableCell className="font-medium">{d.project}</TableCell>
											<TableCell>
												<code className="text-xs bg-muted px-1.5 py-0.5 rounded">{d.branch}</code>
											</TableCell>
											<TableCell>
												<Badge className={STATUS_STYLES[d.status]} variant="outline">
													{d.status}
												</Badge>
											</TableCell>
											<TableCell className="text-xs text-muted-foreground">{d.subdomain}</TableCell>
											<TableCell className="text-xs text-muted-foreground">{d.ago}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<div className="mt-4 flex gap-2">
						<Link href="/hosting/deployments" className={cn(buttonVariants({ variant: 'default' }), '')}>
							<Plus className="size-4" />
							New Deployment
						</Link>
						<Link href="/hosting/logs" className={cn(buttonVariants({ variant: 'outline' }), '')}>
							View Logs
						</Link>
					</div>
				</TabsContent>

				<TabsContent value="activity">
					<Card>
						<CardContent className="p-4">
							<div className="flex flex-col gap-3">
								{ACTIVITY_FEED.map((a, i) => (
									<div key={i} className="flex items-start gap-3">
										<span className="mt-0.5 text-xs text-muted-foreground w-14 shrink-0">{a.time}</span>
										<div>
											<p className="text-sm font-medium text-foreground">{a.event}</p>
											<p className="text-xs text-muted-foreground">{a.detail}</p>
										</div>
										<Badge className={`ml-auto shrink-0 ${ACTIVITY_STYLES[a.type]}`} variant="outline">
											{a.type}
										</Badge>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Quick Links */}
			<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
				{[
					{ label: 'Deployments', href: '/hosting/deployments' },
					{ label: 'Logs', href: '/hosting/logs' },
					{ label: 'Domains', href: '/hosting/domains' },
					{ label: 'Templates', href: '/hosting/templates' },
					{ label: 'Env Vars', href: '/hosting/env' }
				].map((link) => (
					<Link href={link.href} key={link.label} className={cn(buttonVariants({ variant: 'outline' }))}>
						{link.label} <ArrowUpRight className="size-3.5" />
					</Link>
				))}
			</div>
		</div>
	);
}
