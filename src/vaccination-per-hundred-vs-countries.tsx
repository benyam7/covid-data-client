import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import { worldCountries } from '@/lib/utils/world-countries';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './components/ui/card';
import { useIsMobile } from './lib/hooks/useIsMobile';

const data = [
    {
        id: 'IRN',
        value: 59.17,
    },
    {
        id: 'KNA',
        value: 48.12,
    },
    {
        id: 'ABW',
        value: 78.21,
    },
    {
        id: 'JPN',
        value: 68.41,
    },
    {
        id: 'OWID_SAM',
        value: 67.87,
    },
    {
        id: 'TCD',
        value: 5.83,
    },
    {
        id: 'NGA',
        value: 6.8,
    },
    {
        id: 'ROU',
        value: 16.01,
    },
    {
        id: 'COD',
        value: 2.48,
    },
    {
        id: 'NIC',
        value: 70.24,
    },
    {
        id: 'MCO',
        value: 52.72,
    },
    {
        id: 'HND',
        value: 35.56,
    },
    {
        id: 'POL',
        value: 48.99,
    },
    {
        id: 'ALB',
        value: 29.96,
    },
    {
        id: 'OWID_HIC',
        value: 67.58,
    },
    {
        id: 'LIE',
        value: 49.57,
    },
    {
        id: 'PAK',
        value: 44.49,
    },
    {
        id: 'AND',
        value: 53.69,
    },
    {
        id: 'MNP',
        value: null,
    },
    {
        id: 'COL',
        value: 44.08,
    },
    {
        id: 'BLR',
        value: 36.06,
    },
    {
        id: 'BRN',
        value: 51.6,
    },
    {
        id: 'GUF',
        value: null,
    },
    {
        id: 'MDV',
        value: 61.57,
    },
    {
        id: 'PLW',
        value: null,
    },
    {
        id: 'BLM',
        value: null,
    },
    {
        id: 'TGO',
        value: 16.21,
    },
    {
        id: 'TUN',
        value: 34.84,
    },
    {
        id: 'TJK',
        value: 24.94,
    },
    {
        id: 'BIH',
        value: 13.91,
    },
    {
        id: 'OWID_EUN',
        value: 64.11,
    },
    {
        id: 'LBN',
        value: 28.78,
    },
    {
        id: 'SYR',
        value: 8.4,
    },
    {
        id: 'OWID_ASI',
        value: 61.93,
    },
    {
        id: 'FRO',
        value: 53.49,
    },
    {
        id: 'DZA',
        value: 13.16,
    },
    {
        id: 'GEO',
        value: 24.97,
    },
    {
        id: 'OWID_WLS',
        value: 70.99,
    },
    {
        id: 'VAT',
        value: null,
    },
    {
        id: 'WLF',
        value: 43.36,
    },
    {
        id: 'KGZ',
        value: 21.53,
    },
    {
        id: 'FJI',
        value: 64.53,
    },
    {
        id: 'CMR',
        value: 3.82,
    },
    {
        id: 'IMN',
        value: 64.89,
    },
    {
        id: 'MKD',
        value: 23.28,
    },
    {
        id: 'ESP',
        value: 57.72,
    },
    {
        id: 'DOM',
        value: 55.52,
    },
    {
        id: 'LUX',
        value: 59.64,
    },
    {
        id: 'FLK',
        value: 46.79,
    },
    {
        id: 'SOM',
        value: 10.24,
    },
    {
        id: 'ISR',
        value: 63.89,
    },
    {
        id: 'MOZ',
        value: 24.37,
    },
    {
        id: 'DMA',
        value: 34.22,
    },
    {
        id: 'BTN',
        value: 68.06,
    },
    {
        id: 'AFG',
        value: 24.11,
    },
    {
        id: 'SWZ',
        value: 22.8,
    },
    {
        id: 'IDN',
        value: 36.73,
    },
    {
        id: 'PRI',
        value: null,
    },
    {
        id: 'UZB',
        value: 37.56,
    },
    {
        id: 'GUY',
        value: 42.78,
    },
    {
        id: 'MDA',
        value: 12.27,
    },
    {
        id: 'CAF',
        value: 21.67,
    },
    {
        id: 'ITA',
        value: 71.92,
    },
    {
        id: 'ERI',
        value: null,
    },
    {
        id: 'VCT',
        value: 28.44,
    },
    {
        id: 'GRC',
        value: 65.59,
    },
    {
        id: 'SMR',
        value: 44.38,
    },
    {
        id: 'SPM',
        value: null,
    },
    {
        id: 'EST',
        value: 57.01,
    },
    {
        id: 'KIR',
        value: 49.37,
    },
    {
        id: 'BRA',
        value: 62.39,
    },
    {
        id: 'BDI',
        value: 0.14,
    },
    {
        id: 'AGO',
        value: 23.65,
    },
    {
        id: 'MTQ',
        value: null,
    },
    {
        id: 'AUT',
        value: 63.78,
    },
    {
        id: 'LBY',
        value: 25.04,
    },
    {
        id: 'REU',
        value: null,
    },
    {
        id: 'CYM',
        value: 67.75,
    },
    {
        id: 'KHM',
        value: 57.68,
    },
    {
        id: 'JAM',
        value: 24.82,
    },
    {
        id: 'OWID_NAM',
        value: 63.92,
    },
    {
        id: 'GTM',
        value: 23.65,
    },
    {
        id: 'VUT',
        value: 23.56,
    },
    {
        id: 'LSO',
        value: 27.25,
    },
    {
        id: 'VEN',
        value: 29.36,
    },
    {
        id: 'GIB',
        value: 103.33,
    },
    {
        id: 'KAZ',
        value: 39.3,
    },
    {
        id: 'OWID_LMC',
        value: 51.11,
    },
    {
        id: 'CHE',
        value: 56.5,
    },
    {
        id: 'MLI',
        value: 6.23,
    },
    {
        id: 'SDN',
        value: 7.8,
    },
    {
        id: 'MHL',
        value: null,
    },
    {
        id: 'CUW',
        value: 51.28,
    },
    {
        id: 'BWA',
        value: 29.15,
    },
    {
        id: 'KOR',
        value: 69.44,
    },
    {
        id: 'KEN',
        value: 6.62,
    },
    {
        id: 'ESH',
        value: null,
    },
    {
        id: 'ECU',
        value: 56.21,
    },
    {
        id: 'VNM',
        value: 43.79,
    },
    {
        id: 'TLS',
        value: 48.74,
    },
    {
        id: 'TCA',
        value: 52.75,
    },
    {
        id: 'PYF',
        value: 38.38,
    },
    {
        id: 'BGD',
        value: 56.19,
    },
    {
        id: 'USA',
        value: 64.46,
    },
    {
        id: 'SHN',
        value: 60.42,
    },
    {
        id: 'MYT',
        value: null,
    },
    {
        id: 'GLP',
        value: null,
    },
    {
        id: 'MNG',
        value: 55.24,
    },
    {
        id: 'PER',
        value: 68.6,
    },
    {
        id: 'MAF',
        value: null,
    },
    {
        id: 'MLT',
        value: 74.61,
    },
    {
        id: 'MAC',
        value: 63.13,
    },
    {
        id: 'BGR',
        value: 11.11,
    },
    {
        id: 'PHL',
        value: 21.78,
    },
    {
        id: 'MNE',
        value: 35.04,
    },
    {
        id: 'BRB',
        value: 45.79,
    },
    {
        id: 'QAT',
        value: 75.09,
    },
    {
        id: 'HTI',
        value: 1.22,
    },
    {
        id: 'DNK',
        value: 66.73,
    },
    {
        id: 'HKG',
        value: 73.1,
    },
    {
        id: 'NPL',
        value: 44.82,
    },
    {
        id: 'CZE',
        value: 57.54,
    },
    {
        id: 'IRQ',
        value: 17.68,
    },
    {
        id: 'MDG',
        value: 4.63,
    },
    {
        id: 'VIR',
        value: null,
    },
    {
        id: 'URY',
        value: 74.92,
    },
    {
        id: 'CYP',
        value: 53.66,
    },
    {
        id: 'CUB',
        value: 83.96,
    },
    {
        id: 'LCA',
        value: 25.36,
    },
    {
        id: 'BFA',
        value: 7.62,
    },
    {
        id: 'AZE',
        value: 37.19,
    },
    {
        id: 'DEU',
        value: 62.47,
    },
    {
        id: 'RWA',
        value: 26.76,
    },
    {
        id: 'GRD',
        value: 25.74,
    },
    {
        id: 'TKL',
        value: 61.17,
    },
    {
        id: 'NIU',
        value: 55.72,
    },
    {
        id: 'OMN',
        value: 19.98,
    },
    {
        id: 'PRK',
        value: null,
    },
    {
        id: 'CRI',
        value: 54.83,
    },
    {
        id: 'IND',
        value: 59.11,
    },
    {
        id: 'COM',
        value: 27.1,
    },
    {
        id: 'THA',
        value: 53.84,
    },
    {
        id: 'AUS',
        value: 47.71,
    },
    {
        id: 'OWID_AFR',
        value: 21.79,
    },
    {
        id: 'CPV',
        value: 39.96,
    },
    {
        id: 'KWT',
        value: 77.92,
    },
    {
        id: 'GIN',
        value: 11.12,
    },
    {
        id: 'SSD',
        value: 10.23,
    },
    {
        id: 'GBR',
        value: 66.09,
    },
    {
        id: 'IRL',
        value: 78.77,
    },
    {
        id: 'AIA',
        value: 58.68,
    },
    {
        id: 'NZL',
        value: 62.82,
    },
    {
        id: 'LVA',
        value: 44.77,
    },
    {
        id: 'COK',
        value: 74.18,
    },
    {
        id: 'CIV',
        value: 6.13,
    },
    {
        id: 'HUN',
        value: 47.67,
    },
    {
        id: 'YEM',
        value: 1.94,
    },
    {
        id: 'FRA',
        value: 66.08,
    },
    {
        id: 'LTU',
        value: 60.52,
    },
    {
        id: 'TWN',
        value: 67.01,
    },
    {
        id: 'ARM',
        value: 20.21,
    },
    {
        id: 'ARE',
        value: 93.27,
    },
    {
        id: 'GAB',
        value: 5.4,
    },
    {
        id: 'TON',
        value: 54.29,
    },
    {
        id: 'MSR',
        value: 37.1,
    },
    {
        id: 'MRT',
        value: 23.35,
    },
    {
        id: 'OWID_OCE',
        value: 54.06,
    },
    {
        id: 'NCL',
        value: 49.3,
    },
    {
        id: 'TUR',
        value: 53.17,
    },
    {
        id: 'PCN',
        value: 100,
    },
    {
        id: 'LBR',
        value: 25.52,
    },
    {
        id: 'UGA',
        value: 11.49,
    },
    {
        id: 'SLV',
        value: 45.66,
    },
    {
        id: 'JEY',
        value: 69.26,
    },
    {
        id: 'COG',
        value: 5.54,
    },
    {
        id: 'EGY',
        value: 26.29,
    },
    {
        id: 'NOR',
        value: 59.18,
    },
    {
        id: 'ZAF',
        value: 26.08,
    },
    {
        id: 'MYS',
        value: 71.34,
    },
    {
        id: 'HRV',
        value: 48.25,
    },
    {
        id: 'JOR',
        value: 29.78,
    },
    {
        id: 'OWID_LIC',
        value: 17.15,
    },
    {
        id: 'CHL',
        value: 74.61,
    },
    {
        id: 'UKR',
        value: 16.45,
    },
    {
        id: 'GMB',
        value: 7.29,
    },
    {
        id: 'CHN',
        value: 88.23,
    },
    {
        id: 'MWI',
        value: 5.32,
    },
    {
        id: 'GHA',
        value: 18.31,
    },
    {
        id: 'OWID_EUR',
        value: 59.01,
    },
    {
        id: 'NLD',
        value: 61.22,
    },
    {
        id: 'SVN',
        value: 41.93,
    },
    {
        id: 'ZMB',
        value: 4.61,
    },
    {
        id: 'OWID_WRL',
        value: 55.01,
    },
    {
        id: 'MEX',
        value: 35.93,
    },
    {
        id: 'NAM',
        value: 9.02,
    },
    {
        id: 'LAO',
        value: 36.73,
    },
    {
        id: 'PSE',
        value: 15.06,
    },
    {
        id: 'GUM',
        value: null,
    },
    {
        id: 'ARG',
        value: 74,
    },
    {
        id: 'BHS',
        value: 26.95,
    },
    {
        id: 'PRY',
        value: 21.43,
    },
    {
        id: 'TTO',
        value: 36.8,
    },
    {
        id: 'BES',
        value: 45.91,
    },
    {
        id: 'MAR',
        value: 40.79,
    },
    {
        id: 'VGB',
        value: 55.58,
    },
    {
        id: 'OWID_ENG',
        value: 69.97,
    },
    {
        id: 'SLB',
        value: 22.52,
    },
    {
        id: 'TKM',
        value: 42.67,
    },
    {
        id: 'ATG',
        value: 47.27,
    },
    {
        id: 'OWID_CYN',
        value: 37.35,
    },
    {
        id: 'CAN',
        value: 65.02,
    },
    {
        id: 'ETH',
        value: 5.24,
    },
    {
        id: 'WSM',
        value: 56.56,
    },
    {
        id: 'GRL',
        value: 48.38,
    },
    {
        id: 'BOL',
        value: 38.82,
    },
    {
        id: 'ZWE',
        value: 21.18,
    },
    {
        id: 'GNB',
        value: 18.05,
    },
    {
        id: 'SUR',
        value: 29.91,
    },
    {
        id: 'OWID_KOS',
        value: 45.14,
    },
    {
        id: 'TUV',
        value: 57.82,
    },
    {
        id: 'FIN',
        value: 65.82,
    },
    {
        id: 'OWID_NIR',
        value: 64.74,
    },
    {
        id: 'GGY',
        value: 52.33,
    },
    {
        id: 'DJI',
        value: 18.06,
    },
    {
        id: 'BMU',
        value: 55.83,
    },
    {
        id: 'LKA',
        value: 46.5,
    },
    {
        id: 'TZA',
        value: 22.24,
    },
    {
        id: 'PRT',
        value: 79.07,
    },
    {
        id: 'BEL',
        value: 66.9,
    },
    {
        id: 'BEN',
        value: 12.17,
    },
    {
        id: 'NRU',
        value: 58.01,
    },
    {
        id: 'BLZ',
        value: 36.6,
    },
    {
        id: 'PNG',
        value: 2.46,
    },
    {
        id: 'SWE',
        value: 59.24,
    },
    {
        id: 'NER',
        value: 7.72,
    },
    {
        id: 'BHR',
        value: 67.21,
    },
    {
        id: 'MMR',
        value: 36.21,
    },
    {
        id: 'RUS',
        value: 37.24,
    },
    {
        id: 'PAN',
        value: 44.84,
    },
    {
        id: 'ASM',
        value: null,
    },
    {
        id: 'GNQ',
        value: 11.53,
    },
    {
        id: 'OWID_UMC',
        value: 68,
    },
    {
        id: 'FSM',
        value: null,
    },
    {
        id: 'MUS',
        value: 66.64,
    },
    {
        id: 'ISL',
        value: 49.64,
    },
];

export const VaccinationCoverageChoropleth = () => {
    const isMobile = useIsMobile();
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
            </CardHeader>
            <CardContent className="h-[600px]">
                <ResponsiveChoroplethCanvas
                    data={data}
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
                            anchor: isMobile ? 'bottom-right' : 'bottom-left',
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
            </CardContent>
        </Card>
    );
};
