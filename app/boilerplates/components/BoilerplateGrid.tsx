'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Check, Code2, CreditCard, Database, Layout, Sparkles, Star, Zap } from 'lucide-react';

const BOILERPLATES = [
	{
		id: 'auth',
		name: 'Auth Starter',
		description:
			'Full authentication system with email/password, OAuth (Google, GitHub), magic links, session management, and role-based access control.',
		icon: CreditCard,
		tags: ['Next.js', 'NextAuth', 'Prisma', 'PostgreSQL'],
		category: 'auth',
		features: ['OAuth providers', 'Magic links', 'RBAC', 'Session management', 'Email verification', '2FA ready'],
		price: 'Free',
		stars: 142
	},
	{
		id: 'payments',
		name: 'Payments SaaS',
		description:
			'Complete SaaS with Stripe subscriptions, usage billing, customer portal, webhook handling, and multi-currency support.',
		icon: CreditCard,
		tags: ['Next.js', 'Stripe', 'Prisma', 'TypeScript'],
		category: 'payments',
		features: ['Stripe subscriptions', 'Usage billing', 'Customer portal', 'Webhooks', 'Multi-currency', 'Invoice PDF'],
		price: 'Free',
		stars: 287
	},
	{
		id: 'ai',
		name: 'AI Integration Kit',
		description:
			'Production-ready AI app with OpenAI/Anthropic streaming, chat history, vector search, rate limiting, and cost tracking.',
		icon: Sparkles,
		tags: ['Next.js', 'OpenAI', 'Pinecone', 'TypeScript'],
		category: 'ai',
		features: [
			'Streaming responses',
			'Chat history',
			'Vector search',
			'Rate limiting',
			'Cost tracking',
			'Prompt management'
		],
		price: 'Free',
		stars: 531
	},
	{
		id: 'fullstack',
		name: 'Full-Stack SaaS',
		description:
			'Everything in one: auth, payments, admin dashboard, email system, media uploads, analytics, and one-click deployment.',
		icon: Layout,
		tags: ['Next.js', 'Stripe', 'Resend', 'S3', 'PostgreSQL'],
		category: 'fullstack',
		features: ['Auth + payments', 'Admin dashboard', 'Email system', 'Media uploads', 'Analytics', 'Deployment ready'],
		price: 'Free',
		stars: 893
	},
	{
		id: 'api',
		name: 'NestJS API Starter',
		description:
			'Backend API with NestJS, JWT auth, Swagger docs, rate limiting, PostgreSQL + TypeORM, Redis caching, and Docker setup.',
		icon: Database,
		tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis'],
		category: 'api',
		features: ['JWT auth', 'Swagger docs', 'Rate limiting', 'Redis cache', 'Docker', 'Health checks'],
		price: 'Free',
		stars: 204
	},
	{
		id: 'discord',
		name: 'Discord Bot Starter',
		description:
			'Slash commands, event handlers, database integration, scheduled tasks, and Docker deployment for Discord bots.',
		icon: Code2,
		tags: ['discord.js', 'TypeScript', 'PostgreSQL', 'Docker'],
		category: 'bot',
		features: ['Slash commands', 'Event handlers', 'Database ORM', 'Scheduled tasks', 'Docker', 'Error handling'],
		price: 'Free',
		stars: 178
	}
];

const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.08 } })
};

export function BoilerplateGrid({ category }: { category: string }) {
	const filtered = category === 'All' ? BOILERPLATES : BOILERPLATES.filter((b) => b.category === category);

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{filtered.map((bp, i) => {
				const Icon = bp.icon;
				return (
					<motion.div key={bp.id} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
						<Card className="group flex h-full flex-col gap-0 py-0 overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
							<CardHeader className="p-5 pb-3">
								<div className="flex items-start justify-between gap-2">
									<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
										<Icon className="size-4 text-primary" />
									</div>
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<Star className="size-3" />
										<span>{bp.stars}</span>
									</div>
								</div>
								<CardTitle className="mt-3 text-base">{bp.name}</CardTitle>
								<CardDescription className="text-xs leading-relaxed">{bp.description}</CardDescription>
							</CardHeader>

							<CardContent className="flex flex-1 flex-col gap-4 p-5 pt-0">
								{/* Tags */}
								<div className="flex flex-wrap gap-1.5">
									{bp.tags.map((tag) => (
										<Badge key={tag} variant="secondary" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								{/* Features */}
								<ul className="flex flex-col gap-1.5">
									{bp.features.map((f) => (
										<li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
											<Check className="size-3 shrink-0 text-primary" />
											{f}
										</li>
									))}
								</ul>

								{/* CTA */}
								<div className="mt-auto flex gap-2">
									<Button size="sm" id={`bp-deploy-${bp.id}`} className="flex-1 gap-1">
										<Zap className="size-3.5" />
										Deploy
									</Button>
									<Button size="sm" variant="outline" id={`bp-code-${bp.id}`}>
										<Star className="size-3.5" />
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				);
			})}
		</div>
	);
}
