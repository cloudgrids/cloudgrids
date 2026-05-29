import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign in to your CloudGrids account to manage deployments.'
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}

