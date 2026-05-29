'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import { useState } from 'react';

const MOCK_EXPORTS = [
	{
		id: '1',
		job: 'Amazon Product Prices',
		format: 'json',
		records: 1240,
		size: '2.4 MB',
		createdAt: '10m ago',
		status: 'ready'
	},
	{ id: '2', job: 'GitHub Trending', format: 'csv', records: 25, size: '12 KB', createdAt: '1h ago', status: 'ready' },
	{
		id: '3',
		job: 'HN Top Stories',
		format: 'webhook',
		records: 30,
		size: '—',
		createdAt: '6h ago',
		status: 'delivered'
	},
	{
		id: '4',
		job: 'Reddit Tech Posts',
		format: 'json',
		records: 480,
		size: '1.1 MB',
		createdAt: '12h ago',
		status: 'ready'
	},
	{
		id: '5',
		job: 'Product Hunt Daily',
		format: 'csv',
		records: 50,
		size: '28 KB',
		createdAt: '1d ago',
		status: 'ready'
	},
	{
		id: '6',
		job: 'Amazon Product Prices',
		format: 'json',
		records: 1198,
		size: '2.3 MB',
		createdAt: '1d ago',
		status: 'ready'
	},
	{ id: '7', job: 'HN Top Stories', format: 'webhook', records: 30, size: '—', createdAt: '2d ago', status: 'failed' },
	{ id: '8', job: 'GitHub Trending', format: 'csv', records: 25, size: '11 KB', createdAt: '2d ago', status: 'ready' },
	{
		id: '9',
		job: 'Reddit Tech Posts',
		format: 'json',
		records: 510,
		size: '1.2 MB',
		createdAt: '3d ago',
		status: 'ready'
	},
	{
		id: '10',
		job: 'Amazon Product Prices',
		format: 'csv',
		records: 1180,
		size: '3.1 MB',
		createdAt: '4d ago',
		status: 'ready'
	}
];

const FORMAT_STYLES: Record<string, string> = {
	json: 'bg-blue-500/10 text-blue-500',
	csv: 'bg-green-500/10 text-green-600 dark:text-green-400',
	webhook: 'bg-purple-500/10 text-purple-500'
};

const STATUS_STYLES: Record<string, string> = {
	ready: 'bg-green-500/10 text-green-600 dark:text-green-400',
	delivered: 'bg-blue-500/10 text-blue-500',
	failed: 'bg-red-500/10 text-red-500'
};

export function ExportHistory() {
	const [formatFilter, setFormatFilter] = useState('all');

	const filtered = formatFilter === 'all' ? MOCK_EXPORTS : MOCK_EXPORTS.filter((e) => e.format === formatFilter);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Export History</h1>
				<p className="text-sm text-muted-foreground">Download past extraction results</p>
			</div>

			<Tabs value={formatFilter} onValueChange={setFormatFilter}>
				<TabsList className="mb-4">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="json">JSON</TabsTrigger>
					<TabsTrigger value="csv">CSV</TabsTrigger>
					<TabsTrigger value="webhook">Webhook</TabsTrigger>
				</TabsList>
				<TabsContent value={formatFilter}>
					<div className="rounded-lg border border-border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Job</TableHead>
									<TableHead>Format</TableHead>
									<TableHead>Records</TableHead>
									<TableHead>Size</TableHead>
									<TableHead>Created</TableHead>
									<TableHead>Status</TableHead>
									<TableHead />
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map((e) => (
									<TableRow key={e.id}>
										<TableCell className="font-medium text-sm">{e.job}</TableCell>
										<TableCell>
											<Badge variant="outline" className={`text-xs ${FORMAT_STYLES[e.format]}`}>
												{e.format.toUpperCase()}
											</Badge>
										</TableCell>
										<TableCell className="text-sm">{e.records.toLocaleString()}</TableCell>
										<TableCell className="text-xs text-muted-foreground">{e.size}</TableCell>
										<TableCell className="text-xs text-muted-foreground">{e.createdAt}</TableCell>
										<TableCell>
											<Badge variant="outline" className={`text-xs ${STATUS_STYLES[e.status]}`}>
												{e.status}
											</Badge>
										</TableCell>
										<TableCell>
											{e.status === 'ready' && (
												<Button size="sm" variant="outline" className="h-7 text-xs">
													<Download className="size-3" />
													Download
												</Button>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
