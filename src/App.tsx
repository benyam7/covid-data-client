import React from 'react';

import { TotalCasesOverTime } from '@/lib/interactive-charts/total-cases-over-time';
import { TotalCasesVsTotalDeathsAcrossRegions } from '@/lib/interactive-charts/total-cases-vs-total-death-across-regions';
import { TotalDeathsOverTimeForSelectedRegions } from '@/lib/interactive-charts/deaths-over-time-accros-regions';
import { AgeGroupProportionsVsCasesAndDeathsChart } from '@/lib/interactive-charts/age-group-proportion-vs-total-deaths';
import { VaccinationCoverageChoropleth } from '@/lib/interactive-charts/vaccination-per-hundred-vs-countries';

function App() {
    return (
        <div className="flex flex-col h-full p-2 space-y-20 md:m-20 ">
            <div className="w-full ">
                <TotalCasesOverTime />
            </div>

            <div className="flex flex-col w-full space-y-4 lg:items-start lg:flex-row lg:space-x-10">
                <div className="flex h-full lg:w-1/2">
                    <TotalCasesVsTotalDeathsAcrossRegions />
                </div>
                <div className="flex h-full lg:w-1/2">
                    <AgeGroupProportionsVsCasesAndDeathsChart />
                </div>
            </div>

            <div className="w-full ">
                <TotalDeathsOverTimeForSelectedRegions />
            </div>

            <div className="w-full ">
                <VaccinationCoverageChoropleth />
            </div>
        </div>
    );
}
export default App;
