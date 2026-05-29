'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';

const TIERS = [
	{ name: 'Free', price: '$0', period: '', features: ['5 public posts/mo', 'Basic analytics', 'Community access'], highlight: false },
	{ name: 'Basic', price: '$9.99', period: '/mo', features: ['Unlimited posts', 'PPV content access', 'Download packs', 'Priority support', 'Advanced analytics'], highlight: true },
	{ name: 'Premium', price: '$19.99', period: '/mo', features: ['Everything in Basic', 'Private feed access', 'Early access drops', 'Discord community', 'Direct messages', '1:1 monthly call'], highlight: false }
];

export function PaywallConfig() {
	const [settings, setSettings] = useState({ watermark: true, encrypted: true, previewPct: 20, minPurchase: 1.99 });

	return (
		<div className='mx-auto max-w-4xl px-4 py-10'>
			<div className='mb-8'><h1 className='text-2xl font-bold tracking-tight'>Paywall Configuration</h1><p className='text-sm text-muted-foreground'>Set up subscription tiers and pay-per-view settings</p></div>

			{/* Tiers */}
			<h2 className='mb-4 text-base font-semibold'>Subscription Tiers</h2>
			<div className='mb-10 grid grid-cols-1 gap-4 md:grid-cols-3'>
				{TIERS.map((tier) => (
					<Card key={tier.name} className={tier.highlight ? 'border-primary shadow-md shadow-primary/10' : ''}>
						<CardHeader><CardTitle className='text-base'>{tier.name}</CardTitle><CardDescription className='text-2xl font-bold text-foreground'>{tier.price}<span className='text-sm font-normal text-muted-foreground'>{tier.period}</span></CardDescription></CardHeader>
						<CardContent className='flex flex-col gap-4'>
							<ul className='flex flex-col gap-2'>{tier.features.map((f) => (<li key={f} className='flex items-center gap-2 text-xs text-muted-foreground'><Check className='size-3.5 shrink-0 text-primary' />{f}</li>))}</ul>
							<Button variant={tier.highlight ? 'default' : 'outline'} size='sm' id={`tier-edit-${tier.name.toLowerCase()}`}>Edit Tier</Button>
						</CardContent>
					</Card>
				))}
			</div>

			<Separator className='mb-8' />

			{/* Settings */}
			<h2 className='mb-4 text-base font-semibold'>Pay-Per-View Settings</h2>
			<Card className='mb-6'>
				<CardContent className='flex flex-col gap-5 pt-5'>
					<div className='flex items-center justify-between'><div><Label>Watermarking</Label><p className='text-xs text-muted-foreground'>Add invisible watermarks to protect your content</p></div><Switch checked={settings.watermark} onCheckedChange={(v) => setSettings((s) => ({ ...s, watermark: v }))} /></div>
					<Separator />
					<div className='flex items-center justify-between'><div><Label>Encrypted Delivery</Label><p className='text-xs text-muted-foreground'>Encrypt assets during transfer for security</p></div><Switch checked={settings.encrypted} onCheckedChange={(v) => setSettings((s) => ({ ...s, encrypted: v }))} /></div>
					<Separator />
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-1.5'><Label>Preview %</Label><Input type='number' value={settings.previewPct} onChange={(e) => setSettings((s) => ({ ...s, previewPct: Number(e.target.value) }))} /><p className='text-xs text-muted-foreground'>% of content shown as preview</p></div>
						<div className='flex flex-col gap-1.5'><Label>Min Purchase (USD)</Label><Input type='number' step='0.01' value={settings.minPurchase} onChange={(e) => setSettings((s) => ({ ...s, minPurchase: Number(e.target.value) }))} /><p className='text-xs text-muted-foreground'>Minimum PPV price allowed</p></div>
					</div>
				</CardContent>
			</Card>
			<Button id='save-paywall-settings'>Save Settings</Button>
		</div>
	);
}
