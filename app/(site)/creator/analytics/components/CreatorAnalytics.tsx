'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const BAR_DATA: Record<string, number[]> = {
	'7d': [320, 480, 290, 610, 540, 780, 430],
	'30d': [
		1200, 1800, 1400, 2100, 1900, 2400, 2200, 1600, 1100, 2800, 2600, 1900, 2100, 1700, 2300, 2500, 1800, 2000, 1500,
		2700, 2400, 1600, 2200, 2100, 1900, 2500, 2300, 1800, 2100, 1700
	],
	'90d': [8400, 9200, 7800, 10100, 9600, 11200, 10400, 8900, 7200, 12100, 11600, 9800],
	all: [32000, 38000, 41000, 45000, 52000, 48000, 55000, 61000]
};

const DAY_LABELS: Record<string, string[]> = {
	'7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	'30d': Array.from({ length: 30 }, (_, i) => `${i + 1}`),
	'90d': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, 12),
	all: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
};

const TOP_CONTENT = [
	{ rank: 1, title: 'ChatGPT System Prompts', views: '12.4K', sales: 421, revenue: '$5,469' },
	{ rank: 2, title: 'React Snippets Pack', views: '9.1K', sales: 312, revenue: '$1,557' },
	{ rank: 3, title: 'Prompt Engineering Pack', views: '8.7K', sales: 234, revenue: '$2,338' },
	{ rank: 4, title: 'UI Animations Pack', views: '6.2K', sales: 143, revenue: '$4,284' },
	{ rank: 5, title: 'AI Art Bundle Vol.3', views: '5.8K', sales: 187, revenue: '$4,671' }
];

const TRAFFIC_SOURCES = [
	{ source: 'Direct', visitors: '4,210', conversion: '9.2%', revenue: '$6,840' },
	{ source: 'Twitter / X', visitors: '2,840', conversion: '7.8%', revenue: '$3,120' },
	{ source: 'GitHub', visitors: '1,920', conversion: '11.4%', revenue: '$1,890' },
	{ source: 'Newsletter', visitors: '1,240', conversion: '14.1%', revenue: '$980' },
	{ source: 'Other', visitors: '890', conversion: '4.2%', revenue: '$210' }
];

export function CreatorAnalytics() {
	const [period, setPeriod] = useState('7d');
	const bars = BAR_DATA[period];
	const labels = DAY_LABELS[period];
	const maxBar = Math.max(...bars);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
				<p className="text-sm text-muted-foreground">Revenue, traffic, and content performance</p>
			</div>

			<Tabs value={period} onValueChange={setPeriod}>
				<TabsList className="mb-6">
					<TabsTrigger value="7d">7 days</TabsTrigger>
					<TabsTrigger value="30d">30 days</TabsTrigger>
					<TabsTrigger value="90d">90 days</TabsTrigger>
					<TabsTrigger value="all">All time</TabsTrigger>
				</TabsList>

				<TabsContent value={period} className="flex flex-col gap-6">
					{/* Revenue Chart */}
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Revenue</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-end gap-1 h-36 overflow-x-auto pb-2">
								{bars.map((v, i) => (
									<div key={i} className="flex flex-col items-center gap-1 min-w-[28px] flex-1">
										<div
											className="w-full rounded-t-sm bg-primary/80 hover:bg-primary transition-colors"
											style={{ height: `${(v / maxBar) * 120}px` }}
											title={`$${v.toLocaleString()}`}
										/>
										<span className="text-[9px] text-muted-foreground">{labels[i]}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* Top Content */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Top Content</CardTitle>
							</CardHeader>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>#</TableHead>
											<TableHead>Title</TableHead>
											<TableHead>Views</TableHead>
											<TableHead>Sales</TableHead>
											<TableHead>Revenue</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{TOP_CONTENT.map((c) => (
											<TableRow key={c.rank}>
												<TableCell className="text-muted-foreground">{c.rank}</TableCell>
												<TableCell className="text-sm font-medium">{c.title}</TableCell>
												<TableCell className="text-sm">{c.views}</TableCell>
												<TableCell className="text-sm">{c.sales}</TableCell>
												<TableCell className="text-sm font-medium">{c.revenue}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>

						{/* Traffic Sources */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Traffic Sources</CardTitle>
							</CardHeader>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Source</TableHead>
											<TableHead>Visitors</TableHead>
											<TableHead>Conv.</TableHead>
											<TableHead>Revenue</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{TRAFFIC_SOURCES.map((s) => (
											<TableRow key={s.source}>
												<TableCell className="font-medium text-sm">{s.source}</TableCell>
												<TableCell className="text-sm">{s.visitors}</TableCell>
												<TableCell className="text-sm">{s.conversion}</TableCell>
												<TableCell className="text-sm font-medium">{s.revenue}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
