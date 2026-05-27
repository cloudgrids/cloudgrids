'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cloud, Upload } from 'lucide-react';

const MOCK_QUEUE = [
	{ id: '1', name: 'hero-banner.jpg', size: '2.4 MB', type: 'image', progress: 100, status: 'complete' },
	{ id: '2', name: 'product-demo.mp4', size: '48 MB', type: 'video', progress: 64, status: 'uploading' },
	{ id: '3', name: 'dataset-prompts.json', size: '1.2 MB', type: 'document', progress: 100, status: 'complete' },
	{ id: '4', name: 'broken-file.zip', size: '0 B', type: 'archive', progress: 0, status: 'error' }
];

const STATUS_STYLES: Record<string, string> = {
	complete: 'bg-green-500/10 text-green-600 dark:text-green-400',
	uploading: 'bg-blue-500/10 text-blue-500',
	error: 'bg-red-500/10 text-red-500'
};

export function UploadManager() {
	const [options, setOptions] = useState({ folder: '', isPublic: true, preset: 'none' });

	return (
		<div className='mx-auto max-w-5xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>Upload Assets</h1><p className='text-sm text-muted-foreground'>Drag and drop files or browse to upload</p></div>
			<div className='mb-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-8 py-16 text-center hover:border-primary/50 transition-colors'>
				<Cloud className='mb-3 size-12 text-muted-foreground' />
				<p className='mb-1 font-medium text-foreground'>Drop files here or</p>
				<Button variant='outline' id='browse-files-btn' className='mt-2'><Upload className='size-4' />Browse Files</Button>
				<p className='mt-3 text-xs text-muted-foreground'>Images, videos, documents up to 2 GB each</p>
			</div>

			<div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
				<div className='flex flex-col gap-1.5'><Label>Folder</Label><Input value={options.folder} onChange={(e) => setOptions((o) => ({ ...o, folder: e.target.value }))} placeholder='uploads/' /></div>
				<div className='flex flex-col gap-1.5'><Label>Transformation Preset</Label>
					<Select value={options.preset} onValueChange={(v) => setOptions((o) => ({ ...o, preset: v ?? '' }))}>
						<SelectTrigger><SelectValue /></SelectTrigger>
						<SelectContent><SelectItem value='none'>None</SelectItem><SelectItem value='thumbnail'>Thumbnail (200×200)</SelectItem><SelectItem value='web'>Web optimized (WebP 80%)</SelectItem><SelectItem value='avatar'>Avatar (circular, 128px)</SelectItem></SelectContent>
					</Select>
				</div>
				<div className='flex items-center gap-3 pt-5'><Switch checked={options.isPublic} onCheckedChange={(v) => setOptions((o) => ({ ...o, isPublic: v }))} /><Label>Public access</Label></div>
			</div>

			<Card>
				<CardHeader><CardTitle className='text-base'>Upload Queue</CardTitle></CardHeader>
				<CardContent className='p-0'>
					<Table>
						<TableHeader><TableRow><TableHead>Filename</TableHead><TableHead>Size</TableHead><TableHead>Type</TableHead><TableHead>Progress</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
						<TableBody>
							{MOCK_QUEUE.map((f) => (
								<TableRow key={f.id}>
									<TableCell className='font-mono text-xs'>{f.name}</TableCell>
									<TableCell className='text-xs text-muted-foreground'>{f.size}</TableCell>
									<TableCell><Badge variant='secondary' className='text-xs'>{f.type}</Badge></TableCell>
									<TableCell className='w-36'><Progress value={f.progress} className='h-1.5' /></TableCell>
									<TableCell><Badge variant='outline' className={`text-xs ${STATUS_STYLES[f.status]}`}>{f.status}</Badge></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
