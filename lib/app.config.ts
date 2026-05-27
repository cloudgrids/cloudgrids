export const AppConfig = {
	applicationName: 'CloudGrids',
	site_name: 'CloudGrids',
	title: 'CloudGrids — Open-source org powering *.cloudgrids.tech',
	description:
		'CloudGrids is an open-source organisation that builds developer tools and lets builders host their projects under *.cloudgrids.tech subdomains. Ship your next project under our domain.',
	tagline: 'An open-source org for builders.',
	keywords: [
		'cloudgrids',
		'open source',
		'subdomain',
		'developer tools',
		'downflux',
		'tools.cloudgrids.tech',
		'hosting',
		'free subdomain',
		'cloudgrids.tech'
	],
	siteUrl: 'https://cloudgrids.tech',
	canonical: 'https://cloudgrids.tech',
	locale: 'en-US',
	template: '%s | CloudGrids',
	type: 'website' as const,
	manifest: '/site.webmanifest',
	icons: [
		{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
		{ src: '/icons/apple-icon-180.png', sizes: '180x180', type: 'image/png' }
	],
	images: {
		og: 'https://cloudgrids.tech/opengraph-image',
		logo: '/logo.png',
		favicon: '/favicon.ico'
	},
	contact: {
		email: 'support@cloudgrids.tech'
	},
	github: {
		org: 'https://github.com/cloudgrids',
		tools: 'https://github.com/cloudgrids/tools',
		downflux: 'https://github.com/forkts/downflux'
	}
};
