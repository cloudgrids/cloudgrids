import { Star } from 'lucide-react';
import { Button } from './ui/button';

export function GithubStar() {
	return (
		<Button
			variant="outline"
			size="sm"
			nativeButton={false}
			render={<a href="https://github.com/cloudgrids" target="_blank" rel="noopener noreferrer" />}
		>
			<Star data-icon="inline-start" />
			Star on GitHub
		</Button>
	);
}
