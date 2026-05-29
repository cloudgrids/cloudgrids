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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';

const MOCK_CONTENT = [
	{ id: '1', title: 'Prompt Engineering Pack', type: 'prompt', status: 'published', price: '$9.99', sales: 234 },
	{ id: '2', title: 'AI Art Bundle Vol.3', type: 'image', status: 'published', price: '$24.99', sales: 187 },
	{ id: '3', title: 'Next.js Course — Advanced', type: 'course', status: 'published', price: '$49.99', sales: 89 },
	{ id: '4', title: 'React Snippets Pack', type: 'dataset', status: 'published', price: '$4.99', sales: 312 },
	{ id: '5', title: 'Dark UI Kit — Figma', type: 'image', status: 'draft', price: '$19.99', sales: 0 },
	{ id: '6', title: 'Python Data Scripts', type: 'dataset', status: 'published', price: '$14.99', sales: 56 },
	{ id: '7', title: 'Discord Bot Template', type: 'dataset', status: 'draft', price: '$7.99', sales: 0 },
	{ id: '8', title: 'UI Animations Pack', type: 'video', status: 'published', price: '$29.99', sales: 143 },
	{ id: '9', title: 'ChatGPT System Prompts', type: 'prompt', status: 'published', price: '$12.99', sales: 421 },
	{ id: '10', title: 'Framer Motion Cookbook', type: 'course', status: 'published', price: '$39.99', sales: 67 },
	{ id: '11', title: 'API Design Guide', type: 'dataset', status: 'draft', price: '$9.99', sales: 0 },
	{ id: '12', title: 'Brand Identity Pack', type: 'image', status: 'published', price: '$34.99', sales: 29 }
];

const TYPE_STYLES: Record<string, string> = {
	prompt: 'bg-purple-500/10 text-purple-500',
	image: 'bg-blue-500/10 text-blue-500',
	course: 'bg-orange-500/10 text-orange-500',
	dataset: 'bg-cyan-500/10 text-cyan-500',
	video: 'bg-green-500/10 text-green-600 dark:text-green-400'
};

export function ContentManager() {
	const [statusFilter, setStatusFilter] = useState('all');
	const [dialog, setDialog] = useState({
		open: false,
		title: '',
		type: 'prompt',
		price: '',
		description: '',
		paywall: true
	});

	const filtered = statusFilter === 'all' ? MOCK_CONTENT : MOCK_CONTENT.filter((c) => c.status === statusFilter);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Content</h1>
					<p className="text-sm text-muted-foreground">Manage your published and draft content</p>
				</div>
				<Dialog open={dialog.open} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}>
					<Button id="upload-content-btn" render={<DialogTrigger />}>
						<Plus className="size-4" />
						Upload Content
					</Button>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Upload Content</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-4 pt-2">
							<div className="flex flex-col gap-1.5">
								<Label>Title</Label>
								<Input
									value={dialog.title}
									onChange={(e) => setDialog((d) => ({ ...d, title: e.target.value }))}
									placeholder="My awesome content"
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Type</Label>
								<Select value={dialog.type} onValueChange={(v) => setDialog((d) => ({ ...d, type: v ?? '' }))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="prompt">Prompt</SelectItem>
										<SelectItem value="image">Image</SelectItem>
										<SelectItem value="video">Video</SelectItem>
										<SelectItem value="course">Course</SelectItem>
										<SelectItem value="dataset">Dataset / Pack</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Price (USD)</Label>
								<Input
									value={dialog.price}
									onChange={(e) => setDialog((d) => ({ ...d, price: e.target.value }))}
									placeholder="9.99"
								/>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Description</Label>
								<Textarea
									value={dialog.description}
									onChange={(e) => setDialog((d) => ({ ...d, description: e.target.value }))}
									placeholder="Describe your content…"
								/>
							</div>
							<div className="flex items-center justify-between">
								<Label>Enable Paywall</Label>
								<Switch checked={dialog.paywall} onCheckedChange={(v) => setDialog((d) => ({ ...d, paywall: v }))} />
							</div>
							<Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>Upload</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<Tabs value={statusFilter} onValueChange={setStatusFilter}>
				<TabsList className="mb-4">
					<TabsTrigger value="all">All ({MOCK_CONTENT.length})</TabsTrigger>
					<TabsTrigger value="published">
						Published ({MOCK_CONTENT.filter((c) => c.status === 'published').length})
					</TabsTrigger>
					<TabsTrigger value="draft">Draft ({MOCK_CONTENT.filter((c) => c.status === 'draft').length})</TabsTrigger>
				</TabsList>
				<TabsContent value={statusFilter}>
					<div className="rounded-lg border border-border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Sales</TableHead>
									<TableHead />
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map((c) => (
									<TableRow key={c.id}>
										<TableCell className="font-medium">{c.title}</TableCell>
										<TableCell>
											<Badge variant="outline" className={`text-xs ${TYPE_STYLES[c.type]}`}>
												{c.type}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className={
													c.status === 'published'
														? 'bg-green-500/10 text-green-600 dark:text-green-400'
														: 'text-muted-foreground'
												}
											>
												{c.status}
											</Badge>
										</TableCell>
										<TableCell className="font-medium">{c.price}</TableCell>
										<TableCell className="text-muted-foreground">{c.sales.toLocaleString()}</TableCell>
										<TableCell>
											<DropdownMenu>
												<Button variant="ghost" size="icon" render={<DropdownMenuTrigger />}>
													<MoreHorizontal className="size-4" />
												</Button>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>{c.status === 'published' ? 'Unpublish' : 'Publish'}</DropdownMenuItem>
													<DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
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
