import * as React from 'react';

import {
    Area,
    AreaChart,
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
} from 'recharts';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { ComparisonInput } from '@/components/ui/comparision-input';
import { sampleData } from './lib/data/sampleData';
import { CountryData, useTotalCases } from './lib/api/api';
import Spinner from './components/ui/spinner';
import { BASELINE_COUNTRY } from './lib/utils/constants';
import { Button } from 'react-day-picker';

export const TotalCasesOverTime = React.memo(function TotalCasesOverTime() {
    // let chartData: CountryData[] = [];
    const [comparisonCountries, setComparisonCountries] = React.useState<
        string[]
    >([BASELINE_COUNTRY]);
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
        startDate: '2020-09-01',
        endDate: '2023-09-01',
        limit: 10000,
        page: 1,
    });

    console.log('is error', isError, 'isLoading', isLoading, 'data', data);

    const [timeRange, setTimeRange] = React.useState('90d');

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

    // const chartConfig: ChartConfig = console.log('chartConfig', chartConfig);

    const onComparisonInputChange = (values: string[]) => {
        console.log('Comparison input changed:', values);
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
    }, [data, comparisonCountries]);

    return (
        <div className="flex w-full space-x-10 ">
            <Card className="w-full md:w-4/5">
                <CardHeader className="flex items-center gap-2 py-5 space-y-0 border-b sm:flex-row">
                    <div className="grid flex-1 gap-3 text-center sm:text-left">
                        <CardTitle>Time Series Comparison</CardTitle>
                        <CardDescription>
                            Compare case trends between regions or demographics
                            over time.
                        </CardDescription>
                        <DatePickerWithRange />
                    </div>
                    {/* <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="w-[160px] rounded-lg sm:ml-auto"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select> */}
                    {isLoading && <Spinner />}
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
                                        labelFormatter={(value) => {
                                            return new Date(
                                                value
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            });
                                        }}
                                        indicator="dot"
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
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                            <ChartLegend content={<ChartLegendContent />} />
                        </LineChart>

                        {/* <AreaChart data={filteredData}>
                            <defs>
                                {dataKeys?.map((key) => (
                                    <linearGradient
                                        id={`fill${key}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                        key={key}
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={chartConfig[key].color}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={chartConfig[key].color}
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
                                    return date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    });
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
                            {dataKeys?.map((key) => (
                                <Area
                                    key={key}
                                    dataKey={key}
                                    type="natural"
                                    fill={`url(#fill${key})`}
                                    stroke={chartConfig[key].color}
                                    stackId="a"
                                />
                            ))}
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart> */}
                    </ChartContainer>
                </CardContent>
            </Card>
            {/* <Button className="block md:hidden"></Button> */}
            <ComparisonInput
                onSelect={onComparisonInputChange}
                className="hidden w-1/5 md:block"
            />
        </div>
    );
});
