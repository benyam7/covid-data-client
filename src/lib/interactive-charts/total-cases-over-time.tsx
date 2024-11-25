import React from 'react';
import { countries } from '@/lib/utils/countries';
import { BASELINE_COUNTRY } from '@/lib/utils/constants';
import { CountryData } from '@/lib/api/api';
import { ChartConfig } from '@/components/ui/chart';
import { ComparisonChart } from './generic-comparison-chart';
import { colors } from '@/lib/utils/colors';

export const TotalCasesOverTime = React.memo(() => {
    const getCountriesFromData = (data: CountryData[]): string[] => {
        const countrySet = new Set<string>();
        data.forEach((entry) => {
            Object.keys(entry).forEach((key) => {
                if (key !== 'date') {
                    countrySet.add(key);
                }
            });
        });
        return Array.from(countrySet);
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
            title="Country-wise Total Cases Over Time"
            description="This visualization highlights the total number of cases across selected countries within a specified time period."
            initialComparisonValues={[BASELINE_COUNTRY]}
            comparisonInputs={countries}
            baselineInput={BASELINE_COUNTRY}
            queryType="total_cases"
            chartType="line"
            colors={colors}
            getKeysFromData={getCountriesFromData}
            updateChartConfig={updateChartConfig}
            comparisonInputTitle="Countries"
        />
    );
});
