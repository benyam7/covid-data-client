'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { SelectRegion } from './regions-select';
import { useRegionsAggregates } from '../api/api';
import { BASELINE_REGION } from '@/lib/utils/constants';
import Spinner from '@/components/ui/spinner';
import { formatLargeNumber } from '@/lib/utils';

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    aged_65_older: {
        label: 'Age 65+',
        color: 'hsl(var(--chart-1))',
    },
    aged_70_older: {
        label: 'Age 70+',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export function AgeGroupProportionsVsCasesAndDeathsChart() {
    // Fetch regions data using the custom hook

    const { data, isLoading, isError } = useRegionsAggregates();
    const [selectedRegion, setSelectedRegion] = React.useState<string>('');

    // Wait for data to load and set default selected region
    React.useEffect(() => {
        if (data && data.length > 0 && !selectedRegion) {
            setSelectedRegion(BASELINE_REGION); // Default to the first region
        }
    }, [data, selectedRegion]);

    // Get the selected region data
    const selectedData = React.useMemo(() => {
        return data?.find((region) => region._id === selectedRegion);
    }, [data, selectedRegion]);

    // Prepare chart data
    const chartData = selectedData
        ? [
              {
                  name: 'Aged 65+: ' + ' ',
                  value: selectedData?.aged_65_older || 0,
                  fill: 'hsl(var(--chart-1))',
              },
              {
                  name: 'Aged 70+: ',
                  value: selectedData?.aged_70_older || 0,
                  fill: 'hsl(var(--chart-2))',
              },
          ]
        : [];

    if (isError) {
        return (
            <div className="text-center text-destructive">
                Unable to load regions data. Please try again later.
            </div>
        );
    }
    return (
        <Card className="flex flex-col lg:-mt-4">
            <CardHeader className="pb-0 ">
                <CardTitle>
                    Age Proportions and Mortality: A Regional Perspective
                </CardTitle>
                <CardDescription>
                    This pie chart illustrates the proportional distribution of
                    populations aged 65 and above versus those aged 70 and above
                    across regions or countries. The chart’s center highlights
                    the total number of deaths, providing a clear view of age
                    demographics in relation to mortality rates.
                </CardDescription>
                <SelectRegion
                    onRegionChange={(region) => {
                        setSelectedRegion(region);
                    }}
                />
            </CardHeader>
            <CardContent className="pb-0  lg:m5-10">
                {isError && (
                    <div className="my-10 text-center text-destructive">
                        Unable to load data. Please try again later.
                    </div>
                )}
                {isLoading && (
                    <div className="flex items-center justify-center w-full">
                        <Spinner />
                    </div>
                )}
                {data && (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={70}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            'cx' in viewBox &&
                                            'cy' in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="text-3xl font-bold fill-foreground"
                                                    >
                                                        {formatLargeNumber(
                                                            selectedData?.total_deaths ||
                                                                0
                                                        )}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground"
                                                    >
                                                        Total Deaths
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total deaths vs age group proportions for{' '}
                    {selectedRegion}
                </div>
            </CardFooter>
        </Card>
    );
}
