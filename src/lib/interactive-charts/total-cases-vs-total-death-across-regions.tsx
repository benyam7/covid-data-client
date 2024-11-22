import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useRegionsAggregates } from '@/lib/api/api';
import { formatLargeNumber } from '@/lib/utils';

const chartConfig = {
    total_cases: {
        label: 'Total Cases',
        color: 'hsl(var(--chart-1))',
    },
    total_deaths: {
        label: 'Total Deaths',
        color: 'hsl(var(--chart-2))',
    },
    male_smokers: {
        label: 'Avg. Male Smokers',
        color: 'hsl(var(--chart-3))',
    },
    female_smokers: {
        label: 'Avg. Female Smokers',
        color: 'hsl(var(--chart-4))',
    },
} satisfies ChartConfig;

export function TotalCasesVsTotalDeathsAcrossRegions() {
    const { data, isError, isLoading } = useRegionsAggregates();
    const chartData = React.useMemo(() => {
        if (data) {
            return data;
        }
        return [];
    }, [data, isLoading, isError]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Health and Pandemic Trends Across Regions: A Comparative
                    Analysis
                </CardTitle>
                <CardDescription>
                    This visualization provides a comprehensive comparison of
                    pandemic-related metrics and health behaviors across
                    regions. By analyzing total cases, total deaths, and the
                    average smoking rates among males and females, we can
                    identify correlations and patterns that highlight the impact
                    of health behaviors on pandemic outcomes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 0 }}
                    >
                        <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            domain={['dataMin', 'dataMax']} // Automatically sets the min and max from the data
                            ticks={[
                                Math.min(
                                    ...chartData.map((d) => d.total_cases)
                                ), // Minimum value
                                Math.max(
                                    ...chartData.map((d) => d.total_cases)
                                ), // Maximum value
                            ]}
                            tickFormatter={(value) => formatLargeNumber(value)}
                        />
                        <YAxis
                            dataKey="_id"
                            type="category"
                            allowDataOverflow={true}
                            interval={0}
                        />
                        <Bar
                            dataKey="total_cases"
                            stackId="a"
                            fill={chartConfig['total_cases'].color}
                            radius={[0, 0, 4, 4]}
                        />

                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar
                            dataKey="total_deaths"
                            stackId="a"
                            fill={chartConfig['total_deaths'].color}
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="female_smokers"
                            stackId="a"
                            fill={chartConfig['female_smokers'].color}
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="male_smokers"
                            stackId="a"
                            fill={chartConfig['male_smokers'].color}
                            radius={[14, 14, 0, 0]}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
