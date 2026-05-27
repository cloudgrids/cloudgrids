'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Pause, Pencil, Play, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const MOCK_JOBS = [
	{
		id: '1',
		name: 'Amazon Product Prices',
		url: 'amazon.com/s?k=headphones',
		cron: '*/30 * * * *',
		status: 'running',
		nextRun: 'in 28m',
		paused: false
	},
	{
		id: '2',
		name: 'Hacker News Top Stories',
		url: 'news.ycombinator.com',
		cron: '0 */6 * * *',
		status: 'scheduled',
		nextRun: 'in 2h',
		paused: false
	},
	{
		id: '3',
		name: 'GitHub Trending Repos',
		url: 'github.com/trending',
		cron: '0 8 * * *',
		status: 'running',
		nextRun: 'in 23h',
		paused: false
	},
	{
		id: '4',
		name: 'Reddit Tech Posts',
		url: 'reddit.com/r/programming',
		cron: '0 */3 * * *',
		status: 'paused',
		nextRun: '—',
		paused: true
	},
	{
		id: '5',
		name: 'Product Hunt Daily',
		url: 'producthunt.com',
		cron: '0 0 * * *',
		status: 'failed',
		nextRun: 'retry in 5m',
		paused: false
	}
];

const STATUS_STYLES: Record<string, string> = {
	running: 'bg-green-500/10 text-green-600 dark:text-green-400',
	scheduled: 'bg-blue-500/10 text-blue-500',
	paused: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	failed: 'bg-red-500/10 text-red-500'
};

export function ScheduleManager() {
	const [jobs, setJobs] = useState(MOCK_JOBS);
	const [dialog, setDialog] = useState({
		open: false,
		name: '',
		url: '',
		cron: '*/30 * * * *',
		prompt: '',
		format: 'json'
	});

	const togglePause = (id: string) =>
		setJobs((prev) =>
			prev.map((j) => (j.id === id ? { ...j, paused: !j.paused, status: j.paused ? 'scheduled' : 'paused' } : j))
		);

	return (
		<div className="mx-auto max-w-5xl px-4 py-10">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Scheduled Jobs</h1>
					<p className="text-sm text-muted-foreground">Recurring scraping jobs on a cron schedule</p>
				</div>
				<Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
					<Button id="new-job-btn" render={<DialogTrigger />}>
						<Plus className="size-4" />
						New Job
					</Button>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New Scheduled Job</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-4 pt-2">
							<div className="flex flex-col gap-1.5">
								<Label>Job Name</Label>
								<Input
									value={dialog.name}
									onChange={(e) => setDialog((d) => ({ ...d, name: e.target.value }))}
									placeholder="Amazon Prices"
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Target URL</Label>
								<Input
									value={dialog.url}
									onChange={(e) => setDialog((d) => ({ ...d, url: e.target.value }))}
									placeholder="https://example.com"
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Cron Expression</Label>
								<Input
									value={dialog.cron}
									onChange={(e) => setDialog((d) => ({ ...d, cron: e.target.value }))}
									placeholder="*/30 * * * *"
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Extraction Prompt</Label>
								<Textarea
									value={dialog.prompt}
									onChange={(e) => setDialog((d) => ({ ...d, prompt: e.target.value }))}
									rows={2}
									placeholder="Extract product names and prices..."
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Output Format</Label>
								<Select value={dialog.format} onValueChange={(v) => setDialog((d) => ({ ...d, format: v ?? '' }))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="json">JSON</SelectItem>
										<SelectItem value="csv">CSV</SelectItem>
										<SelectItem value="webhook">Webhook</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>Create Job</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="flex flex-col gap-3">
				{jobs.map((job) => (
					<Card key={job.id}>
						<CardHeader className="pb-2">
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="text-sm">{job.name}</CardTitle>
									<CardDescription className="mt-0.5 font-mono text-xs">{job.url}</CardDescription>
								</div>
								<Badge variant="outline" className={`text-xs ${STATUS_STYLES[job.status]}`}>
									{job.status}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1.5">
										<code className="text-xs bg-muted px-2 py-0.5 rounded">{job.cron}</code>
									</div>
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<Clock className="size-3" />
										{job.nextRun}
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="flex items-center gap-1.5">
										{job.paused ? (
											<Play className="size-3 text-muted-foreground" />
										) : (
											<Pause className="size-3 text-muted-foreground" />
										)}
										<Switch checked={!job.paused} onCheckedChange={() => togglePause(job.id)} />
									</div>
									<Button variant="ghost" size="icon" className="size-7">
										<Pencil className="size-3.5" />
									</Button>
									<Button variant="ghost" size="icon" className="size-7">
										<Trash2 className="size-3.5 text-destructive" />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
