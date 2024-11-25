import React from 'react';
import {
    LineChart,
    AreaChart,
    CartesianGrid,
    XAxis,
    Line,
    Area,
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
import { ComparisonInput } from '@/components/ui/comparision-input';
import { CountryData, useQueryCovidData } from '@/lib/api/api';
import Spinner from '@/components/ui/spinner';
import { DateRangePicker } from '@/components/ui/date-picker-range';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { sanitizeKey } from '@/lib/utils';

interface ComparisonChartProps {
    title: string;
    description: string;
    initialComparisonValues: string[];
    comparisonInputs: string[];
    baselineInput: string;
    queryType: string;
    chartType: 'area' | 'line';
    colors: string[];
    getKeysFromData: (data: CountryData[]) => string[];
    updateChartConfig: (dataKeys: string[]) => ChartConfig;
    comparisonInputTitle: string;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
    title,
    description,
    initialComparisonValues,
    comparisonInputs,
    baselineInput,
    queryType,
    chartType,
    colors,
    comparisonInputTitle,
    getKeysFromData,
    updateChartConfig,
}) => {
    const [comparisonValues, setComparisonValues] = React.useState<string[]>(
        initialComparisonValues
    );
    const [startDate, setStartDate] = React.useState<Date>(
        new Date('2020-01-30')
    );
    const [endDate, setEndDate] = React.useState<Date>(new Date());
    const [dataKeys, setDataKeys] = React.useState<string[]>([baselineInput]);
    const [chartData, setChartData] = React.useState<CountryData[]>([]);
    const [chartConfig, setChartConfig] = React.useState<ChartConfig>({});

    const { isError, isLoading, data } = useQueryCovidData({
        country: comparisonValues,
        query_type: queryType,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        limit: 10000,
        page: 1,
    });

    const onComparisonInputChange = (values: string[]) => {
        setComparisonValues(values);
    };

    React.useEffect(() => {
        if (data) {
            setChartData(data);
            const keys = getKeysFromData(data);
            setDataKeys(keys);
            setChartConfig(updateChartConfig(keys));
        }
    }, [data]);

    const isMobile = useIsMobile();

    return (
        <div className="flex w-full space-x-10">
            <Card className="w-full md:w-4/5">
                <CardHeader className="flex items-center gap-2 py-5 space-y-0 border-b sm:flex-row">
                    <div className="grid flex-1 gap-3 sm:text-left">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                        <div className="flex flex-col space-y-5 md:space-x-10 md:flex-row md:w-3/6">
                            <DateRangePicker
                                onUpdate={(values) => {
                                    setStartDate(values.range.from);
                                    if (values.range.to)
                                        setEndDate(values.range.to);
                                }}
                                initialDateFrom={startDate}
                                initialDateTo={endDate}
                                align="start"
                                locale="en-US"
                            />
                            {isMobile && (
                                <ComparisonInput
                                    onSelect={onComparisonInputChange}
                                    className="w-full"
                                    title={`Add/Remove ${comparisonInputTitle}`}
                                    role={baselineInput}
                                    comparisonInputs={comparisonInputs}
                                    baselineInput={baselineInput}
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
                    {/* @ts-ignore */}
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        {chartType === 'area' && (
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
                                                    year: '2-digit',
                                                });
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                {dataKeys.map((key) => (
                                    <Area
                                        key={key}
                                        dataKey={key}
                                        type="natural"
                                        fill={`url(#fill${sanitizeKey(key)})`}
                                        stroke={chartConfig[key]?.color}
                                        stackId="a"
                                    />
                                ))}
                                <ChartLegend
                                    className="hidden md:flex"
                                    content={<ChartLegendContent />}
                                />
                            </AreaChart>
                        )}
                        {chartType === 'line' && (
                            <LineChart data={chartData}>
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
                                {dataKeys.map((key) => (
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
                        )}
                    </ChartContainer>
                </CardContent>
            </Card>
            <ComparisonInput
                onSelect={onComparisonInputChange}
                className="hidden w-1/5 md:block"
                title={`Add/Remove ${comparisonInputTitle}`}
                role={baselineInput}
                comparisonInputs={comparisonInputs}
                baselineInput={baselineInput}
                openByDefault={chartType === 'area' ? false : true}
            />
        </div>
    );
};
