import * as React from 'react';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { ComparisonInput } from '@/components/ui/comparision-input';
import { CountryData, useTotalCases } from './lib/api/api';
import Spinner from './components/ui/spinner';
import { BASELINE_REGION } from './lib/utils/constants';
import { DateRangePicker } from './components/ui/date-picker-range';
import { useIsMobile } from './lib/hooks/useIsMobile';
import { regions } from './lib/utils/regions';
import { sanitizeKey } from './lib/utils';

export const TotalDeathsOverTimeForSelectedRegions = React.memo(
    function TotalDeathsOverTimeForSelectedRegions() {
        // let chartData: CountryData[] = [];
        const [comparisonRegions, setComparisonRegions] = React.useState<
            string[]
        >([BASELINE_REGION]);

        const [starDate, setStartDate] = React.useState<Date>(
            new Date('2020-09-01')
        );
        const [endDate, setEndDate] = React.useState<Date>(new Date());

        const [dataKeys, setDataKeys] = React.useState<string[]>([
            BASELINE_REGION,
        ]);
        const [chartData, setChartData] = React.useState<CountryData[]>([]);
        const [chartConfig, setChartConfig] = React.useState<ChartConfig>({});

        const getRegions = (data: CountryData[]): string[] => {
            const regions = new Set<string>();

            data.forEach((entry) => {
                Object.keys(entry).forEach((key) => {
                    if (key !== 'date') {
                        regions.add(key);
                    }
                });
            });

            return Array.from(regions);
        };

        const { isError, isLoading, data } = useTotalCases({
            country: comparisonRegions,
            query_type: 'total_deaths',
            startDate: starDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            limit: 10000,
            page: 1,
        });

        console.log('is error', isError, 'isLoading', isLoading, 'data', data);

        // Define colors for the char
        const colors = [
            '#8884d8',
            '#82ca9d',
            'hsl(var(--chart-6))',
            'hsl(var(--chart-7))',
            'hsl(var(--chart-8))',
            'hsl(var(--chart-9))',
            'hsl(var(--chart-10))',
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
            'hsl(var(--chart-5))',
        ]; // Add more colors if needed

        console.log('Chart Config:', chartConfig);
        console.log('Data Keys:', dataKeys);

        const updateChartConfig = (dataKeys: string[]): ChartConfig => {
            return (
                dataKeys?.reduce<ChartConfig>(
                    (acc, key: string, index) => {
                        acc[key] = {
                            label: key.charAt(0) + key.slice(1),
                            color: colors[index % colors.length],
                        };
                        return acc;
                    },
                    {
                        world: {
                            label: 'world',
                            color: 'hsl(var(--chart-10))',
                        },
                    }
                ) || {}
            );
        };

        const onComparisonInputChange = (values: string[]) => {
            console.log('Comparison input changed:', values);
            setComparisonRegions((prevCountries: string[]) => {
                if (prevCountries.length > values.length) {
                    return [...values];
                } else {
                    return [...prevCountries, ...values];
                }
            });
        };

        React.useEffect(() => {
            if (data) {
                setChartData(data);
                const countries = getRegions(data);
                setDataKeys(countries);

                setChartConfig(updateChartConfig(countries));
            }
        }, [data, comparisonRegions, starDate, endDate]);
        const isMobile = useIsMobile();

        return (
            <div className="flex w-full space-x-10 ">
                <Card className="w-full md:w-4/5">
                    <CardHeader className="flex items-center gap-2 py-5 space-y-0 border-b sm:flex-row">
                        <div className="grid flex-1 gap-3 text-center sm:text-left">
                            <CardTitle>
                                Total Deaths Over Time by Region
                            </CardTitle>
                            <CardDescription>
                                This interactive area chart visualizes the total
                                number of deaths over time for selected regions
                                within a specified time period. It enables users
                                to explore trends, compare regions, and identify
                                patterns in mortality rates, providing valuable
                                insights into the progression and impact of
                                events over time. This tool is ideal for
                                tracking regional outcomes, evaluating
                                intervention effectiveness, and understanding
                                historical trends in total deaths.
                            </CardDescription>

                            <div className="flex flex-col space-y-5 md:space-x-10 md:flex-row md:w-3/6">
                                <DateRangePicker
                                    onUpdate={(values) => {
                                        console.log('values', values);

                                        setStartDate(values.range.from);
                                        if (values.range.to)
                                            setEndDate(values.range.to);
                                    }}
                                    initialDateFrom={starDate}
                                    initialDateTo={endDate}
                                    align="start"
                                    locale="en-US"
                                />
                                {isMobile && (
                                    <ComparisonInput
                                        onSelect={onComparisonInputChange}
                                        className="w-full"
                                        title="Add/Remove Regions"
                                        role="Regions"
                                        comparisonInputs={regions}
                                        baselineInput={BASELINE_REGION}
                                    />
                                )}
                            </div>
                        </div>

                        {isLoading && <Spinner />}
                    </CardHeader>
                    <CardContent className="px-2 pt-4 f sm:px-6 sm:pt-6">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <AreaChart data={chartData}>
                                <defs>
                                    {dataKeys.map((key) => (
                                        <linearGradient
                                            id={`fill${sanitizeKey(key)}`}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                            key={key}
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor={
                                                    chartConfig[key]?.color
                                                }
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor={
                                                    chartConfig[key]?.color
                                                }
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'short',
                                                day: 'numeric',
                                            }
                                        );
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(
                                                    value
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                });
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                {dataKeys.map((key) => {
                                    console.log(
                                        'char config color',
                                        chartConfig[key]?.color,
                                        `url(#fill${key})`
                                    );
                                    return (
                                        <Area
                                            key={key}
                                            dataKey={key}
                                            type="natural"
                                            fill={`url(#fill${sanitizeKey(
                                                key
                                            )})`}
                                            stroke={chartConfig[key]?.color}
                                            stackId="a"
                                        />
                                    );
                                })}
                                <ChartLegend
                                    className="hidden md:block"
                                    content={<ChartLegendContent />}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <ComparisonInput
                    onSelect={onComparisonInputChange}
                    className="hidden w-1/5 md:block"
                    title="Add/Remove Regions"
                    role="Regions"
                    comparisonInputs={regions}
                    baselineInput={BASELINE_REGION}
                />
            </div>
        );
    }
);