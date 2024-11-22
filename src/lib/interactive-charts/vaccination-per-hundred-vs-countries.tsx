import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import { worldCountries } from '@/lib/utils/world-countries';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { useVaccinationCoverage } from '@/lib/api/api';
import Spinner from '@/components/ui/spinner';
import React from 'react';

export const VaccinationCoverageChoropleth = () => {
    const isMobile = useIsMobile();
    const { isLoading, data, isError } = useVaccinationCoverage();
    const chartData = React.useMemo(() => {
        if (data) {
            console.log('Data loaded:', data);
            return data;
        }
        return [];
    }, [data, isLoading, isError]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Global Vaccination Coverage: A Percentage Breakdown
                </CardTitle>
                <CardDescription>
                    This Choropleth map provides a visual representation of the
                    percentage of people vaccinated across countries worldwide.
                    Each country’s color intensity reflects its vaccination
                    coverage, offering a clear and comprehensive overview of
                    global progress in combating health crises through
                    immunization efforts. Use this map to identify trends,
                    compare regions, and assess vaccination disparities
                    globally.
                </CardDescription>
                {isLoading && <Spinner />}
            </CardHeader>
            <CardContent className="h-[600px]">
                {isError && <div className="text-destructive">Error </div>}
                {chartData && (
                    <ResponsiveChoroplethCanvas
                        data={chartData}
                        features={worldCountries.features}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        colors="RdBu"
                        domain={[0, 100]}
                        unknownColor="#101b42"
                        label="properties.name"
                        valueFormat=".2s"
                        projectionTranslation={[0.5, 0.5]}
                        projectionRotation={[0, 0, 0]}
                        enableGraticule={true}
                        graticuleLineColor="rgba(0, 0, 0, .2)"
                        borderWidth={0.5}
                        borderColor="#101b42"
                        legends={[
                            {
                                anchor: isMobile
                                    ? 'bottom-right'
                                    : 'bottom-left',
                                direction: 'column',
                                justify: true,
                                translateX: isMobile ? -5 : 20,
                                translateY: isMobile ? -130 : -60,
                                itemsSpacing: 0,
                                itemWidth: 92,
                                itemHeight: isMobile ? 10 : 18,
                                itemDirection: 'left-to-right',
                                itemOpacity: isMobile ? 1 : 0.85,
                                symbolSize: 18,
                            },
                        ]}
                    />
                )}
            </CardContent>
        </Card>
    );
};
