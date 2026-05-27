'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const REGION_STATS = [
	{ region: 'us-east-1', requests: '18.2M', hitRate: '91%', latency: '8ms' },
	{ region: 'eu-west-1', requests: '12.4M', hitRate: '88%', latency: '11ms' },
	{ region: 'ap-south-1', requests: '7.1M', hitRate: '85%', latency: '19ms' },
	{ region: 'us-west-2', requests: '4.3M', hitRate: '89%', latency: '14ms' }
];

const MOCK_SIGNED_URLS = [
	{ asset: 'premium-pack.zip', expiry: 'in 2h', requests: 14 },
	{ asset: 'tutorial-video.mp4', expiry: 'in 22h', requests: 87 },
	{ asset: 'dataset-v2.csv', expiry: 'in 6d', requests: 3 },
	{ asset: 'ai-art-bundle.zip', expiry: 'Expired', requests: 201 }
];

export function CdnDashboard() {
	const [dialog, setDialog] = useState({ open: false, asset: '', expiry: '24h' });

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">CDN Dashboard</h1>
				<p className="text-sm text-muted-foreground">Global delivery performance and signed URL management</p>
			</div>

			<div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
				{[
					{ label: 'Cache Hit Rate', value: '87%', progress: 87 },
					{ label: 'Total Requests', value: '42M', progress: null },
					{ label: 'Data Transferred', value: '8.4 TB', progress: null },
					{ label: 'Avg Response Time', value: '12ms', progress: null }
				].map((s) => (
					<Card key={s.label}>
						<CardHeader className="pb-2">
							<p className="text-xs text-muted-foreground">{s.label}</p>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">{s.value}</p>
							{s.progress && <Progress value={s.progress} className="mt-2 h-1.5" />}
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Region Performance</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Region</TableHead>
									<TableHead>Requests</TableHead>
									<TableHead>Cache Hit</TableHead>
									<TableHead>Latency</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{REGION_STATS.map((r) => (
									<TableRow key={r.region}>
										<TableCell className="font-mono text-xs">{r.region}</TableCell>
										<TableCell className="text-sm">{r.requests}</TableCell>
										<TableCell className="text-sm">{r.hitRate}</TableCell>
										<TableCell className="text-sm">{r.latency}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Signed URLs</CardTitle>
							<Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
								<Button size="sm" id="gen-signed-url-btn" render={<DialogTrigger />}>
									<Plus className="size-3.5" />
									Generate
								</Button>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Generate Signed URL</DialogTitle>
									</DialogHeader>
									<div className="flex flex-col gap-4 pt-2">
										<div className="flex flex-col gap-1.5">
											<Label>Asset</Label>
											<Input
												value={dialog.asset}
												onChange={(e) => setDialog((d) => ({ ...d, asset: e.target.value }))}
												placeholder="path/to/asset.zip"
											/>
										</div>
										<div className="flex flex-col gap-1.5">
											<Label>Expiry</Label>
											<Select
												value={dialog.expiry}
												onValueChange={(v) => setDialog((d) => ({ ...d, expiry: v ?? '' }))}
											>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="1h">1 hour</SelectItem>
													<SelectItem value="24h">24 hours</SelectItem>
													<SelectItem value="7d">7 days</SelectItem>
													<SelectItem value="30d">30 days</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>
											<Link2 className="size-4" />
											Generate URL
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Asset</TableHead>
									<TableHead>Expiry</TableHead>
									<TableHead>Requests</TableHead>
									<TableHead />
								</TableRow>
							</TableHeader>
							<TableBody>
								{MOCK_SIGNED_URLS.map((u) => (
									<TableRow key={u.asset}>
										<TableCell className="text-xs font-mono">{u.asset}</TableCell>
										<TableCell className="text-xs text-muted-foreground">{u.expiry}</TableCell>
										<TableCell className="text-xs">{u.requests}</TableCell>
										<TableCell>
											<Button variant="ghost" size="icon" className="size-7">
												<Trash2 className="size-3.5 text-muted-foreground" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
