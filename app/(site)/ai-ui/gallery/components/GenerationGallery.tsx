'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Eye } from 'lucide-react';

const MOCK_GALLERY = [
	{ id: '1', inputType: 'Screenshot', framework: 'shadcn', gradient: 'from-blue-600 to-cyan-500', createdAt: '5m ago' },
	{ id: '2', inputType: 'Text', framework: 'React+Tailwind', gradient: 'from-purple-600 to-pink-500', createdAt: '22m ago' },
	{ id: '3', inputType: 'Screenshot', framework: 'Next.js', gradient: 'from-green-600 to-emerald-500', createdAt: '1h ago' },
	{ id: '4', inputType: 'Text', framework: 'MUI', gradient: 'from-orange-600 to-red-500', createdAt: '2h ago' },
	{ id: '5', inputType: 'Screenshot', framework: 'shadcn', gradient: 'from-indigo-600 to-blue-500', createdAt: '3h ago' },
	{ id: '6', inputType: 'Text', framework: 'React+Tailwind', gradient: 'from-teal-600 to-cyan-500', createdAt: '5h ago' },
	{ id: '7', inputType: 'Screenshot', framework: 'Next.js', gradient: 'from-pink-600 to-rose-500', createdAt: '8h ago' },
	{ id: '8', inputType: 'Text', framework: 'shadcn', gradient: 'from-violet-600 to-purple-500', createdAt: '12h ago' },
	{ id: '9', inputType: 'Screenshot', framework: 'React+Tailwind', gradient: 'from-amber-600 to-yellow-500', createdAt: '1d ago' },
	{ id: '10', inputType: 'Text', framework: 'MUI', gradient: 'from-sky-600 to-blue-500', createdAt: '1d ago' },
	{ id: '11', inputType: 'Screenshot', framework: 'shadcn', gradient: 'from-lime-600 to-green-500', createdAt: '2d ago' },
	{ id: '12', inputType: 'Text', framework: 'Next.js', gradient: 'from-rose-600 to-pink-500', createdAt: '2d ago' }
];

const FRAMEWORKS = ['All', 'React+Tailwind', 'shadcn', 'Next.js', 'MUI'];

const INPUT_STYLES: Record<string, string> = { Screenshot: 'bg-blue-500/10 text-blue-500', Text: 'bg-purple-500/10 text-purple-500' };

export function GenerationGallery() {
	const [frameworkFilter, setFrameworkFilter] = useState('All');

	const filtered = frameworkFilter === 'All' ? MOCK_GALLERY : MOCK_GALLERY.filter((g) => g.framework === frameworkFilter);

	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>Generation Gallery</h1><p className='text-sm text-muted-foreground'>Past AI-generated components</p></div>

			<Tabs value={frameworkFilter} onValueChange={setFrameworkFilter}>
				<TabsList className='mb-6'>{FRAMEWORKS.map((f) => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}</TabsList>
				<TabsContent value={frameworkFilter}>
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
						{filtered.map((g) => (
							<Card key={g.id} className='group overflow-hidden border-border hover:border-primary/40 transition-all duration-200 hover:-translate-y-1 p-0'>
								<div className={`h-28 bg-gradient-to-br ${g.gradient} opacity-70`} />
								<CardContent className='p-3'>
									<div className='flex flex-wrap gap-1.5 mb-2'>
										<Badge variant='outline' className={`text-xs py-0 ${INPUT_STYLES[g.inputType]}`}>{g.inputType}</Badge>
										<Badge variant='secondary' className='text-xs py-0'>{g.framework}</Badge>
									</div>
									<p className='text-[10px] text-muted-foreground mb-2'>{g.createdAt}</p>
									<div className='flex gap-1.5'>
										<Button size='sm' variant='outline' className='flex-1 h-7 text-xs'><Eye className='size-3' />View</Button>
										<Button size='sm' variant='ghost' className='h-7 text-xs'><Code2 className='size-3' /></Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
