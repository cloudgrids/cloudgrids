'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Bot, Zap } from 'lucide-react';

export function AgentDeploy() {
	const [config, setConfig] = useState({ name: '', type: 'scraping', runtime: 'node', model: 'gpt-4o', schedule: 'manual', prompt: '', persistent: false, webhook: '' });

	const setStr = (key: keyof typeof config) => (v: string | null) => setConfig((c) => ({ ...c, [key]: v ?? '' }));
	const setBool = (key: keyof typeof config) => (v: boolean) => setConfig((c) => ({ ...c, [key]: v }));

	return (
		<div className='mx-auto max-w-3xl px-4 py-10'>
			<div className='mb-6'><h1 className='text-2xl font-bold tracking-tight'>Deploy an Agent</h1><p className='text-sm text-muted-foreground'>Configure and launch an autonomous AI agent</p></div>

			<div className='flex flex-col gap-6'>
				<Card>
					<CardHeader><CardTitle className='text-base'>Basic Configuration</CardTitle></CardHeader>
					<CardContent className='flex flex-col gap-4'>
						<div className='flex flex-col gap-1.5'><Label>Agent Name</Label><Input value={config.name} onChange={(e) => setStr('name')(e.target.value)} placeholder='My Research Agent' /></div>
						<div className='grid grid-cols-2 gap-3'>
							<div className='flex flex-col gap-1.5'><Label>Agent Type</Label>
								<Select value={config.type} onValueChange={setStr('type')}><SelectTrigger><SelectValue /></SelectTrigger>
									<SelectContent><SelectItem value='scraping'>Scraping</SelectItem><SelectItem value='research'>Research</SelectItem><SelectItem value='bot'>Bot</SelectItem><SelectItem value='automation'>Automation</SelectItem><SelectItem value='trading'>Trading</SelectItem></SelectContent>
								</Select>
							</div>
							<div className='flex flex-col gap-1.5'><Label>Runtime</Label>
								<Select value={config.runtime} onValueChange={setStr('runtime')}><SelectTrigger><SelectValue /></SelectTrigger>
									<SelectContent><SelectItem value='node'>Node.js</SelectItem><SelectItem value='python'>Python</SelectItem><SelectItem value='bun'>Bun</SelectItem></SelectContent>
								</Select>
							</div>
						</div>
						<div className='flex flex-col gap-1.5'><Label>AI Model</Label>
							<Select value={config.model} onValueChange={setStr('model')}><SelectTrigger><SelectValue /></SelectTrigger>
								<SelectContent><SelectItem value='gpt-4o'>GPT-4o</SelectItem><SelectItem value='gpt-4o-mini'>GPT-4o Mini</SelectItem><SelectItem value='claude-3-5-sonnet'>Claude 3.5 Sonnet</SelectItem><SelectItem value='gemini-2.0-flash'>Gemini 2.0 Flash</SelectItem></SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader><CardTitle className='text-base'>Agent Instructions</CardTitle></CardHeader>
					<CardContent>
						<Textarea value={config.prompt} onChange={(e) => setStr('prompt')(e.target.value)} rows={5} placeholder='You are an autonomous research agent. Your task is to...' />
					</CardContent>
				</Card>

				<Card>
					<CardHeader><CardTitle className='text-base'>Scheduling &amp; Triggers</CardTitle></CardHeader>
					<CardContent className='flex flex-col gap-4'>
						<div className='flex flex-col gap-1.5'><Label>Schedule</Label>
							<Select value={config.schedule} onValueChange={setStr('schedule')}><SelectTrigger><SelectValue /></SelectTrigger>
								<SelectContent><SelectItem value='manual'>Manual trigger</SelectItem><SelectItem value='hourly'>Every hour</SelectItem><SelectItem value='daily'>Daily</SelectItem><SelectItem value='webhook'>On webhook</SelectItem></SelectContent>
							</Select>
						</div>
						<Separator />
						<div className='flex items-center justify-between'><div><Label>Persistent Memory</Label><p className='text-xs text-muted-foreground'>Agent remembers context between runs</p></div><Switch checked={config.persistent} onCheckedChange={(v) => setBool('persistent')(v)} /></div>
						{config.schedule === 'webhook' && (
							<div className='flex flex-col gap-1.5'><Label>Webhook URL</Label><Input value={config.webhook} onChange={(e) => setStr('webhook')(e.target.value)} placeholder='https://your-app.com/hook' /></div>
						)}
					</CardContent>
				</Card>

				<div className='flex gap-3'>
					<Button id='deploy-agent-submit' className='flex-1 gap-2'><Bot className='size-4' />Deploy Agent</Button>
					<Button variant='outline'><Zap className='size-4' />Test Run</Button>
				</div>
			</div>
		</div>
	);
}
