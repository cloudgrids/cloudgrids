import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { HowItWorks } from '@/components/HowItWorks';
import { OpenSource } from '@/components/OpenSource';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<main className='relative min-h-screen'>
			<Navbar />
			<Hero />
			<Projects />
			<HowItWorks />
			<OpenSource />
			<Footer />
		</main>
	);
}
