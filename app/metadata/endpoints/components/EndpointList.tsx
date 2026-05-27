'use client';

import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const METHOD_STYLES: Record<string, string> = {
	GET: 'bg-blue-500/10 text-blue-500',
	POST: 'bg-green-500/10 text-green-600 dark:text-green-400'
};

const MOCK_ENDPOINTS = [
	{
		id: '1',
		method: 'GET',
		path: '/extract/article',
		description: 'Extract article content and metadata from any URL',
		rateLimit: '60/min',
		credits: 1,
		params: [{ name: 'url', type: 'string', required: true, desc: 'Target article URL' }],
		sample: '{"title":"...","author":"...","content":"..."}'
	},
	{
		id: '2',
		method: 'GET',
		path: '/extract/video',
		description: 'Extract video metadata, thumbnails, and transcript',
		rateLimit: '30/min',
		credits: 2,
		params: [{ name: 'url', type: 'string', required: true, desc: 'Video URL (YouTube, Vimeo, etc.)' }],
		sample: '{"title":"...","duration":324,"transcript":"..."}'
	},
	{
		id: '3',
		method: 'GET',
		path: '/extract/product',
		description: 'Extract product name, price, images, and reviews',
		rateLimit: '60/min',
		credits: 1,
		params: [{ name: 'url', type: 'string', required: true, desc: 'Product page URL' }],
		sample: '{"name":"...","price":29.99,"rating":4.5}'
	},
	{
		id: '4',
		method: 'GET',
		path: '/extract/profile',
		description: 'Extract social profile metadata and stats',
		rateLimit: '20/min',
		credits: 3,
		params: [
			{ name: 'url', type: 'string', required: true, desc: 'Profile page URL' },
			{ name: 'platform', type: 'string', required: false, desc: 'Hint: twitter|github|linkedin' }
		],
		sample: '{"name":"...","followers":12400,"bio":"..."}'
	},
	{
		id: '5',
		method: 'GET',
		path: '/extract/seo',
		description: 'Extract SEO signals, meta tags, and structured data',
		rateLimit: '60/min',
		credits: 1,
		params: [{ name: 'url', type: 'string', required: true, desc: 'Page URL' }],
		sample: '{"title":"...","description":"...","og":{},"schema":{}}'
	},
	{
		id: '6',
		method: 'POST',
		path: '/bulk/extract',
		description: 'Extract metadata from up to 50 URLs in one request',
		rateLimit: '5/min',
		credits: 10,
		params: [
			{ name: 'urls', type: 'string[]', required: true, desc: 'Array of URLs (max 50)' },
			{ name: 'type', type: 'string', required: false, desc: 'article|video|product|seo' }
		],
		sample: '{"results":[...],"failed":[...],"total":50}'
	},
	{
		id: '7',
		method: 'GET',
		path: '/batch/status',
		description: 'Check the status of a bulk extraction job',
		rateLimit: '120/min',
		credits: 0,
		params: [{ name: 'jobId', type: 'string', required: true, desc: 'Job ID from /bulk/extract response' }],
		sample: '{"status":"complete","processed":50,"results":"/batch/jobId/results"}'
	}
];

export function EndpointList() {
	const [state, setState] = useState({ selectedId: null as string | null, sheetOpen: false });
	const selected = MOCK_ENDPOINTS.find((e) => e.id === state.selectedId);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">API Endpoints</h1>
				<p className="text-sm text-muted-foreground">Click any endpoint to view full documentation</p>
			</div>

			<div className="rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Method</TableHead>
							<TableHead>Path</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Rate Limit</TableHead>
							<TableHead>Credits</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{MOCK_ENDPOINTS.map((ep) => (
							<TableRow
								key={ep.id}
								className="cursor-pointer hover:bg-muted/50"
								onClick={() => setState({ selectedId: ep.id, sheetOpen: true })}
							>
								<TableCell>
									<Badge variant="outline" className={`text-xs ${METHOD_STYLES[ep.method]}`}>
										{ep.method}
									</Badge>
								</TableCell>
								<TableCell className="font-mono text-xs">{ep.path}</TableCell>
								<TableCell className="text-sm text-muted-foreground">{ep.description}</TableCell>
								<TableCell className="text-xs text-muted-foreground">{ep.rateLimit}</TableCell>
								<TableCell>
									<Badge variant="secondary" className="text-xs">
										{ep.credits === 0 ? 'Free' : `${ep.credits} credit${ep.credits > 1 ? 's' : ''}`}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{selected && (
				<Sheet open={state.sheetOpen} onOpenChange={(open) => setState((s) => ({ ...s, sheetOpen: open }))}>
					<SheetContent className="w-full sm:max-w-xl overflow-y-auto">
						<SheetHeader className="mb-4">
							<SheetTitle className="flex items-center gap-2">
								<Badge variant="outline" className={METHOD_STYLES[selected.method]}>
									{selected.method}
								</Badge>
								<code className="text-sm">{selected.path}</code>
							</SheetTitle>
							<p className="text-sm text-muted-foreground">{selected.description}</p>
						</SheetHeader>

						<Tabs defaultValue="params">
							<TabsList className="mb-4">
								<TabsTrigger value="params">Parameters</TabsTrigger>
								<TabsTrigger value="response">Response</TabsTrigger>
							</TabsList>
							<TabsContent value="params">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Type</TableHead>
											<TableHead>Required</TableHead>
											<TableHead>Description</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{selected.params.map((p) => (
											<TableRow key={p.name}>
												<TableCell className="font-mono text-xs">{p.name}</TableCell>
												<TableCell>
													<Badge variant="secondary" className="text-xs">
														{p.type}
													</Badge>
												</TableCell>
												<TableCell>
													{p.required ? (
														<Badge className="bg-red-500/10 text-red-500 text-xs" variant="outline">
															required
														</Badge>
													) : (
														<span className="text-xs text-muted-foreground">optional</span>
													)}
												</TableCell>
												<TableCell className="text-xs text-muted-foreground">{p.desc}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="response">
								<pre className="rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300 font-mono overflow-x-auto">
									{selected.sample}
								</pre>
							</TabsContent>
						</Tabs>
					</SheetContent>
				</Sheet>
			)}
		</div>
	);
}
