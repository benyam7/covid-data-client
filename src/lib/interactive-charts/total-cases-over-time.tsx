import * as React from 'react';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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
import { CountryData, useTotalCases } from '@/lib/api/api';
import Spinner from '@/components/ui/spinner';
import { BASELINE_COUNTRY } from '@/lib/utils/constants';
import { DateRangePicker } from '@/components/ui/date-picker-range';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { countries } from '@/lib/utils/countries';

export const TotalCasesOverTime = React.memo(function TotalCasesOverTime() {
    // let chartData: CountryData[] = [];
    const [comparisonCountries, setComparisonCountries] = React.useState<
        string[]
    >([BASELINE_COUNTRY]);

    const [starDate, setStartDate] = React.useState<Date>(
        new Date('2020-01-30')
    );
    const [endDate, setEndDate] = React.useState<Date>(new Date());

    const [dataKeys, setDataKeys] = React.useState<string[]>([
        BASELINE_COUNTRY,
    ]);
    const [chartData, setChartData] = React.useState<CountryData[]>([]);
    const [chartConfig, setChartConfig] = React.useState<ChartConfig>({});
    const getCountries = (data: CountryData[]): string[] => {
        const countries = new Set<string>();

        data.forEach((entry) => {
            Object.keys(entry).forEach((key) => {
                if (key !== 'date') {
                    countries.add(key);
                }
            });
        });

        return Array.from(countries);
    };

    const { isError, isLoading, data } = useTotalCases({
        country: comparisonCountries,
        query_type: 'total_cases',
        startDate: starDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        limit: 10000,
        page: 1,
    });

    // Define colors for the char
    const colors = [
        '#8884d8',
        '#82ca9d',
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
    ]; // Add more colors if needed

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
                        color: 'hsl(var(--chart-5))',
                    },
                }
            ) || {}
        );
    };

    const onComparisonInputChange = (values: string[]) => {
        setComparisonCountries((prevCountries: string[]) => {
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
            const countries = getCountries(data);
            setDataKeys(countries);

            setChartConfig(updateChartConfig(countries));
        }
    }, [data, comparisonCountries, starDate, endDate]);
    const isMobile = useIsMobile();

    if (isError) {
        return (
            <div className="text-center text-destructive">
                Unable to cases data. Please try again later.
            </div>
        );
    }

    return (
        <div className="flex w-full space-x-10 ">
            <Card className="w-full md:w-4/5">
                <CardHeader className="flex items-center gap-2 py-5 space-y-0 border-b sm:flex-row">
                    <div className="grid flex-1 gap-3 text-center sm:text-left">
                        <CardTitle>
                            Country-wise Total Cases Comparison Over a Selected
                            Period
                        </CardTitle>
                        <CardDescription>
                            This visualization highlights the total number of
                            cases across selected countries within a specified
                            time period. It provides valuable insights into the
                            distribution and trends of cases globally, helping
                            to identify countries with higher case counts and
                            track the progression of the pandemic over time.
                        </CardDescription>

                        <div className="flex flex-col space-y-5 md:space-x-10 md:flex-row md:w-3/6">
                            <DateRangePicker
                                onUpdate={(values) => {
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
                                    title="Add/Remove Countries"
                                    role="Countries"
                                    comparisonInputs={countries}
                                    baselineInput={BASELINE_COUNTRY}
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-2 pt-4 f sm:px-6 sm:pt-6">
                    {isLoading && (
                        <div className="flex items-center justify-center w-full">
                            <Spinner />
                        </div>
                    )}
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        indicator="line"
                                        labelFormatter={(value) => {
                                            return new Date(
                                                value
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            });
                                        }}
                                    />
                                }
                            />
                            {/* {dataKeys?.map((key) => (
                                <Area
                                    key={key}
                                    dataKey={key}
                                    type="natural"
                                    fill={`url(#fill${key})`}
                                    stroke={chartConfig[key].color}
                                    stackId="a"
                                />
                            ))} */}

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    });
                                }}
                            />
                            {dataKeys?.map((key) => (
                                <Line
                                    key={key}
                                    dataKey={key}
                                    type="monotone"
                                    stroke={chartConfig[key]?.color}
                                    strokeWidth={1}
                                    dot={false}
                                />
                            ))}
                            <ChartLegend content={<ChartLegendContent />} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <ComparisonInput
                onSelect={onComparisonInputChange}
                className="hidden w-1/5 md:block"
                title="Add/Remove Countries"
                role="Countries"
                comparisonInputs={countries}
                baselineInput={BASELINE_COUNTRY}
            />
        </div>
    );
});
