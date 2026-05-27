import { Boxes, GitBranch, Globe, Lock, Mail, Package, Server, Terminal, Zap } from 'lucide-react';

// Replace with your actual Google Form URL
export const EARLY_ACCESS_FORM_URL = 'https://forms.gle/REPLACE_WITH_YOUR_FORM_ID';

export const LEGAL = [
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Terms of Service', href: '/legal' }
];

export const PROJECTS = [
	{
		label: 'tools.cloudgrids.tech',
		href: 'https://tools.cloudgrids.tech'
	},
	{
		label: 'downflux',
		href: 'https://www.npmjs.com/package/downflux'
	},
	{
		label: 'Documentation',
		href: 'https://docs.cloudgrids.tech'
	}
];

export const SOCIALS = [
	{
		icon: GitBranch,
		href: 'https://github.com/cloudgrids',
		label: 'GitHub'
	},
	{
		icon: Globe,
		href: 'https://cloudgrids.tech',
		label: 'Website'
	},
	{
		icon: Mail,
		href: 'mailto:support@cloudgrids.tech',
		label: 'Email'
	}
];

export const ALL_PROJECTS = [
	{
		id: 'platform',
		icon: Server,
		name: 'CloudGrids Platform',
		description:
			'Modern deployment workflows for developers and creators. Launch applications, manage deployments, and scale projects with a unified cloud-native platform.',
		tags: ['Deployment', 'Infrastructure', 'Cloud'],
		status: 'active' as const,
		links: [{ label: 'Platform', href: 'https://cloudgrids.tech' }]
	},
	{
		id: 'tools',
		icon: Globe,
		name: 'Tools',
		description:
			'A growing suite of developer utilities designed to simplify debugging, formatting, validation, and everyday engineering workflows.',
		tags: ['Developer Tools', 'Utilities', 'Productivity'],
		status: 'live' as const,
		links: [
			{ label: 'Visit', href: 'https://tools.cloudgrids.tech' },
			{ label: 'GitHub', href: 'https://github.com/cloudgrids/tools' }
		]
	},
	{
		id: 'downflux',
		icon: Package,
		name: 'downflux',
		description:
			'A modular TypeScript toolkit for structured media extraction, metadata processing, and automated content workflows.',
		tags: ['TypeScript', 'Automation', 'Media'],
		status: 'live' as const,
		links: [
			{
				label: 'npm',
				href: 'https://www.npmjs.com/package/downflux'
			},
			{
				label: 'GitHub',
				href: 'https://github.com/forkts/downflux'
			}
		]
	},
	{
		id: 'docs',
		icon: Boxes,
		name: 'Documentation',
		description:
			'Unified documentation, API references, deployment guides, and technical resources for the CloudGrids ecosystem.',
		tags: ['Documentation', 'API', 'Guides'],
		status: 'coming-soon' as const,
		links: []
	}
];

export const RESOURCES = [
	{
		label: 'GitHub Organization',
		href: 'https://github.com/cloudgrids'
	},
	{
		label: 'Deploy your app',
		href: '/deploy'
	},
	{
		label: 'Contact',
		href: 'mailto:support@cloudgrids.tech'
	}
];

export const STEPS = [
	{
		step: '01',
		icon: GitBranch,
		title: 'Create your project',
		description:
			'Build websites, APIs, tools, bots, or full-stack applications using your preferred framework and workflow.'
	},
	{
		step: '02',
		icon: Globe,
		title: 'Import your repository',
		description: 'Connect your GitHub repository to CloudGrids and prepare your application for deployment.'
	},
	{
		step: '03',
		icon: Package,
		title: 'Deploy instantly',
		description: 'Launch your project on a cloudgrids.tech subdomain with streamlined deployments and scalable hosting.'
	}
];

export const NAVBAR_LINKS = [
	{ label: 'Platform', href: '#platform' },
	{ label: 'How it works', href: '#how-it-works' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Early Access', href: '#early-access' }
];

export const STATS = [
	{ icon: Server, label: 'Projects live', value: '5+' },
	{ icon: GitBranch, label: 'Open source', value: 'MIT' },
	{ icon: Globe, label: 'Platform', value: 'Beta' }
];

export const PLATFORM_FEATURES = [
	{
		id: 'subdomains',
		icon: Globe,
		title: 'Free Subdomains',
		description: 'Every project gets a free *.cloudgrids.tech subdomain instantly. No configuration needed.',
		status: 'live' as const
	},
	{
		id: 'github-import',
		icon: GitBranch,
		title: 'GitHub Import',
		description: 'Connect your repository and trigger deployments automatically on every push to main.',
		status: 'coming-soon' as const
	},
	{
		id: 'auto-deploy',
		icon: Zap,
		title: 'Auto Deployments',
		description: 'Push code and your app deploys automatically. Zero manual intervention required.',
		status: 'coming-soon' as const
	},
	{
		id: 'env-vars',
		icon: Lock,
		title: 'Environment Variables',
		description: 'Securely manage secrets and config per environment with an intuitive dashboard.',
		status: 'coming-soon' as const
	},
	{
		id: 'logs',
		icon: Terminal,
		title: 'Deployment Logs',
		description: 'Real-time build and runtime logs for every deployment, right in the dashboard.',
		status: 'coming-soon' as const
	},
	{
		id: 'templates',
		icon: Boxes,
		title: 'One-Click Templates',
		description: 'Launch preconfigured stacks — Next.js, FastAPI, Discord bots, AI wrappers, and more.',
		status: 'coming-soon' as const
	}
];
