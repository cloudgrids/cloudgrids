'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, ImageIcon, Sparkles, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

const MOCK_CODE = `import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export function RevenueCard() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-400">Total Revenue</p>
          <TrendingUp className="size-4 text-zinc-500" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-white">$48,291</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge className="bg-green-500/10 text-green-400">
            +12.4%
          </Badge>
          <p className="text-xs text-zinc-500">vs last month</p>
        </div>
      </CardContent>
    </Card>
  );
}`;

export function UiGenerator() {
	const [state, setState] = useState({
		description: '',
		framework: 'shadcn',
		variant: 'dark',
		loading: false,
		generated: false
	});

	const randomValue = useCallback(() => Math.random() * 60, []);

	const handleGenerate = () => {
		setState((s) => ({ ...s, loading: true }));
		setTimeout(() => setState((s) => ({ ...s, loading: false, generated: true })), 2000);
	};

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">UI Generator Studio</h1>
				<p className="text-sm text-muted-foreground">
					Upload a screenshot or describe your UI to generate production code
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Input Panel */}
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Input</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{/* Drop zone */}
						<div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 py-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
							<ImageIcon className="mb-2 size-8 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Drop screenshot or</p>
							<Button variant="outline" size="sm" className="mt-2">
								<Upload className="size-3.5" />
								Browse
							</Button>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex-1 border-t border-border" />
							<span className="text-xs text-muted-foreground">OR</span>
							<div className="flex-1 border-t border-border" />
						</div>

						<div className="flex flex-col gap-1.5">
							<Label>Describe your UI</Label>
							<Textarea
								value={state.description}
								onChange={(e) => setState((s) => ({ ...s, description: e.target.value }))}
								rows={4}
								placeholder="A dark dashboard card with revenue stats, a percentage change badge, and a trending icon..."
							/>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="flex flex-col gap-1.5">
								<Label>Framework</Label>
								<Select value={state.framework} onValueChange={(v) => setState((s) => ({ ...s, framework: v ?? '' }))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="react-tailwind">React + Tailwind</SelectItem>
										<SelectItem value="shadcn">React + shadcn</SelectItem>
										<SelectItem value="nextjs">Next.js</SelectItem>
										<SelectItem value="mui">MUI</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>Variant</Label>
								<Select value={state.variant} onValueChange={(v) => setState((s) => ({ ...s, variant: v ?? '' }))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="auto">Auto</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<Button id="generate-ui-btn" onClick={handleGenerate} disabled={state.loading} className="gap-2 w-full">
							<Sparkles className="size-4" />
							{state.loading ? 'Generating…' : 'Generate Component'}
						</Button>
					</CardContent>
				</Card>

				{/* Output Panel */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Output</CardTitle>
							{state.generated && (
								<div className="flex gap-2">
									<Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(MOCK_CODE)}>
										<Copy className="size-3.5" />
										Copy
									</Button>
									<Button size="sm" variant="outline">
										<Download className="size-3.5" />
										Download
									</Button>
								</div>
							)}
						</div>
					</CardHeader>
					<CardContent>
						{!state.loading && !state.generated && (
							<div className="flex h-64 items-center justify-center text-center">
								<div>
									<Sparkles className="mx-auto mb-2 size-10 text-muted-foreground" />
									<p className="text-sm text-muted-foreground">Your generated component will appear here</p>
								</div>
							</div>
						)}
						{state.loading && (
							<div className="flex flex-col gap-2">
								{[...Array(10)].map((_, i) => (
									<Skeleton key={i} className="h-4" style={{ width: `${40 + randomValue()}%` }} />
								))}
							</div>
						)}
						{state.generated && !state.loading && (
							<Tabs defaultValue="code">
								<TabsList className="mb-3">
									<TabsTrigger value="preview">Preview</TabsTrigger>
									<TabsTrigger value="code">Code</TabsTrigger>
								</TabsList>
								<TabsContent value="preview">
									<div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 w-64">
										<div className="flex items-center justify-between mb-3">
											<p className="text-sm text-zinc-400">Total Revenue</p>
											<Badge className="bg-green-500/10 text-green-400 text-xs">+12.4%</Badge>
										</div>
										<p className="text-3xl font-bold text-white">$48,291</p>
										<p className="text-xs text-zinc-500 mt-1">vs last month</p>
									</div>
								</TabsContent>
								<TabsContent value="code">
									<pre className="rounded-lg bg-zinc-950 p-3 text-xs text-zinc-300 font-mono overflow-x-auto leading-relaxed">
										{MOCK_CODE}
									</pre>
								</TabsContent>
							</Tabs>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
