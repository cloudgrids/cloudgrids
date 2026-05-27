'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Download, Zap } from 'lucide-react';
import { useCallback, useState } from 'react';

const MOCK_RESULT = {
	title: 'How to Build a Production-Ready Next.js App',
	description:
		'A comprehensive guide covering auth, payments, deployment, and performance optimization for Next.js applications in 2025.',
	author: 'Sarah Chen',
	publishedAt: '2025-05-20T09:00:00Z',
	tags: ['Next.js', 'React', 'TypeScript', 'Web Dev', 'Tutorial'],
	images: ['https://cdn.example.com/hero.jpg', 'https://cdn.example.com/screenshot-1.png'],
	wordCount: 4820,
	readTime: '19 min read',
	language: 'en',
	siteName: 'dev.to',
	canonical: 'https://dev.to/example/how-to-build-nextjs'
};

export function ApiPlayground() {
	const [state, setState] = useState({
		url: 'https://dev.to/sarahchen/how-to-build-nextjs',
		type: 'article',
		loading: false,
		extracted: false
	});

	const handleExtract = () => {
		setState((s) => ({ ...s, loading: true }));
		setTimeout(() => setState((s) => ({ ...s, loading: false, extracted: true })), 1200);
	};

	const randomValue = useCallback(() => 70 + Math.random() * 60, []);

	return (
		<div className="mx-auto max-w-5xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">API Playground</h1>
				<p className="text-sm text-muted-foreground">Test metadata extraction in real-time</p>
			</div>

			<Card className="mb-6">
				<CardContent className="pt-5">
					<div className="flex flex-col gap-4 md:flex-row md:items-end">
						<div className="flex-1 flex flex-col gap-1.5">
							<Label>URL to extract</Label>
							<Input
								value={state.url}
								onChange={(e) => setState((s) => ({ ...s, url: e.target.value }))}
								placeholder="https://example.com/article"
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<Label>Type</Label>
							<Select value={state.type} onValueChange={(v) => setState((s) => ({ ...s, type: v ?? '' }))}>
								<SelectTrigger className="w-36">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="article">Article</SelectItem>
									<SelectItem value="video">Video</SelectItem>
									<SelectItem value="product">Product</SelectItem>
									<SelectItem value="profile">Profile</SelectItem>
									<SelectItem value="seo">SEO</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Button id="extract-btn" onClick={handleExtract} disabled={state.loading} className="gap-2">
							<Zap className="size-4" />
							{state.loading ? 'Extracting…' : 'Extract'}
						</Button>
					</div>
				</CardContent>
			</Card>

			{(state.loading || state.extracted) && (
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Response</CardTitle>
							{state.extracted && (
								<div className="flex items-center gap-2">
									<Badge className="bg-green-500/10 text-green-600 dark:text-green-400">200 OK</Badge>
									<Badge variant="outline">142ms</Badge>
									<Badge variant="outline">2.4 KB</Badge>
									<Button
										size="sm"
										variant="outline"
										onClick={() => navigator.clipboard.writeText(JSON.stringify(MOCK_RESULT, null, 2))}
									>
										<Copy className="size-3.5" />
										Copy
									</Button>
									<Button size="sm" variant="outline">
										<Download className="size-3.5" />
										JSON
									</Button>
								</div>
							)}
						</div>
					</CardHeader>
					<CardContent>
						{state.loading ? (
							<div className="flex flex-col gap-2">
								{[...Array(8)].map((_, i) => (
									<Skeleton key={i} className="h-4 w-full" style={{ width: `${randomValue()}%` }} />
								))}
							</div>
						) : (
							<ScrollArea className="h-72">
								<pre className="text-xs text-zinc-300 font-mono leading-relaxed bg-zinc-950 rounded-lg p-4 overflow-x-auto">
									{JSON.stringify(MOCK_RESULT, null, 2)}
								</pre>
							</ScrollArea>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
