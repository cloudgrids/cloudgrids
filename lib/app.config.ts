export const AppConfig = {
	applicationName: 'CloudGrids',
	site_name: 'CloudGrids',
	title: 'CloudGrids — Deploy your applications from GitHub',
	description:
		'CloudGrids is a cloud deployment platform for developers, indie hackers, and AI builders. Connect your GitHub repository and deploy instantly on *.cloudgrids.tech.',
	tagline: 'Deploy from GitHub. Live in minutes.',
	keywords: [
		'cloudgrids',
		'deployment platform',
		'github deploy',
		'cloud hosting',
		'indie hackers',
		'ai hosting',
		'free subdomain',
		'vercel alternative',
		'railway alternative',
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
		org: 'https://github.com/cloudgrids'
	}
};
