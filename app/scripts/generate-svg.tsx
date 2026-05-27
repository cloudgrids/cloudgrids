import Logo from '@/components/Logo';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';

async function generateSvg() {
	const svgString = renderToStaticMarkup(<Logo width={180} height={180} />);
	const outputPath = join(process.cwd(), 'public', 'logo.svg');
	await writeFile(outputPath, svgString, { flag: 'w' });
	console.log(`Generated ${outputPath}`);
}

generateSvg();
