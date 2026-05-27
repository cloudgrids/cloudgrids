'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ArrowUpRight, FileImage, FileText, FileVideo, Globe, HardDrive, Upload, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STATS = [
	{ label: 'Total Assets', value: '2,847', icon: HardDrive },
	{ label: 'Storage Used', value: '6.8 GB / 10 GB', icon: HardDrive, progress: 68 },
	{ label: 'Bandwidth', value: '1.2 TB', icon: Globe },
	{ label: 'CDN Requests', value: '4.2M', icon: Zap }
];

const MOCK_ASSETS = [
	{ id: '1', name: 'hero-banner.jpg', size: '2.4 MB', type: 'image', color: 'from-blue-500 to-cyan-500' },
	{ id: '2', name: 'product-demo.mp4', size: '48 MB', type: 'video', color: 'from-purple-500 to-pink-500' },
	{ id: '3', name: 'ai-art-vol3.zip', size: '124 MB', type: 'archive', color: 'from-orange-500 to-red-500' },
	{ id: '4', name: 'profile-pic.png', size: '0.8 MB', type: 'image', color: 'from-green-500 to-emerald-500' },
	{ id: '5', name: 'tutorial-intro.mp4', size: '92 MB', type: 'video', color: 'from-indigo-500 to-blue-500' },
	{ id: '6', name: 'dataset-prompts.json', size: '1.2 MB', type: 'document', color: 'from-yellow-500 to-orange-500' },
	{ id: '7', name: 'logo-dark.svg', size: '14 KB', type: 'image', color: 'from-teal-500 to-cyan-500' },
	{ id: '8', name: 'readme.pdf', size: '0.3 MB', type: 'document', color: 'from-pink-500 to-rose-500' },
	{ id: '9', name: 'screenshot-1.png', size: '1.8 MB', type: 'image', color: 'from-violet-500 to-purple-500' },
	{ id: '10', name: 'walkthrough.mp4', size: '210 MB', type: 'video', color: 'from-amber-500 to-yellow-500' },
	{ id: '11', name: 'banner-2x.png', size: '3.1 MB', type: 'image', color: 'from-sky-500 to-blue-500' },
	{ id: '12', name: 'metadata.csv', size: '0.9 MB', type: 'document', color: 'from-lime-500 to-green-500' }
];

const TYPE_ICON: Record<string, React.ElementType> = {
	image: FileImage,
	video: FileVideo,
	document: FileText,
	archive: FileText
};

export function Media() {
	const [activeTab, setActiveTab] = useState('all');

	const filtered = activeTab === 'all' ? MOCK_ASSETS : MOCK_ASSETS.filter((a) => a.type === activeTab);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight">Media Library</h1>
					<p className="mt-1 text-sm text-muted-foreground">Image/video hosting, CDN delivery, transformations</p>
				</div>
				<Link href="/media/upload" id="upload-media-btn" className={cn(buttonVariants({ variant: 'default' }), '')}>
					<Upload className="size-4" />
					Upload
				</Link>
			</div>

			{/* Stats */}
			<div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
				{STATS.map((s) => {
					const Icon = s.icon;
					return (
						<Card key={s.label}>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<p className="text-xs text-muted-foreground">{s.label}</p>
									<Icon className="size-4 text-muted-foreground" />
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-xl font-bold">{s.value}</p>
								{'progress' in s && <Progress value={s.progress ?? 0} className="mt-2 h-1.5" />}
							</CardContent>
						</Card>
					);
				})}
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="mb-6">
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="image">Images</TabsTrigger>
					<TabsTrigger value="video">Videos</TabsTrigger>
					<TabsTrigger value="document">Documents</TabsTrigger>
				</TabsList>
				<TabsContent value={activeTab}>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
						{filtered.map((asset) => {
							const Icon = TYPE_ICON[asset.type] ?? FileText;
							return (
								<Card
									key={asset.id}
									className="group overflow-hidden border-border hover:border-primary/40 transition-all duration-200 cursor-pointer p-0"
								>
									<div className={`flex h-28 items-center justify-center bg-gradient-to-br ${asset.color} opacity-60`}>
										<Icon className="size-8 text-white" />
									</div>
									<CardContent className="p-3">
										<p className="truncate text-xs font-medium text-foreground">{asset.name}</p>
										<div className="mt-1 flex items-center justify-between">
											<span className="text-[10px] text-muted-foreground">{asset.size}</span>
											<Badge variant="secondary" className="text-[10px] py-0">
												{asset.type}
											</Badge>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</TabsContent>
			</Tabs>

			<div className="mt-8 grid grid-cols-3 gap-3">
				{[
					{ label: 'Upload', href: '/media/upload' },
					{ label: 'Transform', href: '/media/transform' },
					{ label: 'CDN', href: '/media/cdn' }
				].map((l) => (
					<Link href={l.href} key={l.label} className={cn(buttonVariants({ variant: 'outline' }), '')}>
						{l.label} <ArrowUpRight className="size-3.5" />
					</Link>
				))}
			</div>
		</div>
	);
}
