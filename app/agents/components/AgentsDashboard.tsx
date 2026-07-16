'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Clock, Cpu, Store, Zap } from 'lucide-react';
import Link from 'next/link';

const STATS = [
	{ label: 'Active Agents', value: '4', icon: Bot },
	{ label: 'Runs Today', value: '142', icon: Zap },
	{ label: 'Total Runtime', value: '48h', icon: Clock },
	{ label: 'CPU Credits Used', value: '2,840', icon: Cpu }
];

const MY_AGENTS = [
	{ name: 'Research Scraper', type: 'Scraping', status: 'running', runtime: '2h 14m', runs: 48 },
	{ name: 'Discord Mod Bot', type: 'Bot', status: 'running', runtime: '7d 3h', runs: 12 },
	{ name: 'Price Monitor', type: 'Automation', status: 'scheduled', runtime: '—', runs: 82 },
	{ name: 'News Digest Agent', type: 'Research', status: 'paused', runtime: '—', runs: 6 }
];

const STATUS_STYLES: Record<string, string> = {
	running: 'bg-green-500/10 text-green-600 dark:text-green-400',
	scheduled: 'bg-blue-500/10 text-blue-500',
	paused: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
};

export function AgentsDashboard() {
	const [tab, setTab] = useState('agents');

	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			<div className='mb-8 flex items-center justify-between'>
				<div><h1 className='text-3xl font-extrabold tracking-tight'>AI Agent Hosting</h1><p className='mt-1 text-sm text-muted-foreground'>Host, schedule, and monetize autonomous AI agents</p></div>
				<Link href='/agents/deploy' id='deploy-agent-btn' className={cn(buttonVariants({ variant: 'default' }), '')}><Bot className='size-4' />Deploy Agent</Link>
			</div>

			<div className='mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4'>
				{STATS.map((s) => { const Icon = s.icon; return (<Card key={s.label}><CardHeader className='pb-2'><div className='flex items-center justify-between'><p className='text-xs text-muted-foreground'>{s.label}</p><Icon className='size-4 text-muted-foreground' /></div></CardHeader><CardContent><p className='text-2xl font-bold'>{s.value}</p></CardContent></Card>); })}
			</div>

			<Tabs value={tab} onValueChange={setTab}>
				<TabsList className='mb-6'><TabsTrigger value='agents'>My Agents</TabsTrigger><TabsTrigger value='links'>Quick Actions</TabsTrigger></TabsList>
				<TabsContent value='agents'>
					<Card><CardContent className='p-0'>
						<Table>
							<TableHeader><TableRow><TableHead>Agent</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Runtime</TableHead><TableHead>Runs</TableHead><TableHead /></TableRow></TableHeader>
							<TableBody>{MY_AGENTS.map((a) => (
								<TableRow key={a.name}>
									<TableCell className='font-medium'>{a.name}</TableCell>
									<TableCell><Badge variant='secondary' className='text-xs'>{a.type}</Badge></TableCell>
									<TableCell><Badge variant='outline' className={`text-xs ${STATUS_STYLES[a.status]}`}>{a.status}</Badge></TableCell>
									<TableCell className='text-sm text-muted-foreground'>{a.runtime}</TableCell>
									<TableCell className='text-sm'>{a.runs}</TableCell>
									<TableCell><Button size='sm' variant='ghost' className='text-xs'>Manage</Button></TableCell>
								</TableRow>
							))}</TableBody>
						</Table>
					</CardContent></Card>
				</TabsContent>
				<TabsContent value='links'>
					<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
						{[{ label: 'Deploy Agent', desc: 'Launch a new autonomous agent', href: '/agents/deploy', icon: Bot }, { label: 'Marketplace', desc: 'Browse pre-built agent templates', href: '/agents/marketplace', icon: Store }].map((l) => {
							const Icon = l.icon;
							return (<Link key={l.label} href={l.href}><Card className='cursor-pointer hover:border-primary/40 transition-all duration-200 hover:-translate-y-1'><CardHeader><div className='flex items-center gap-2 mb-1'><Icon className='size-4 text-primary' /><CardTitle className='text-sm'>{l.label}</CardTitle></div><p className='text-xs text-muted-foreground'>{l.desc}</p></CardHeader></Card></Link>);
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
