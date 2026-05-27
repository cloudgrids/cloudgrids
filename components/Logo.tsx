/**
 * CloudGrids wireframe cloud logo — pure SVG, renderable by next/og (Satori).
 * Cyan (#22D3EE) to purple (#A855F7) gradient wireframe low-poly cloud.
 */
export function Logo({ width = 32, height = 32, className }: { width?: number; height?: number; className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 90"
			fill="none"
			width={width}
			height={height}
			className={className}
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="cg-grad" x1="0" y1="0" x2="120" y2="90" gradientUnits="userSpaceOnUse">
					<stop stopColor="#22D3EE" />
					<stop offset="1" stopColor="#A855F7" />
				</linearGradient>
				<filter id="cg-glow">
					<feGaussianBlur stdDeviation="1.5" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* Cloud wireframe mesh lines */}
			<g filter="url(#cg-glow)" stroke="url(#cg-grad)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
				{/* Outer cloud boundary */}
				<path d="M20 72 Q10 72 10 60 Q10 46 22 44 Q20 30 34 26 Q42 14 58 18 Q70 12 80 22 Q94 18 100 32 Q112 34 112 48 Q112 62 100 64 Q95 72 20 72Z" />

				{/* Internal mesh — horizontal layer lines */}
				<line x1="22" y1="64" x2="98" y2="64" />
				<line x1="18" y1="56" x2="102" y2="56" />
				<line x1="22" y1="48" x2="100" y2="48" />
				<line x1="28" y1="40" x2="96" y2="40" />
				<line x1="36" y1="32" x2="88" y2="32" />
				<line x1="46" y1="24" x2="76" y2="24" />

				{/* Internal mesh — vertical/diagonal lines */}
				<line x1="34" y1="24" x2="20" y2="72" />
				<line x1="46" y1="22" x2="34" y2="72" />
				<line x1="58" y1="18" x2="48" y2="72" />
				<line x1="70" y1="22" x2="62" y2="72" />
				<line x1="82" y1="28" x2="76" y2="72" />
				<line x1="94" y1="36" x2="90" y2="72" />

				{/* Cross-diagonals */}
				<line x1="22" y1="44" x2="46" y2="72" />
				<line x1="28" y1="36" x2="62" y2="72" />
				<line x1="36" y1="30" x2="76" y2="72" />
				<line x1="48" y1="24" x2="90" y2="64" />
				<line x1="62" y1="20" x2="100" y2="56" />
				<line x1="76" y1="22" x2="104" y2="48" />

				{/* Back-diagonals */}
				<line x1="100" y1="42" x2="76" y2="72" />
				<line x1="96" y1="36" x2="62" y2="72" />
				<line x1="88" y1="30" x2="46" y2="72" />
				<line x1="78" y1="24" x2="32" y2="64" />
				<line x1="64" y1="20" x2="20" y2="56" />
			</g>

			{/* Mesh nodes */}
			<g fill="url(#cg-grad)" filter="url(#cg-glow)">
				{[
					[34, 26],
					[46, 22],
					[58, 18],
					[70, 22],
					[82, 28],
					[94, 36],
					[22, 44],
					[34, 40],
					[46, 38],
					[60, 36],
					[74, 38],
					[88, 40],
					[100, 44],
					[18, 56],
					[30, 54],
					[46, 52],
					[60, 50],
					[76, 52],
					[92, 54],
					[104, 56],
					[22, 64],
					[36, 64],
					[52, 64],
					[68, 64],
					[84, 64],
					[100, 64]
				].map(([cx, cy], i) => (
					<circle key={i} cx={cx} cy={cy} r="2" />
				))}
			</g>
		</svg>
	);
}

export default Logo;
