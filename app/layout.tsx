import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { LenisProvider } from '@/hooks/LenisProvider';
import { AppConfig } from '@/lib/app.config';
import { cn } from '@/lib/utils';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	metadataBase: new URL(AppConfig.siteUrl),
	title: {
		template: AppConfig.template,
		default: AppConfig.title
	},
	alternates: {
		canonical: AppConfig.canonical
	},
	manifest: AppConfig.manifest,
	applicationName: AppConfig.applicationName,
	description: AppConfig.description,
	keywords: AppConfig.keywords,
	authors: [{ name: AppConfig.applicationName }],
	openGraph: {
		siteName: AppConfig.site_name,
		title: AppConfig.title,
		description: AppConfig.description,
		type: AppConfig.type,
		locale: AppConfig.locale,
		url: AppConfig.siteUrl,
		images: [
			{
				url: AppConfig.images.og,
				width: 1200,
				height: 630,
				alt: AppConfig.title
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: AppConfig.title,
		description: AppConfig.description,
		images: [AppConfig.images.og]
	},
	robots: {
		index: true,
		follow: true
	},
	generator: 'Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={cn('font-sans', geist.variable)} suppressHydrationWarning>
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<LenisProvider>{children}</LenisProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
