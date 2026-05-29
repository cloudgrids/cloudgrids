'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BoilerplateGrid } from './BoilerplateGrid';

const CATEGORIES = ['All', 'auth', 'payments', 'ai', 'fullstack', 'api', 'bot'] as const;

export function Boilerplates() {
	const [activeCategory, setActiveCategory] = useState<string>('All');

	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-extrabold tracking-tight text-foreground'>SaaS Boilerplates</h1>
				<p className='mt-2 text-sm text-muted-foreground'>
					Production-ready starter templates. Deploy in minutes, not weeks.
				</p>
			</div>

			<Tabs value={activeCategory} onValueChange={setActiveCategory}>
				<TabsList className='mb-6'>
					{CATEGORIES.map((cat) => (
						<TabsTrigger key={cat} value={cat} className='capitalize'>
							{cat}
						</TabsTrigger>
					))}
				</TabsList>

				{CATEGORIES.map((cat) => (
					<TabsContent key={cat} value={cat}>
						<BoilerplateGrid category={cat} />
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
