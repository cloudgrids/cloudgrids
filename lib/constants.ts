import { GitBranch, Globe, Mail, Package, Star, Users } from 'lucide-react';

export const LEGAL = [
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Legal Terms', href: '/legal' }
];

export const PROJECTS = [
	{ label: 'tools.cloudgrids.tech', href: 'https://tools.cloudgrids.tech' },
	{ label: 'downflux (npm)', href: 'https://www.npmjs.com/package/downflux' },
	{ label: 'docs (coming soon)', href: '#' }
];

export const SOCIALS = [
	{ icon: GitBranch, href: 'https://github.com/cloudgrids', label: 'GitHub' },
	{ icon: Globe, href: 'https://cloudgrids.tech', label: 'Website' },
	{ icon: Mail, href: 'mailto:support@cloudgrids.tech', label: 'Email' }
];

export const ALL_PROJECTS = [
	{
		id: 'tools',
		icon: Globe,
		name: 'Tools',
		description:
			'A curated suite of developer productivity tools — JSON formatter, regex tester, color converter, and more. Works completely offline.',
		tags: ['Developer Tools', 'Offline', 'Open Source'],
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
			'A modular TypeScript media extraction and download toolkit. Allows users to download contents from websites along with metadata.',
		tags: ['TypeScript', 'Media', 'npm'],
		status: 'live' as const,
		links: [
			{ label: 'npm', href: 'https://www.npmjs.com/package/downflux' },
			{ label: 'GitHub', href: 'https://github.com/forkts/downflux' }
		]
	},
	{
		id: 'docs',
		icon: GitBranch,
		name: 'docs.cloudgrids.tech',
		description:
			'Unified documentation hub for all CloudGrids projects. Guides, API references, and tutorials — coming soon.',
		tags: ['Documentation', 'Guides', 'API'],
		status: 'coming-soon' as const,
		links: []
	}
];

export const COMMUNITY = [
	{ label: 'GitHub Org', href: 'https://github.com/cloudgrids' },
	{ label: 'Request a subdomain', href: 'https://github.com/cloudgrids' },
	{ label: 'Contact', href: 'mailto:support@cloudgrids.tech' }
];

export const STEPS = [
	{
		step: '01',
		icon: GitBranch,
		title: 'Build your project',
		description:
			'Create anything — a website, an app, a tool, a library. Any tech stack is welcome. All we ask is that it be open source.'
	},
	{
		step: '02',
		icon: Mail,
		title: 'Connect GitHub',
		description:
			'Connect your GitHub repository and deploy instantly. Deploy directly from GitHub with automatic builds and updates.'
	},
	{
		step: '03',
		icon: Globe,
		title: 'Ship it',
		description:
			"We'll set up the subdomain and point it to your deployment. Your project goes live on *.cloudgrids.tech — for free!"
	}
];

export const NAVBAR_LINKS = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'How it works', href: '#how-it-works' },
	{ label: 'Open Source', href: '#open-source' }
];

export const STATS = [
	{ icon: GitBranch, label: 'Active repos', value: '5+' },
	{ icon: Users, label: 'Contributors', value: 'Growing' },
	{ icon: Star, label: 'License', value: 'MIT' }
];
