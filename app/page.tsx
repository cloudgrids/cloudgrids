import { EarlyAccess } from '@/components/EarlyAccess';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Navbar } from '@/components/Navbar';
import { OpenSource } from '@/components/OpenSource';
import { PlatformFeatures } from '@/components/PlatformFeatures';
import { Projects } from '@/components/Projects';

export default function Home() {
	return (
		<main className="relative min-h-screen">
			<Navbar />
			<Hero />
			<PlatformFeatures />
			<HowItWorks />
			<Projects />
			<OpenSource />
			<EarlyAccess />
			<Footer />
		</main>
	);
}
