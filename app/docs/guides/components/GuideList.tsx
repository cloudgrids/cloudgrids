'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock } from 'lucide-react';

const MOCK_GUIDES = [
	{ title: 'Deploy Your First Project', description: 'Connect your GitHub repo and deploy to cloudgrids.tech in under 5 minutes.', difficulty: 'Beginner', category: 'Deployment', readTime: '5 min' },
	{ title: 'Custom Domains & SSL', description: 'Add your own domain and configure automatic SSL certificate issuance.', difficulty: 'Beginner', category: 'Domains', readTime: '8 min' },
	{ title: 'Environment Variables & Secrets', description: 'Securely manage config across Production, Preview, and Dev environments.', difficulty: 'Beginner', category: 'Configuration', readTime: '6 min' },
	{ title: 'AI Metadata Extraction API', description: 'Use the metadata API to extract structured data from any URL with a single call.', difficulty: 'Intermediate', category: 'API', readTime: '12 min' },
	{ title: 'Building a Scraping Pipeline', description: 'Create a scheduled scraping pipeline with export webhooks to your database.', difficulty: 'Intermediate', category: 'Scraping', readTime: '18 min' },
	{ title: 'Creator Monetization Setup', description: 'Configure tiered subscriptions, PPV content, and watermarked delivery.', difficulty: 'Intermediate', category: 'Creator', readTime: '15 min' },
	{ title: 'Image Transformations via CDN URL', description: 'Use URL parameters to resize, convert, and apply filters on-the-fly.', difficulty: 'Advanced', category: 'Media', readTime: '10 min' },
	{ title: 'Deploying an AI Agent', description: 'Build, configure, and host an autonomous AI agent with cron scheduling and webhooks.', difficulty: 'Advanced', category: 'Agents', readTime: '22 min' }
];

const DIFFICULTY_STYLES: Record<string, string> = {
	Beginner: 'bg-green-500/10 text-green-600 dark:text-green-400',
	Intermediate: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	Advanced: 'bg-red-500/10 text-red-500'
};

export function GuideList() {
	const [diffFilter, setDiffFilter] = useState('All');

	const filtered = diffFilter === 'All' ? MOCK_GUIDES : MOCK_GUIDES.filter((g) => g.difficulty === diffFilter);

	return (
		<div className='mx-auto max-w-5xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>Guides</h1><p className='text-sm text-muted-foreground'>Step-by-step tutorials for every skill level</p></div>

			<div className='mb-6 flex gap-2 flex-wrap'>
				{['All', 'Beginner', 'Intermediate', 'Advanced'].map((d) => (
					<Button key={d} variant={diffFilter === d ? 'default' : 'outline'} size='sm' onClick={() => setDiffFilter(d)} id={`filter-${d.toLowerCase()}`}>{d}</Button>
				))}
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				{filtered.map((g) => (
					<Card key={g.title} className='group cursor-pointer border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'>
						<CardHeader>
							<div className='flex items-start justify-between'>
								<div className='flex gap-2 mb-2'>
									<Badge variant='outline' className={`text-xs ${DIFFICULTY_STYLES[g.difficulty]}`}>{g.difficulty}</Badge>
									<Badge variant='secondary' className='text-xs'>{g.category}</Badge>
								</div>
								<div className='flex items-center gap-1 text-xs text-muted-foreground'><Clock className='size-3' />{g.readTime}</div>
							</div>
							<CardTitle className='text-sm leading-snug'>{g.title}</CardTitle>
							<CardDescription className='text-xs'>{g.description}</CardDescription>
							<div className='flex items-center gap-1 text-xs text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity'><span>Read guide</span><ArrowRight className='size-3' /></div>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
