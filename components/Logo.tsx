const voxels = [
	// Bottom layer (y=0)
	[-2, 0, 0],
	[-1, 0, 0],
	[0, 0, 0],
	[1, 0, 0],
	[2, 0, 0],
	[-1, 0, 1],
	[0, 0, 1],
	[1, 0, 1],
	[-1, 0, -1],
	[0, 0, -1],
	[1, 0, -1],
	// Second layer (y=1)
	[-1, 1, 0],
	[0, 1, 0],
	[1, 1, 0],
	[0, 1, 1],
	[0, 1, -1],
	// Third layer (y=2)
	[0, 2, 0]
];

const edgesSet = new Set<string>();
const verticesSet = new Set<string>();

voxels.forEach(([x, y, z]) => {
	const v = [
		`${x},${y},${z}`,
		`${x + 1},${y},${z}`,
		`${x + 1},${y},${z + 1}`,
		`${x},${y},${z + 1}`,
		`${x},${y + 1},${z}`,
		`${x + 1},${y + 1},${z}`,
		`${x + 1},${y + 1},${z + 1}`,
		`${x},${y + 1},${z + 1}`
	];

	v.forEach((vertex) => verticesSet.add(vertex));

	const edgePairs = [
		[v[0], v[1]],
		[v[1], v[2]],
		[v[2], v[3]],
		[v[3], v[0]],
		[v[4], v[5]],
		[v[5], v[6]],
		[v[6], v[7]],
		[v[7], v[4]],
		[v[0], v[4]],
		[v[1], v[5]],
		[v[2], v[6]],
		[v[3], v[7]]
	];

	edgePairs.forEach(([a, b]) => {
		const edge = [a, b].sort().join('|');
		edgesSet.add(edge);
	});
});

const uniqueVertices = Array.from(verticesSet);
const vertexToIndex = new Map(uniqueVertices.map((v, i) => [v, i]));

const projectedPoints = uniqueVertices.map((v) => {
	const [x, y, z] = v.split(',').map(Number);
	const px = (x - z) * Math.cos(Math.PI / 6);
	const py = -y + (x + z) * Math.sin(Math.PI / 6);
	return [px, py];
});

const minPx = Math.min(...projectedPoints.map((p) => p[0]));
const maxPx = Math.max(...projectedPoints.map((p) => p[0]));
const minPy = Math.min(...projectedPoints.map((p) => p[1]));
const maxPy = Math.max(...projectedPoints.map((p) => p[1]));

const cx = (minPx + maxPx) / 2;
const cy = (minPy + maxPy) / 2;

const widthPx = maxPx - minPx;
const heightPy = maxPy - minPy;

const scaleX = 124 / (widthPx || 1);
const scaleY = 96 / (heightPy || 1);
const scale = Math.min(scaleX, scaleY);

const padding = 4;
const exactWidth = widthPx * scale;
const exactHeight = heightPy * scale;
const viewBoxMinX = 62 - exactWidth / 2 - padding;
const viewBoxMinY = 48 - exactHeight / 2 - padding;
const viewBoxWidth = exactWidth + padding * 2;
const viewBoxHeight = exactHeight + padding * 2;

const points = projectedPoints.map((p) => [62 + (p[0] - cx) * scale, 48 + (p[1] - cy) * scale]);

const lines = Array.from(edgesSet).map((edge) => {
	const [a, b] = edge.split('|');
	return [vertexToIndex.get(a)!, vertexToIndex.get(b)!];
});

export function Logo({ width = "100%", height = "100%", className }: { width?: number | string; height?: number | string; className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`}
			width={width}
			height={height}
			className={className}
			fill="none"
			aria-hidden="true"
			overflow="visible"
		>
			<defs>
				<linearGradient id="cg-gradient" x1="8" y1="20" x2="112" y2="84" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stopColor="#22D3EE" />
					<stop offset="45%" stopColor="#60A5FA" />
					<stop offset="100%" stopColor="#D946EF" />
				</linearGradient>

				<filter id="cg-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="2.8" result="blur" />

					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* glow */}
			<g filter="url(#cg-glow)" stroke="url(#cg-gradient)" strokeWidth="2.4" opacity="0.4">
				{lines.map(([a, b], i) => {
					const p1 = points[a];
					const p2 = points[b];

					return <line key={`glow-${i}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />;
				})}
			</g>

			{/* sharp mesh */}
			<g stroke="url(#cg-gradient)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
				{lines.map(([a, b], i) => {
					const p1 = points[a];
					const p2 = points[b];

					return <line key={`line-${i}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />;
				})}
			</g>

			{/* nodes */}
			<g filter="url(#cg-glow)">
				{points.map(([x, y], i) => (
					<circle key={`node-${i}`} cx={x} cy={y} r="2" fill="white" />
				))}
			</g>
		</svg>
	);
}

export default Logo;
