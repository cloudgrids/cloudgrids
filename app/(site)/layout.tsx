'use client';

import { AppNavbar } from '@/components/AppNavbar';
import { Footer } from '@/components/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen flex-col">
			<AppNavbar />
			<AnimatePresence mode="wait" initial={false}>
				<motion.main
					key={pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15, ease: 'easeInOut' }}
					className="flex-1 pt-14"
				>
					{children}
				</motion.main>
			</AnimatePresence>
			<Footer />
		</div>
	);
}
