import React from 'react';
import { regions } from '@/lib/utils/regions';
import { BASELINE_REGION } from '@/lib/utils/constants';
import { CountryData } from '@/lib/api/api';
import { ComparisonChart } from './generic-comparison-chart';
import { ChartConfig } from '@/components/ui/chart';
import { colors } from '@/lib/utils/colors';

export const TotalDeathsOverTimeForSelectedRegions = React.memo(() => {
    const getRegionsFromData = (data: CountryData[]): string[] => {
        const regionSet = new Set<string>();
        data.forEach((entry) => {
            Object.keys(entry).forEach((key) => {
                if (key !== 'date') {
                    regionSet.add(key);
                }
            });
        });
        return Array.from(regionSet);
    };

    const updateChartConfig = (dataKeys: string[]): ChartConfig => {
        return (
            dataKeys?.reduce<ChartConfig>((acc, key: string, index) => {
                acc[key] = {
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    color: colors[index % colors.length],
                };
                return acc;
            }, {}) || {}
        );
    };

    return (
        <ComparisonChart
            title="Total Deaths Over Time by Region"
            description="This interactive area chart visualizes the total number of deaths over time for selected regions within a specified time period."
            initialComparisonValues={[BASELINE_REGION]}
            comparisonInputs={regions}
            baselineInput={BASELINE_REGION}
            queryType="total_deaths"
            chartType="area"
            colors={colors}
            getKeysFromData={getRegionsFromData}
            updateChartConfig={updateChartConfig}
            comparisonInputTitle="Regions"
        />
    );
});
