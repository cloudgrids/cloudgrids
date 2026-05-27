'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock, Database, Zap } from 'lucide-react';
import Link from 'next/link';

const STATS = [
	{ label: 'Active Jobs', value: '7', icon: Zap },
	{ label: 'Completed Today', value: '23', icon: CheckCircle2 },
	{ label: 'Failed Today', value: '2', icon: AlertTriangle },
	{ label: 'Records Extracted', value: '142K', icon: Database }
];

const ACTIVE_JOBS = [
	{ name: 'Product Prices — Amazon', url: 'amazon.com/s?...', schedule: '*/30 * * * *', status: 'running', lastRun: '2m ago', nextRun: 'in 28m', progress: 64 },
	{ name: 'Hacker News Top', url: 'news.ycombinator.com', schedule: '0 */6 * * *', status: 'scheduled', lastRun: '4h ago', nextRun: 'in 2h', progress: 0 },
	{ name: 'GitHub Trending', url: 'github.com/trending', schedule: '0 8 * * *', status: 'running', lastRun: '10m ago', nextRun: 'in 23h', progress: 88 },
	{ name: 'Reddit Tech Posts', url: 'reddit.com/r/programming', schedule: '0 */3 * * *', status: 'scheduled', lastRun: '2h ago', nextRun: 'in 1h', progress: 0 },
	{ name: 'Product Hunt Daily', url: 'producthunt.com', schedule: '0 0 * * *', status: 'paused', lastRun: '1d ago', nextRun: 'paused', progress: 0 }
];

const STATUS_STYLES: Record<string, string> = {
	running: 'bg-green-500/10 text-green-600 dark:text-green-400',
	scheduled: 'bg-blue-500/10 text-blue-500',
	paused: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	failed: 'bg-red-500/10 text-red-500'
};

export function ScrapingHome() {
	const [tab, setTab] = useState('overview');

	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			<div className='mb-8 flex items-center justify-between'>
				<div><h1 className='text-3xl font-extrabold tracking-tight'>AI Scraping</h1><p className='mt-1 text-sm text-muted-foreground'>Prompt-driven extraction — describe what you want, we extract it</p></div>
				<Link href='/scraping/extract' id='new-scrape-btn' className={cn(buttonVariants({ variant: 'default' }), '')}>New Extraction <ArrowUpRight className='size-4' /></Link>
			</div>

			<div className='mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4'>
				{STATS.map((s) => { const Icon = s.icon; return (<Card key={s.label}><CardHeader className='pb-2'><div className='flex items-center justify-between'><p className='text-xs text-muted-foreground'>{s.label}</p><Icon className='size-4 text-muted-foreground' /></div></CardHeader><CardContent><p className='text-2xl font-bold'>{s.value}</p></CardContent></Card>); })}
			</div>

			<Tabs value={tab} onValueChange={setTab}>
				<TabsList className='mb-6'><TabsTrigger value='overview'>Active Jobs</TabsTrigger><TabsTrigger value='links'>Quick Links</TabsTrigger></TabsList>
				<TabsContent value='overview'>
					<Card><CardContent className='p-0'>
						<Table>
							<TableHeader><TableRow><TableHead>Job</TableHead><TableHead>URL</TableHead><TableHead>Schedule</TableHead><TableHead>Status</TableHead><TableHead>Last Run</TableHead><TableHead>Next Run</TableHead><TableHead>Progress</TableHead></TableRow></TableHeader>
							<TableBody>
								{ACTIVE_JOBS.map((j) => (
									<TableRow key={j.name}>
										<TableCell className='font-medium text-sm'>{j.name}</TableCell>
										<TableCell className='max-w-[120px] truncate font-mono text-xs text-muted-foreground'>{j.url}</TableCell>
										<TableCell><code className='text-xs bg-muted px-1.5 py-0.5 rounded'>{j.schedule}</code></TableCell>
										<TableCell><Badge variant='outline' className={`text-xs ${STATUS_STYLES[j.status]}`}>{j.status}</Badge></TableCell>
										<TableCell className='text-xs text-muted-foreground'><div className='flex items-center gap-1'><Clock className='size-3' />{j.lastRun}</div></TableCell>
										<TableCell className='text-xs text-muted-foreground'>{j.nextRun}</TableCell>
										<TableCell className='w-24'>{j.progress > 0 ? <Progress value={j.progress} className='h-1.5' /> : <span className='text-xs text-muted-foreground'>—</span>}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent></Card>
				</TabsContent>
				<TabsContent value='links'>
					<div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
						{[{ label: 'Extract Now', desc: 'Run a one-off AI extraction', href: '/scraping/extract' }, { label: 'Schedule Jobs', desc: 'Manage recurring scrape jobs', href: '/scraping/schedule' }, { label: 'Exports', desc: 'Download past extraction results', href: '/scraping/exports' }].map((l) => (
							<Link key={l.label} href={l.href}><Card className='cursor-pointer hover:border-primary/40 transition-all duration-200 hover:-translate-y-1'><CardHeader><CardTitle className='text-sm'>{l.label}</CardTitle><p className='text-xs text-muted-foreground'>{l.desc}</p></CardHeader></Card></Link>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
