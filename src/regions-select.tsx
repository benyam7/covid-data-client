import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { regions } from './lib/utils/regions';
import { BASELINE_REGION } from './lib/utils/constants';

export function SelectRegion({
    onRegionChange,
}: {
    onRegionChange: (region: string) => void;
}) {
    return (
        <Select
            onValueChange={(value) => {
                onRegionChange(value);
            }}
            value={BASELINE_REGION}
        >
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Regions</SelectLabel>
                    {regions.map((region) => {
                        return (
                            <SelectItem key={region} value={region}>
                                {region}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
