'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Shield } from 'lucide-react';
import { useState } from 'react';

const MOCK_DOMAINS = [
	{ id: '1', domain: 'portfolio.cloudgrids.tech', type: 'subdomain', status: 'active', ssl: 'active', dns: 'verified' },
	{ id: '2', domain: 'mysite.com', type: 'custom', status: 'active', ssl: 'active', dns: 'verified' },
	{ id: '3', domain: 'api.cloudgrids.tech', type: 'subdomain', status: 'active', ssl: 'active', dns: 'verified' },
	{ id: '4', domain: 'staging.mysite.com', type: 'custom', status: 'pending', ssl: 'pending', dns: 'propagating' },
	{
		id: '5',
		domain: 'discord-bot.cloudgrids.tech',
		type: 'subdomain',
		status: 'active',
		ssl: 'active',
		dns: 'verified'
	},
	{ id: '6', domain: 'old-site.io', type: 'custom', status: 'failed', ssl: 'failed', dns: 'error' },
	{ id: '7', domain: 'ml-api.cloudgrids.tech', type: 'subdomain', status: 'active', ssl: 'active', dns: 'verified' },
	{ id: '8', domain: 'docs.mysite.com', type: 'custom', status: 'pending', ssl: 'pending', dns: 'propagating' }
];

const STATUS_STYLES: Record<string, string> = {
	active: 'bg-green-500/10 text-green-600 dark:text-green-400',
	pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	failed: 'bg-red-500/10 text-red-500',
	verified: 'bg-green-500/10 text-green-600 dark:text-green-400',
	propagating: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	error: 'bg-red-500/10 text-red-500'
};

export function DomainManager() {
	const [dialog, setDialog] = useState({ open: false, domain: '', type: 'subdomain' });

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Domains</h1>
					<p className="text-sm text-muted-foreground">Manage subdomains and custom domains</p>
				</div>
				<Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
					<Button id="add-domain-btn" render={<DialogTrigger />}>
						<Plus className="size-4" />
						Add Domain
					</Button>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Domain</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-4 pt-2">
							<div className="flex flex-col gap-1.5">
								<Label>Domain</Label>
								<Input
									placeholder="yourdomain.com or yourname.cloudgrids.tech"
									value={dialog.domain}
									onChange={(e) => setDialog((d) => ({ ...d, domain: e.target.value }))}
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Type</Label>
								<Select value={dialog.type} onValueChange={(v) => setDialog((d) => ({ ...d, type: v ?? '' }))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="subdomain">CloudGrids Subdomain</SelectItem>
										<SelectItem value="custom">Custom Domain</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>Add &amp; Verify</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Domain</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>SSL</TableHead>
							<TableHead>DNS</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{MOCK_DOMAINS.map((d) => (
							<TableRow key={d.id}>
								<TableCell className="font-mono text-sm">{d.domain}</TableCell>
								<TableCell>
									<Badge variant="secondary" className="text-xs capitalize">
										{d.type}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={STATUS_STYLES[d.status]}>
										{d.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-1.5">
										<Shield className="size-3 text-muted-foreground" />
										<Badge variant="outline" className={`text-xs ${STATUS_STYLES[d.ssl]}`}>
											{d.ssl}
										</Badge>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={`text-xs ${STATUS_STYLES[d.dns]}`}>
										{d.dns}
									</Badge>
								</TableCell>
								<TableCell>
									<Button variant="ghost" size="sm" className="text-xs">
										Configure
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
