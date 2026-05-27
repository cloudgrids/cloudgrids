'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap } from 'lucide-react';

const MOCK_RESULTS = [
	{ field: 'product_name', value: 'Sony WH-1000XM5 Headphones', confidence: 'high' },
	{ field: 'price', value: '$349.99', confidence: 'high' },
	{ field: 'original_price', value: '$399.99', confidence: 'high' },
	{ field: 'discount', value: '12% off', confidence: 'medium' },
	{ field: 'rating', value: '4.7 / 5.0', confidence: 'high' },
	{ field: 'review_count', value: '2,847 ratings', confidence: 'high' },
	{ field: 'availability', value: 'In Stock', confidence: 'high' },
	{ field: 'seller', value: 'Amazon.com', confidence: 'medium' }
];

const CONFIDENCE_STYLES: Record<string, string> = {
	high: 'bg-green-500/10 text-green-600 dark:text-green-400',
	medium: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
	low: 'bg-red-500/10 text-red-500'
};

export function ExtractBuilder() {
	const [state, setState] = useState({ url: 'https://amazon.com/dp/B09XS7JWHH', prompt: 'Extract the product name, price, original price, discount, rating, review count, availability, and seller name.', jsRender: true, proxyRotation: false, antiBot: false, loading: false, extracted: false });

	const handleRun = () => {
		setState((s) => ({ ...s, loading: true }));
		setTimeout(() => setState((s) => ({ ...s, loading: false, extracted: true })), 1500);
	};

	return (
		<div className='mx-auto max-w-5xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>AI Extraction</h1><p className='text-sm text-muted-foreground'>Describe what you want — our AI extracts it</p></div>

			<Card className='mb-6'>
				<CardHeader><CardTitle className='text-base'>Extraction Config</CardTitle></CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<div className='flex flex-col gap-1.5'><Label>Target URL</Label><Input value={state.url} onChange={(e) => setState((s) => ({ ...s, url: e.target.value }))} placeholder='https://example.com/page' /></div>
					<div className='flex flex-col gap-1.5'><Label>What to extract?</Label><Textarea value={state.prompt} onChange={(e) => setState((s) => ({ ...s, prompt: e.target.value }))} rows={3} placeholder='Extract all product names and prices...' /></div>
					<div className='flex flex-wrap gap-6'>
						<div className='flex items-center gap-2'><Switch checked={state.jsRender} onCheckedChange={(v) => setState((s) => ({ ...s, jsRender: v }))} /><Label>JS Rendering</Label></div>
						<div className='flex items-center gap-2'><Switch checked={state.proxyRotation} onCheckedChange={(v) => setState((s) => ({ ...s, proxyRotation: v }))} /><Label>Proxy Rotation</Label></div>
						<div className='flex items-center gap-2'><Switch checked={state.antiBot} onCheckedChange={(v) => setState((s) => ({ ...s, antiBot: v }))} /><Label>Anti-bot Bypass</Label></div>
					</div>
					<Button id='run-extraction-btn' onClick={handleRun} disabled={state.loading} className='w-fit gap-2'><Zap className='size-4' />{state.loading ? 'Extracting…' : 'Run Extraction'}</Button>
				</CardContent>
			</Card>

			{(state.loading || state.extracted) && (
				<Card>
					<CardHeader><CardTitle className='text-base'>Extracted Data</CardTitle></CardHeader>
					<CardContent className='p-0'>
						{state.loading ? (
							<div className='flex flex-col gap-2 p-4'>{[...Array(8)].map((_, i) => <Skeleton key={i} className='h-8 w-full' />)}</div>
						) : (
							<Table>
								<TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Extracted Value</TableHead><TableHead>Confidence</TableHead></TableRow></TableHeader>
								<TableBody>
									{MOCK_RESULTS.map((r) => (
										<TableRow key={r.field}>
											<TableCell className='font-mono text-xs'>{r.field}</TableCell>
											<TableCell className='text-sm'>{r.value}</TableCell>
											<TableCell><Badge variant='outline' className={`text-xs ${CONFIDENCE_STYLES[r.confidence]}`}>{r.confidence}</Badge></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
