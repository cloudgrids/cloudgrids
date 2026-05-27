'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GitBranch, MoreHorizontal, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const MOCK_DEPLOYMENTS = [
	{
		id: '1',
		project: 'my-portfolio',
		branch: 'main',
		commit: 'a3f2c1d',
		status: 'live',
		region: 'us-east-1',
		duration: '42s',
		ago: '2m ago'
	},
	{
		id: '2',
		project: 'discord-bot',
		branch: 'feat/slash-commands',
		commit: 'b8e9f12',
		status: 'building',
		region: 'eu-west-1',
		duration: '—',
		ago: '5m ago'
	},
	{
		id: '3',
		project: 'ai-wrapper',
		branch: 'main',
		commit: 'c4d5e67',
		status: 'live',
		region: 'us-east-1',
		duration: '38s',
		ago: '1h ago'
	},
	{
		id: '4',
		project: 'api-service',
		branch: 'hotfix/db',
		commit: 'd1a2b34',
		status: 'failed',
		region: 'us-west-2',
		duration: '12s',
		ago: '2h ago'
	},
	{
		id: '5',
		project: 'next-saas',
		branch: 'main',
		commit: 'e5f6g78',
		status: 'live',
		region: 'us-east-1',
		duration: '55s',
		ago: '4h ago'
	},
	{
		id: '6',
		project: 'ml-api',
		branch: 'develop',
		commit: 'f9a0b12',
		status: 'live',
		region: 'ap-south-1',
		duration: '1m 20s',
		ago: '6h ago'
	},
	{
		id: '7',
		project: 'scraper-bot',
		branch: 'main',
		commit: 'g3c4d56',
		status: 'live',
		region: 'eu-west-1',
		duration: '29s',
		ago: '8h ago'
	},
	{
		id: '8',
		project: 'portfolio-v2',
		branch: 'redesign',
		commit: 'h7e8f90',
		status: 'failed',
		region: 'us-east-1',
		duration: '8s',
		ago: '10h ago'
	},
	{
		id: '9',
		project: 'auth-service',
		branch: 'main',
		commit: 'i1j2k34',
		status: 'live',
		region: 'us-east-1',
		duration: '61s',
		ago: '1d ago'
	},
	{
		id: '10',
		project: 'docs-site',
		branch: 'content/update',
		commit: 'l5m6n78',
		status: 'live',
		region: 'us-east-1',
		duration: '22s',
		ago: '2d ago'
	}
];

const STATUS_STYLES: Record<string, string> = {
	live: 'bg-green-500/10 text-green-600 dark:text-green-400',
	building: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	failed: 'bg-red-500/10 text-red-500'
};

const FRAMEWORKS = ['Next.js', 'Vite', 'Node.js', 'Python', 'Go', 'Bun'];

export function DeploymentList() {
	const [filters, setFilters] = useState({ search: '', status: 'all' });
	const [dialog, setDialog] = useState({ open: false, repoUrl: '', branch: 'main', framework: '', envPreset: '' });

	const filtered = MOCK_DEPLOYMENTS.filter((d) => {
		const matchSearch = d.project.toLowerCase().includes(filters.search.toLowerCase());
		const matchStatus = filters.status === 'all' || d.status === filters.status;
		return matchSearch && matchStatus;
	});

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Deployments</h1>
					<p className="text-sm text-muted-foreground">All deployment runs across your projects</p>
				</div>
				<Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
					<Button id="deploy-new-btn" render={<DialogTrigger />}>
						<Plus className="size-4" />
						New Deployment
					</Button>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New Deployment</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-4 pt-2">
							<div className="flex flex-col gap-1.5">
								<Label>Repository URL</Label>
								<Input
									placeholder="https://github.com/you/project"
									value={dialog.repoUrl}
									onChange={(e) => setDialog((d) => ({ ...d, repoUrl: e.target.value }))}
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Branch</Label>
								<Input
									placeholder="main"
									value={dialog.branch}
									onChange={(e) => setDialog((d) => ({ ...d, branch: e.target.value }))}
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Framework</Label>
								<Select
									value={dialog.framework}
									onValueChange={(v) => setDialog((d) => ({ ...d, framework: v ?? '' }))}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select framework" />
									</SelectTrigger>
									<SelectContent>
										{FRAMEWORKS.map((f) => (
											<SelectItem key={f} value={f}>
												{f}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Env Preset</Label>
								<Select
									value={dialog.envPreset}
									onValueChange={(v) => setDialog((d) => ({ ...d, envPreset: v ?? '' }))}
								>
									<SelectTrigger>
										<SelectValue placeholder="None" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="none">None</SelectItem>
										<SelectItem value="node">Node.js defaults</SelectItem>
										<SelectItem value="nextjs">Next.js + DB</SelectItem>
										<SelectItem value="ai">AI + OpenAI</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button className="mt-2" onClick={() => setDialog((d) => ({ ...d, open: false }))}>
								Deploy
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Filters */}
			<div className="mb-4 flex gap-3">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="pl-9"
						placeholder="Search projects…"
						value={filters.search}
						onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
					/>
				</div>
				<Select value={filters.status} onValueChange={(v) => setFilters((f) => ({ ...f, status: v ?? '' }))}>
					<SelectTrigger className="w-36">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All statuses</SelectItem>
						<SelectItem value="live">Live</SelectItem>
						<SelectItem value="building">Building</SelectItem>
						<SelectItem value="failed">Failed</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Table */}
			<div className="rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Project</TableHead>
							<TableHead>Branch</TableHead>
							<TableHead>Commit</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Region</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>When</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{filtered.map((d) => (
							<TableRow key={d.id}>
								<TableCell className="font-medium">{d.project}</TableCell>
								<TableCell>
									<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
										<GitBranch className="size-3" />
										{d.branch}
									</div>
								</TableCell>
								<TableCell>
									<code className="text-xs bg-muted px-1.5 py-0.5 rounded">{d.commit}</code>
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={STATUS_STYLES[d.status]}>
										{d.status}
									</Badge>
								</TableCell>
								<TableCell className="text-xs text-muted-foreground">{d.region}</TableCell>
								<TableCell className="text-xs text-muted-foreground">{d.duration}</TableCell>
								<TableCell className="text-xs text-muted-foreground">{d.ago}</TableCell>
								<TableCell>
									<DropdownMenu>
										<Button variant="ghost" size="icon" render={<DropdownMenuTrigger />}>
											<MoreHorizontal className="size-4" />
										</Button>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>View logs</DropdownMenuItem>
											<DropdownMenuItem>Redeploy</DropdownMenuItem>
											<DropdownMenuItem className="text-destructive">Rollback</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
