import React from 'react';

import { TotalCasesOverTime } from './total-cases-over-time';
import { TotalCasesVsTotalDeathsAcrossRegions } from './total-cases-vs-total-death-across-regions';
import { TotalDeathsOverTimeForSelectedRegions } from './deaths-over-time-accros-regions';

function App() {
    return (
        <div className="flex flex-col h-full p-2 space-y-20 md:m-20 ">
            <div className="w-full ">
                <TotalCasesOverTime />
            </div>

            <div className="w-full md:w-2/4 ">
                <TotalCasesVsTotalDeathsAcrossRegions />
            </div>

            <div className="w-full ">
                <TotalDeathsOverTimeForSelectedRegions />
            </div>
        </div>
    );
}
export default App;
