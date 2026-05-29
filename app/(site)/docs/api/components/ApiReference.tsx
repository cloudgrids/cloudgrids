'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const METHOD_STYLES: Record<string, string> = {
	GET: 'bg-blue-500/10 text-blue-500',
	POST: 'bg-green-500/10 text-green-600 dark:text-green-400',
	DELETE: 'bg-red-500/10 text-red-500',
	PATCH: 'bg-orange-500/10 text-orange-500'
};

const MOCK_ENDPOINTS = [
	{
		id: 'list-deployments', group: 'Deployments', method: 'GET', path: '/v1/deployments',
		description: 'Returns a paginated list of all deployments for the authenticated user.',
		params: [
			{ name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
			{ name: 'limit', type: 'integer', required: false, description: 'Items per page (default: 20, max: 100)' },
			{ name: 'status', type: 'string', required: false, description: 'Filter by status: live | building | failed' }
		],
		request: `curl -X GET https://api.cloudgrids.tech/v1/deployments \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
		response: `{
  "data": [
    {
      "id": "dep_a1b2c3",
      "project": "my-portfolio",
      "branch": "main",
      "commit": "a3f2c1d",
      "status": "live",
      "url": "https://portfolio.cloudgrids.tech",
      "region": "us-east-1",
      "createdAt": "2025-05-27T10:42:32Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 47 }
}`
	},
	{
		id: 'create-deployment', group: 'Deployments', method: 'POST', path: '/v1/deployments',
		description: 'Trigger a new deployment from a GitHub repository.',
		params: [
			{ name: 'repoUrl', type: 'string', required: true, description: 'GitHub repository URL' },
			{ name: 'branch', type: 'string', required: true, description: 'Branch to deploy' },
			{ name: 'framework', type: 'string', required: false, description: 'Framework hint: nextjs | node | python | go' }
		],
		request: `curl -X POST https://api.cloudgrids.tech/v1/deployments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"repoUrl":"https://github.com/you/project","branch":"main"}'`,
		response: `{
  "id": "dep_d4e5f6",
  "status": "building",
  "url": "https://project.cloudgrids.tech",
  "buildLogs": "/v1/deployments/dep_d4e5f6/logs",
  "createdAt": "2025-05-27T11:00:00Z"
}`
	},
	{
		id: 'list-domains', group: 'Domains', method: 'GET', path: '/v1/domains',
		description: 'List all configured domains and their verification status.',
		params: [
			{ name: 'type', type: 'string', required: false, description: 'Filter by type: subdomain | custom' }
		],
		request: `curl -X GET https://api.cloudgrids.tech/v1/domains \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
		response: `{
  "data": [
    {
      "id": "dom_x1y2z3",
      "domain": "mysite.com",
      "type": "custom",
      "status": "active",
      "ssl": "active",
      "verifiedAt": "2025-05-20T09:00:00Z"
    }
  ]
}`
	}
];

const GROUPS = [...new Set(MOCK_ENDPOINTS.map((e) => e.group))];

export function ApiReference() {
	const [selectedId, setSelectedId] = useState(MOCK_ENDPOINTS[0].id);
	const selected = MOCK_ENDPOINTS.find((e) => e.id === selectedId)!;

	return (
		<div className='flex h-[calc(100vh-56px)] max-w-6xl mx-auto'>
			{/* Sidebar */}
			<aside className='w-56 shrink-0 border-r border-border'>
				<div className='p-4'>
					<p className='mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>API Reference</p>
					{GROUPS.map((group) => (
						<div key={group} className='mb-4'>
							<p className='mb-1.5 text-xs font-semibold text-foreground'>{group}</p>
							{MOCK_ENDPOINTS.filter((e) => e.group === group).map((ep) => (
								<button key={ep.id} onClick={() => setSelectedId(ep.id)}
									className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${selectedId === ep.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
									<Badge variant='outline' className={`shrink-0 py-0 text-[10px] ${METHOD_STYLES[ep.method]}`}>{ep.method}</Badge>
									<span className='truncate font-mono'>{ep.path}</span>
								</button>
							))}
						</div>
					))}
				</div>
			</aside>

			{/* Content */}
			<ScrollArea className='flex-1 p-8'>
				<div className='flex items-center gap-3 mb-3'>
					<Badge className={`${METHOD_STYLES[selected.method]}`} variant='outline'>{selected.method}</Badge>
					<code className='text-sm font-mono font-bold'>{selected.path}</code>
				</div>
				<p className='mb-6 text-sm text-muted-foreground'>{selected.description}</p>
				<Separator className='mb-6' />

				<Tabs defaultValue='params'>
					<TabsList className='mb-4'>
						<TabsTrigger value='params'>Parameters</TabsTrigger>
						<TabsTrigger value='request'>Request</TabsTrigger>
						<TabsTrigger value='response'>Response</TabsTrigger>
					</TabsList>

					<TabsContent value='params'>
						<div className='rounded-lg border border-border'>
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
											<TableCell><code className='text-xs'>{p.name}</code></TableCell>
											<TableCell><Badge variant='secondary' className='text-xs'>{p.type}</Badge></TableCell>
											<TableCell>{p.required ? <Badge variant='outline' className='bg-red-500/10 text-red-500 text-xs'>required</Badge> : <span className='text-xs text-muted-foreground'>optional</span>}</TableCell>
											<TableCell className='text-xs text-muted-foreground'>{p.description}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</TabsContent>

					<TabsContent value='request'>
						<pre className='rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300 overflow-x-auto font-mono leading-relaxed'>{selected.request}</pre>
					</TabsContent>

					<TabsContent value='response'>
						<pre className='rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300 overflow-x-auto font-mono leading-relaxed'>{selected.response}</pre>
					</TabsContent>
				</Tabs>
			</ScrollArea>
		</div>
	);
}
