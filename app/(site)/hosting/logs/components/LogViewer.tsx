'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const MOCK_LOGS = [
	{ ts: '10:42:01', level: 'INFO', msg: 'Build started for project: my-portfolio @ main' },
	{ ts: '10:42:02', level: 'INFO', msg: 'Cloning repository from GitHub...' },
	{ ts: '10:42:04', level: 'INFO', msg: 'Repository cloned successfully (2.3MB)' },
	{ ts: '10:42:05', level: 'INFO', msg: 'Installing dependencies with pnpm...' },
	{ ts: '10:42:18', level: 'INFO', msg: 'Dependencies installed (312 packages)' },
	{ ts: '10:42:19', level: 'INFO', msg: 'Running next build...' },
	{ ts: '10:42:22', level: 'WARN', msg: 'Image optimization: 3 images exceed recommended size (>500KB)' },
	{ ts: '10:42:24', level: 'INFO', msg: 'Compiled successfully in 4.2s' },
	{ ts: '10:42:24', level: 'INFO', msg: 'Generating static pages (12/12)' },
	{ ts: '10:42:25', level: 'INFO', msg: 'Build output size: 1.8MB (.next/)' },
	{ ts: '10:42:26', level: 'INFO', msg: 'Uploading build artifacts...' },
	{ ts: '10:42:28', level: 'INFO', msg: 'Artifacts uploaded to CDN edge (us-east-1)' },
	{ ts: '10:42:29', level: 'INFO', msg: 'Assigning subdomain: portfolio.cloudgrids.tech' },
	{ ts: '10:42:29', level: 'INFO', msg: 'Provisioning SSL certificate...' },
	{ ts: '10:42:31', level: 'INFO', msg: "SSL certificate issued via Let's Encrypt" },
	{ ts: '10:42:31', level: 'INFO', msg: 'DNS propagation complete' },
	{ ts: '10:42:32', level: 'INFO', msg: 'Deployment live at: https://portfolio.cloudgrids.tech' },
	{ ts: '10:42:32', level: 'INFO', msg: 'Health check passed (200 OK in 42ms)' },
	{ ts: '10:43:01', level: 'WARN', msg: 'Memory usage spike detected: 420MB/512MB' },
	{ ts: '10:43:45', level: 'ERROR', msg: 'Rate limit exceeded on /api/contact — 429 Too Many Requests' }
];

const LEVEL_STYLES: Record<string, string> = {
	INFO: 'bg-blue-500/10 text-blue-500',
	WARN: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	ERROR: 'bg-red-500/10 text-red-500'
};

export function LogViewer() {
	const [search, setSearch] = useState('');
	const [activeLevel, setActiveLevel] = useState('all');

	const filtered = useMemo(
		() =>
			MOCK_LOGS.filter((l) => {
				const matchLevel = activeLevel === 'all' || l.level === activeLevel;
				const matchSearch = l.msg.toLowerCase().includes(search.toLowerCase());
				return matchLevel && matchSearch;
			}),
		[activeLevel, search]
	);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Logs</h1>
				<p className="text-sm text-muted-foreground">Real-time build and runtime logs</p>
			</div>

			<div className="mb-4 relative max-w-sm">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input className="pl-9" placeholder="Filter logs…" value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>

			<Tabs value={activeLevel} onValueChange={setActiveLevel}>
				<TabsList className="mb-4">
					<TabsTrigger value="all">All ({MOCK_LOGS.length})</TabsTrigger>
					<TabsTrigger value="INFO">INFO ({MOCK_LOGS.filter((l) => l.level === 'INFO').length})</TabsTrigger>
					<TabsTrigger value="WARN">WARN ({MOCK_LOGS.filter((l) => l.level === 'WARN').length})</TabsTrigger>
					<TabsTrigger value="ERROR">ERROR ({MOCK_LOGS.filter((l) => l.level === 'ERROR').length})</TabsTrigger>
				</TabsList>

				<TabsContent value={activeLevel}>
					<ScrollArea className="h-[520px] rounded-lg border border-border bg-zinc-950 p-4">
						<div className="flex flex-col gap-1 font-mono text-xs">
							{filtered.map((log, i) => (
								<div key={i} className="flex items-start gap-3">
									<span className="text-zinc-500 shrink-0 w-16">{log.ts}</span>
									<Badge variant="outline" className={`shrink-0 py-0 ${LEVEL_STYLES[log.level]}`}>
										{log.level}
									</Badge>
									<span className="text-zinc-300 leading-relaxed">{log.msg}</span>
								</div>
							))}
							{filtered.length === 0 && <p className="text-zinc-500 text-center py-8">No logs match your filter.</p>}
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	);
}
