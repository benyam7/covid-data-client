import React, { useState, useEffect } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

export const ComparisonInput = React.memo(
    ({
        onSelect,
        className = '',
        title,
        role,
        comparisonInputs,
        baselineInput,
        openByDefault = true,
    }: {
        onSelect: (selectedItems: string[]) => void;
        className?: string;
        title: string;
        role: string;
        comparisonInputs: string[];
        baselineInput: string;
        openByDefault?: boolean;
    }) => {
        const isMobile = useIsMobile();
        const [open, setOpen] = useState(false);
        const [selectedCountries, setSelectedCountries] = useState<string[]>([
            baselineInput,
        ]);

        // So, baseline country wont be listed both in selected and all countries group
        const countriesAndRegions = comparisonInputs.filter(
            (c) => c !== baselineInput
        );

        const [allCountriesAndRegions, setAllCountriesAndRegions] =
            useState<string[]>(countriesAndRegions);

        const handleToggle = (value: string) => {
            setSelectedCountries((prevSelected) =>
                prevSelected.includes(value)
                    ? prevSelected.filter((item) => item !== value)
                    : [value, ...prevSelected]
            );
            setAllCountriesAndRegions((prevSelected) =>
                prevSelected.includes(value)
                    ? prevSelected.filter((item) => item !== value)
                    : [value, ...prevSelected]
            );
        };

        useEffect(() => {
            onSelect(selectedCountries);
        }, [selectedCountries]);

        return (
            <div className={cn('mb-4', className)}>
                <label className="block mb-2 text-sm text-gray-700 uppercase">
                    {title}
                </label>
                <Popover
                    open={isMobile ? open : openByDefault ? true : open}
                    onOpenChange={setOpen}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-between w-full"
                            aria-expanded={true}
                            aria-haspopup="listbox"
                        >
                            {selectedCountries.length > 0
                                ? `${selectedCountries.length} selected`
                                : `Select ${role}...`}
                            <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command className="w-full">
                            <CommandInput role={`Search ${role}...`} />
                            <CommandList>
                                <ScrollArea className="w-full h-72">
                                    <CommandGroup
                                        heading={`Selected ${role}...`}
                                    >
                                        {selectedCountries &&
                                            selectedCountries.map((item) => (
                                                <CommandItem
                                                    key={item}
                                                    onSelect={() =>
                                                        handleToggle(item)
                                                    }
                                                >
                                                    {/* This is causing an issue, button nested in button error in react. */}
                                                    {/* <Button
                                                        onClick={() =>
                                                            handleToggle(item)
                                                        }
                                                        variant={'outline'}
                                                        className="justify-start w-full h-5 p-0 m-0 border-0 bg-none hover:bg-none focus:bg-none"
                                                    > */}
                                                    <Checkbox
                                                        checked={selectedCountries.includes(
                                                            item
                                                        )}
                                                        onCheckedChange={() =>
                                                            handleToggle(item)
                                                        }
                                                        id={item}
                                                    />
                                                    <label
                                                        htmlFor={item}
                                                        className="ml-2"
                                                    >
                                                        {item}
                                                    </label>
                                                    {/* </Button> */}
                                                </CommandItem>
                                            ))}
                                    </CommandGroup>
                                    <CommandGroup heading={`All ${role}...`}>
                                        {allCountriesAndRegions.map((item) => (
                                            <CommandItem
                                                key={item}
                                                onSelect={() =>
                                                    handleToggle(item)
                                                }
                                            >
                                                {/* <Button
                                                    onClick={() =>
                                                        handleToggle(item)
                                                    }
                                                    variant={'outline'}
                                                    className="justify-start w-full h-5 p-0 m-0 border-0 bg-none hover:bg-none focus:bg-none"
                                                > */}
                                                <Checkbox
                                                    checked={selectedCountries.includes(
                                                        item
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleToggle(item)
                                                    }
                                                    id={item}
                                                />
                                                <label
                                                    htmlFor={item}
                                                    className="ml-2"
                                                >
                                                    {item}
                                                </label>
                                                {/* </Button> */}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </ScrollArea>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }
);
