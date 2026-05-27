'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ArrowUpRight, BarChart2, DollarSign, ShoppingCart, TrendingUp, Upload, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STATS = [
	{ label: 'Total Earnings', value: '$12,840', icon: DollarSign, delta: '+$1,240 this month' },
	{ label: 'Active Subscribers', value: '342', icon: Users, delta: '+28 this week' },
	{ label: 'Total Sales', value: '1,247', icon: ShoppingCart, delta: '+89 today' },
	{ label: 'Conversion Rate', value: '8.4%', icon: TrendingUp, delta: '+0.6% vs last month' }
];

const RECENT_SALES = [
	{ content: 'Prompt Engineering Pack', type: 'prompt', buyer: 'u***@gmail.com', amount: '$9.99', date: '2m ago' },
	{ content: 'AI Art Bundle Vol.3', type: 'image', buyer: 'd***@outlook.com', amount: '$24.99', date: '15m ago' },
	{ content: 'Next.js Course — Advanced', type: 'course', buyer: 'r***@yahoo.com', amount: '$49.99', date: '1h ago' },
	{ content: 'React Snippets Pack', type: 'dataset', buyer: 'k***@proton.me', amount: '$4.99', date: '2h ago' },
	{ content: 'Premium Feed — Monthly', type: 'video', buyer: 'a***@gmail.com', amount: '$19.99', date: '3h ago' }
];

const TYPE_STYLES: Record<string, string> = {
	prompt: 'bg-purple-500/10 text-purple-500',
	image: 'bg-blue-500/10 text-blue-500',
	course: 'bg-orange-500/10 text-orange-500',
	dataset: 'bg-cyan-500/10 text-cyan-500',
	video: 'bg-green-500/10 text-green-600 dark:text-green-400'
};

export function Creator() {
	const [tab, setTab] = useState('overview');

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight">Creator Platform</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Monetize your content — PPV, subscriptions, digital assets
					</p>
				</div>
				<Link href="/creator/content" id="creator-upload" className={cn(buttonVariants({ variant: 'default' }))}>
					<Upload className="size-4" />
					Upload Content
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
								<p className="mt-0.5 text-xs text-muted-foreground">{s.delta}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<Tabs value={tab} onValueChange={setTab}>
				<TabsList className="mb-6">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="content">Content</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
				</TabsList>

				<TabsContent value="overview">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Recent Sales</CardTitle>
								<Link href="/creator/analytics" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '')}>
									View analytics <ArrowUpRight className="size-3.5" />
								</Link>
							</div>
						</CardHeader>
						<CardContent className="p-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Content</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Buyer</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>When</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{RECENT_SALES.map((s, i) => (
										<TableRow key={i}>
											<TableCell className="font-medium text-sm">{s.content}</TableCell>
											<TableCell>
												<Badge variant="outline" className={`text-xs ${TYPE_STYLES[s.type]}`}>
													{s.type}
												</Badge>
											</TableCell>
											<TableCell className="text-xs text-muted-foreground font-mono">{s.buyer}</TableCell>
											<TableCell className="font-medium text-sm">{s.amount}</TableCell>
											<TableCell className="text-xs text-muted-foreground">{s.date}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="content">
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<Upload className="mb-3 size-10 text-muted-foreground" />
						<p className="font-medium">Manage your content</p>
						<p className="text-sm text-muted-foreground">Upload, publish, and manage your paid content</p>
						<Link href="/creator/content" className={cn(buttonVariants({ variant: 'default' }), 'mt-4')}>
							Go to Content Manager
						</Link>
					</div>
				</TabsContent>

				<TabsContent value="analytics">
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<BarChart2 className="mb-3 size-10 text-muted-foreground" />
						<p className="font-medium">View your analytics</p>
						<Link href="/creator/analytics" className={cn(buttonVariants({ variant: 'default' }), 'mt-4')}>
							Open Analytics
						</Link>
					</div>
				</TabsContent>
			</Tabs>

			<div className="mt-8 grid grid-cols-3 gap-3">
				{[
					{ label: 'Content', href: '/creator/content' },
					{ label: 'Paywall', href: '/creator/paywall' },
					{ label: 'Analytics', href: '/creator/analytics' }
				].map((l) => (
					<Link href={l.href} key={l.label} className={cn(buttonVariants({ variant: 'outline' }), '')}>
						{l.label} <ArrowUpRight className="size-3.5" />
					</Link>
				))}
			</div>
		</div>
	);
}
