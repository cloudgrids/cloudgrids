'use client';

import { SectionHeader } from '@/components/section/section-header';
import { SectionWrapper } from '@/components/section/section-wrapper';
import { FeatureCard } from '@/components/ui/feature-card';
import { PLATFORM_FEATURES } from '@/lib/constants';

export function PlatformFeatures() {
	return (
		<SectionWrapper id="platform">
			<SectionHeader
				badge="Platform"
				title="Everything you need to ship"
				description="A full deployment platform built around your workflow. Some features are live — more shipping soon."
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{PLATFORM_FEATURES.map((feature, i) => (
					<FeatureCard
						key={feature.id}
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
						status={feature.status}
						index={i}
					/>
				))}
			</div>
		</SectionWrapper>
	);
}
