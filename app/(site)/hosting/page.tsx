import { Hosting } from './components/Hosting';

export const metadata = {
	title: 'Hosting',
	description: 'GitHub-connected deployments, subdomain hosting, automatic builds, custom domains, logs and analytics.'
};

export default function HostingPage() {
	return <Hosting />;
}
