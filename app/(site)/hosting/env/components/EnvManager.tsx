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
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, EyeOff, Lock, MoreHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';

const ENV_BADGES: Record<string, string> = {
	Production: 'bg-green-500/10 text-green-600 dark:text-green-400',
	Preview: 'bg-blue-500/10 text-blue-500',
	Dev: 'bg-purple-500/10 text-purple-500'
};

const MOCK_ENV_VARS = [
	{ id: '1', key: 'DATABASE_URL', env: 'Production', secret: true },
	{ id: '2', key: 'NEXTAUTH_SECRET', env: 'Production', secret: true },
	{ id: '3', key: 'OPENAI_API_KEY', env: 'Production', secret: true },
	{ id: '4', key: 'NEXT_PUBLIC_APP_URL', env: 'Production', secret: false },
	{ id: '5', key: 'REDIS_URL', env: 'Preview', secret: true },
	{ id: '6', key: 'STRIPE_SECRET_KEY', env: 'Production', secret: true },
	{ id: '7', key: 'S3_BUCKET_NAME', env: 'Dev', secret: false },
	{ id: '8', key: 'SMTP_HOST', env: 'Preview', secret: false }
];

export function EnvManager() {
	const [dialog, setDialog] = useState({
		open: false,
		key: '',
		value: '',
		env: 'Production',
		secret: true,
		showValue: false
	});
	const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

	const toggleReveal = (id: string) => {
		setRevealedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Environment Variables</h1>
					<p className="text-sm text-muted-foreground">Manage secrets and config per environment</p>
				</div>
				<Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
					<Button id="add-env-btn" render={<DialogTrigger />}>
						<Plus className="size-4" />
						Add Variable
					</Button>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Environment Variable</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-4 pt-2">
							<div className="flex flex-col gap-1.5">
								<Label>Key</Label>
								<Input
									placeholder="MY_API_KEY"
									value={dialog.key}
									onChange={(e) => setDialog((d) => ({ ...d, key: e.target.value.toUpperCase() }))}
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Value</Label>
								<div className="relative">
									<Input
										type={dialog.showValue ? 'text' : 'password'}
										placeholder="sk-..."
										value={dialog.value}
										onChange={(e) => setDialog((d) => ({ ...d, value: e.target.value }))}
									/>
									<button
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										onClick={() => setDialog((d) => ({ ...d, showValue: !d.showValue }))}
									>
										{dialog.showValue ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
									</button>
								</div>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Environment</Label>
								<Select value={dialog.env} onValueChange={(v) => setDialog((d) => ({ ...d, env: v ?? '' }))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Production">Production</SelectItem>
										<SelectItem value="Preview">Preview</SelectItem>
										<SelectItem value="Dev">Dev</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex items-center justify-between">
								<Label>Mark as secret</Label>
								<Switch checked={dialog.secret} onCheckedChange={(v) => setDialog((d) => ({ ...d, secret: v }))} />
							</div>
							<Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>Save Variable</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Key</TableHead>
							<TableHead>Value</TableHead>
							<TableHead>Environment</TableHead>
							<TableHead>Secret</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{MOCK_ENV_VARS.map((v) => (
							<TableRow key={v.id}>
								<TableCell className="font-mono text-sm font-medium">{v.key}</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span className="font-mono text-xs text-muted-foreground">
											{revealedIds.has(v.id) ? 'sk-abcd1234efgh5678...' : '••••••••••••'}
										</span>
										<button onClick={() => toggleReveal(v.id)} className="text-muted-foreground hover:text-foreground">
											{revealedIds.has(v.id) ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
										</button>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="outline" className={`text-xs ${ENV_BADGES[v.env]}`}>
										{v.env}
									</Badge>
								</TableCell>
								<TableCell>{v.secret && <Lock className="size-3.5 text-muted-foreground" />}</TableCell>
								<TableCell>
									<DropdownMenu>
										<Button variant="ghost" size="icon" render={<DropdownMenuTrigger />}>
											<MoreHorizontal className="size-4" />
										</Button>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Duplicate</DropdownMenuItem>
											<DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
