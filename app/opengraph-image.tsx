import Logo from '@/components/Logo';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CloudGrids — Open-source org powering *.cloudgrids.tech';
export const size = {
	width: 1200,
	height: 630
};
export const contentType = 'image/png';

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#050510',
				fontFamily: 'sans-serif',
				backgroundImage:
					'radial-gradient(circle at 25px 25px, #12122a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #12122a 2%, transparent 0%)',
				backgroundSize: '100px 100px'
			}}
		>
			{/* Logo */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 40,
					transform: 'scale(1.4)'
				}}
			>
				<Logo width={120} height={120} />
			</div>

			{/* Wordmark */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<div
					style={{
						fontSize: 80,
						fontWeight: 900,
						letterSpacing: '-0.04em',
						display: 'flex',
						alignItems: 'center',
						gap: '0px',
						marginBottom: 20
					}}
				>
					<span style={{ color: '#ffffff' }}>Cloud</span>
					<span
						style={{
							background: 'linear-gradient(to right, #22D3EE, #A855F7)',
							backgroundClip: 'text',
							color: 'transparent'
						}}
					>
						grids
					</span>
				</div>

				<div
					style={{
						fontSize: 28,
						fontWeight: 500,
						color: '#6b7280',
						letterSpacing: '0.08em',
						textTransform: 'uppercase'
					}}
				>
					*.cloudgrids.tech
				</div>
			</div>
		</div>,
		{ ...size }
	);
}
