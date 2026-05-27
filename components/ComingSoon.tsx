import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComingSoonProps {
	name: string;
	description: string;
	phase: string;
}

export function ComingSoon({ name, description, phase }: ComingSoonProps) {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
			<div className='mx-auto max-w-xl'>
				{/* Back */}
				<div className='mb-10'>
					<Button variant='ghost' size='sm' nativeButton={false} render={<Link href='/' />} className='gap-2'>
						<ArrowLeft className='size-4' />
						cloudgrids.tech
					</Button>
				</div>

				{/* Logo */}
				<div className='mb-6 flex justify-center'>
					<Logo width={56} height={56} />
				</div>

				{/* Status badge */}
				<div className='mb-4 flex justify-center gap-2'>
					<Badge variant='outline' className='border-primary/20 bg-primary/5 text-primary gap-1.5'>
						<Clock className='size-3' />
						Coming Soon
					</Badge>
					<Badge variant='outline' className='border-border text-muted-foreground'>
						{phase}
					</Badge>
				</div>

				{/* Name */}
				<h1 className='mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl'>{name}</h1>

				{/* Description */}
				<p className='mb-8 text-sm text-muted-foreground md:text-base leading-relaxed'>{description}</p>

				{/* CTA */}
				<div className='flex flex-wrap justify-center gap-3'>
					<Button
						nativeButton={false}
						render={<a href='https://github.com/cloudgrids' target='_blank' rel='noopener noreferrer' />}
						className='gap-2'
					>
						Follow on GitHub
					</Button>
					<Button
						variant='outline'
						nativeButton={false}
						render={<a href='mailto:support@cloudgrids.tech' />}
					>
						Get notified
					</Button>
				</div>
			</div>
		</main>
	);
}
