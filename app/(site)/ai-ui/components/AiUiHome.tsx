'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code2, ImageIcon, Sparkles, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

const STATS = [
	{ label: 'Components Generated', value: '8,421', icon: Code2 },
	{ label: 'Lines of Code Saved', value: '2.1M', icon: Zap },
	{ label: 'Active Users', value: '1,247', icon: Users },
	{ label: 'Avg Gen Time', value: '4.2s', icon: Sparkles }
];

const HISTORY = [
	{ inputType: 'Screenshot', framework: 'React+Tailwind', status: 'complete', createdAt: '5m ago' },
	{ inputType: 'Text', framework: 'shadcn', status: 'complete', createdAt: '22m ago' },
	{ inputType: 'Screenshot', framework: 'Next.js', status: 'complete', createdAt: '1h ago' },
	{ inputType: 'Figma', framework: 'MUI', status: 'failed', createdAt: '2h ago' },
	{ inputType: 'Text', framework: 'React+Tailwind', status: 'complete', createdAt: '3h ago' }
];

const INPUT_STYLES: Record<string, string> = { Screenshot: 'bg-blue-500/10 text-blue-500', Text: 'bg-purple-500/10 text-purple-500', Figma: 'bg-pink-500/10 text-pink-500' };

export function AiUiHome() {
	const [quickState, setQuickState] = useState({ prompt: '', framework: 'react-tailwind', loading: false, done: false });

	const handleGenerate = () => {
		setQuickState((s) => ({ ...s, loading: true }));
		setTimeout(() => setQuickState((s) => ({ ...s, loading: false, done: true })), 2000);
	};

	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			<div className='mb-8'><h1 className='text-3xl font-extrabold tracking-tight'>AI UI Generator</h1><p className='mt-1 text-sm text-muted-foreground'>Screenshot → React/Tailwind code in seconds</p></div>

			<div className='mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4'>
				{STATS.map((s) => { const Icon = s.icon; return (<Card key={s.label}><CardHeader className='pb-2'><div className='flex items-center justify-between'><p className='text-xs text-muted-foreground'>{s.label}</p><Icon className='size-4 text-muted-foreground' /></div></CardHeader><CardContent><p className='text-2xl font-bold'>{s.value}</p></CardContent></Card>); })}
			</div>

			<Tabs defaultValue='generate'>
				<TabsList className='mb-6'><TabsTrigger value='generate'>Quick Generate</TabsTrigger><TabsTrigger value='history'>History</TabsTrigger></TabsList>

				<TabsContent value='generate'>
					<Card>
						<CardHeader><CardTitle className='text-base'>Describe your UI</CardTitle></CardHeader>
						<CardContent className='flex flex-col gap-4'>
							<Textarea value={quickState.prompt} onChange={(e) => setQuickState((s) => ({ ...s, prompt: e.target.value }))} rows={3} placeholder='A dark dashboard card with a line chart, title, subtitle, and a badge showing percentage change...' />
							<div className='flex items-end gap-3'>
								<div className='flex flex-col gap-1.5 flex-1'><Label>Framework</Label>
									<Select value={quickState.framework} onValueChange={(v) => setQuickState((s) => ({ ...s, framework: v ?? '' }))}>
										<SelectTrigger><SelectValue /></SelectTrigger>
										<SelectContent><SelectItem value='react-tailwind'>React + Tailwind</SelectItem><SelectItem value='shadcn'>React + shadcn</SelectItem><SelectItem value='nextjs'>Next.js</SelectItem><SelectItem value='mui'>MUI</SelectItem></SelectContent>
									</Select>
								</div>
								<Button id='quick-generate-btn' onClick={handleGenerate} disabled={quickState.loading} className='gap-2'><Sparkles className='size-4' />{quickState.loading ? 'Generating…' : 'Generate'}</Button>
								<Link href='/ai-ui/generate' className={cn(buttonVariants({ variant: 'outline' }), '')}>Full Studio</Link>
							</div>
							{quickState.loading && <div className='flex flex-col gap-2 mt-2'>{[...Array(5)].map((_, i) => <Skeleton key={i} className='h-4' style={{ width: `${60 + Math.random() * 40}%` }} />)}</div>}
							{quickState.done && !quickState.loading && (
								<pre className='rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300 font-mono overflow-x-auto'>{`export function StatsCard() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-zinc-400">Total Revenue</p>
        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">+12.4%</span>
      </div>
      <p className="text-3xl font-bold text-white">$48,291</p>
    </div>
  );
}`}</pre>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='history'>
					<Card><CardContent className='p-0'>
						<Table>
							<TableHeader><TableRow><TableHead>Input Type</TableHead><TableHead>Framework</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader>
							<TableBody>{HISTORY.map((h, i) => (
								<TableRow key={i}>
									<TableCell><Badge variant='outline' className={`text-xs ${INPUT_STYLES[h.inputType]}`}>{h.inputType}</Badge></TableCell>
									<TableCell><Badge variant='secondary' className='text-xs'>{h.framework}</Badge></TableCell>
									<TableCell><Badge variant='outline' className={h.status === 'complete' ? 'bg-green-500/10 text-green-600 dark:text-green-400 text-xs' : 'bg-red-500/10 text-red-500 text-xs'}>{h.status}</Badge></TableCell>
									<TableCell className='text-xs text-muted-foreground'>{h.createdAt}</TableCell>
									<TableCell><Link href='/ai-ui/generate' className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-xs')}>View</Link></TableCell>
								</TableRow>
							))}</TableBody>
						</Table>
					</CardContent></Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
