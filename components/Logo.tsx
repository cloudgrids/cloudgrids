export interface LogoProps {
	width?: number | string;
	height?: number | string;
	className?: string;
}

export function Logo({ width = '100%', height = '100%', className }: LogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 64 64"
			width={width}
			height={height}
			className={className}
			role="img"
			aria-label="CloudGrids"
		>
			<defs>
				<linearGradient id="cloudgrids-surface" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
					<stop stopColor="#22D3EE" />
					<stop offset=".5" stopColor="#4F7CFF" />
					<stop offset="1" stopColor="#D946EF" />
				</linearGradient>
				<linearGradient id="cloudgrids-shine" x1="18" y1="18" x2="46" y2="48" gradientUnits="userSpaceOnUse">
					<stop stopColor="white" />
					<stop offset="1" stopColor="#DFF8FF" />
				</linearGradient>
			</defs>

			<rect width="64" height="64" rx="17" fill="#080B12" />
			<rect x="1" y="1" width="62" height="62" rx="16" fill="none" stroke="url(#cloudgrids-surface)" strokeOpacity=".45" strokeWidth="2" />

			<path
				d="M18 43.5h28a8 8 0 0 0 1.2-15.9A15.5 15.5 0 0 0 18.5 24 10 10 0 0 0 18 43.5Z"
				fill="url(#cloudgrids-surface)"
				opacity=".22"
			/>
			<path
				d="M18 43.5h28a8 8 0 0 0 1.2-15.9A15.5 15.5 0 0 0 18.5 24 10 10 0 0 0 18 43.5Z"
				fill="none"
				stroke="url(#cloudgrids-shine)"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			<g fill="url(#cloudgrids-surface)" stroke="#080B12" strokeWidth="1.5">
				<rect x="23" y="28" width="8" height="8" rx="2" />
				<rect x="33" y="28" width="8" height="8" rx="2" />
				<rect x="23" y="38" width="8" height="8" rx="2" />
				<rect x="33" y="38" width="8" height="8" rx="2" />
			</g>

			<path d="M31 32h2m-6 4v2m10-2v2m-6 4h2" stroke="white" strokeOpacity=".9" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
}

export default Logo;
