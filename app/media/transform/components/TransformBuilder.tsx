'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Copy, Image as ImageIcon } from 'lucide-react';

const MOCK_URL = 'https://cdn.cloudgrids.tech/my-asset/hero-banner.jpg';

export function TransformBuilder() {
	const [opts, setOpts] = useState({ url: MOCK_URL, width: '1200', height: '630', format: 'webp', quality: '80', crop: 'cover', grayscale: false, blur: false });

	const buildUrl = () => {
		const params: string[] = [];
		if (opts.width) params.push(`w=${opts.width}`);
		if (opts.height) params.push(`h=${opts.height}`);
		if (opts.format) params.push(`f=${opts.format}`);
		if (opts.quality) params.push(`q=${opts.quality}`);
		if (opts.crop) params.push(`fit=${opts.crop}`);
		if (opts.grayscale) params.push('grayscale=1');
		if (opts.blur) params.push('blur=8');
		const base = opts.url || MOCK_URL;
		return `${base}?${params.join('&')}`;
	};

	const setStr = (key: keyof typeof opts) => (v: string | null) => setOpts((o) => ({ ...o, [key]: v ?? '' }));
	const setBool = (key: keyof typeof opts) => (v: boolean) => setOpts((o) => ({ ...o, [key]: v }));

	return (
		<div className='mx-auto max-w-5xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>Image Transformer</h1><p className='text-sm text-muted-foreground'>Resize, convert, and apply filters on-the-fly</p></div>
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
				{/* Options */}
				<Card>
					<CardHeader><CardTitle className='text-base'>Transformation Options</CardTitle></CardHeader>
					<CardContent className='flex flex-col gap-4'>
						<div className='flex flex-col gap-1.5'><Label>Source URL</Label><Input value={opts.url} onChange={(e) => setStr('url')(e.target.value)} placeholder='https://cdn.cloudgrids.tech/...' /></div>
						<div className='grid grid-cols-2 gap-3'>
							<div className='flex flex-col gap-1.5'><Label>Width (px)</Label><Input value={opts.width} onChange={(e) => setStr('width')(e.target.value)} /></div>
							<div className='flex flex-col gap-1.5'><Label>Height (px)</Label><Input value={opts.height} onChange={(e) => setStr('height')(e.target.value)} /></div>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<div className='flex flex-col gap-1.5'><Label>Format</Label>
								<Select value={opts.format} onValueChange={setStr('format')}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value='webp'>WebP</SelectItem><SelectItem value='jpeg'>JPEG</SelectItem><SelectItem value='png'>PNG</SelectItem><SelectItem value='avif'>AVIF</SelectItem></SelectContent></Select>
							</div>
							<div className='flex flex-col gap-1.5'><Label>Quality</Label>
								<Select value={opts.quality} onValueChange={setStr('quality')}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['100','90','80','70','60'].map((q) => <SelectItem key={q} value={q}>{q}%</SelectItem>)}</SelectContent></Select>
							</div>
						</div>
						<div className='flex flex-col gap-1.5'><Label>Crop Mode</Label>
							<Select value={opts.crop} onValueChange={setStr('crop')}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value='cover'>Cover</SelectItem><SelectItem value='contain'>Contain</SelectItem><SelectItem value='fill'>Fill</SelectItem></SelectContent></Select>
						</div>
						<Separator />
						<div className='flex items-center justify-between'><Label>Grayscale</Label><Switch checked={opts.grayscale} onCheckedChange={(v) => setBool('grayscale')(v)} /></div>
						<div className='flex items-center justify-between'><Label>Blur</Label><Switch checked={opts.blur} onCheckedChange={(v) => setBool('blur')(v)} /></div>
					</CardContent>
				</Card>

				{/* Output */}
				<div className='flex flex-col gap-4'>
					<Card>
						<CardHeader><CardTitle className='text-base'>Preview</CardTitle></CardHeader>
						<CardContent>
							<div className='flex h-48 items-center justify-center rounded-lg bg-muted'>
								<div className='flex flex-col items-center gap-2 text-muted-foreground'>
									<ImageIcon className='size-10' />
									<span className='text-xs'>{opts.width} × {opts.height} · {opts.format.toUpperCase()}</span>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader><div className='flex items-center justify-between'><CardTitle className='text-base'>Generated URL</CardTitle>
							<Button size='sm' variant='outline' onClick={() => navigator.clipboard.writeText(buildUrl())}><Copy className='size-3.5' />Copy</Button>
						</div></CardHeader>
						<CardContent>
							<pre className='rounded-lg bg-zinc-950 p-3 text-xs text-zinc-300 overflow-x-auto font-mono break-all whitespace-pre-wrap'>{buildUrl()}</pre>
							<div className='mt-3 flex gap-2'>
								{opts.grayscale && <Badge variant='secondary'>Grayscale</Badge>}
								{opts.blur && <Badge variant='secondary'>Blur</Badge>}
								<Badge variant='outline'>{opts.format.toUpperCase()}</Badge>
								<Badge variant='outline'>Q{opts.quality}</Badge>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
