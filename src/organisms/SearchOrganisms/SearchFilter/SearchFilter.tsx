import React, { useState } from 'react';
import Button from '@atoms/actionAtoms/Button/Button';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import Badge from '@atoms/displayAtoms/Badge/Badge';
import Tag from '@atoms/actionAtoms/Tag/Tag';
import Icon from '@atoms/basicAtoms/Icon/Icon';
import Dropdown, { DropdownOption } from '@molecules/formMolecules/Dropdown/Dropdown';

export interface FilterOption {
    label: string;
    count: number;
}

export interface FilterCategory {
    name: string;
    options: FilterOption[];
}

export interface SearchFilterProps {
    searchTerm: string;
    categories: FilterCategory[];
    selectedFilters?: string[];
    onFilterSelect?: (label: string) => void;
    onFilterRemove?: (label: string) => void;
    sortOptions?: DropdownOption[];
    sortValue?: string;
    onSortChange?: (value: string) => void;
    maxVisible?: number;
}

const DEFAULT_MAX_VISIBLE = 6;

export const SearchFilter: React.FC<SearchFilterProps> = ({
    searchTerm,
    categories,
    selectedFilters = [],
    onFilterSelect,
    onFilterRemove,
    sortOptions = [],
    sortValue,
    onSortChange,
    maxVisible = DEFAULT_MAX_VISIBLE,
}) => {
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [showMoreMap, setShowMoreMap] = useState<Record<string, boolean>>({});

    const handleFilterToggle = (active: boolean) => {
        setFilterPanelOpen(active);
        if (active) setSortOpen(false);
    };

    const handleSortOpenChange = (open: boolean) => {
        setSortOpen(open);
        if (open) setFilterPanelOpen(false);
    };

    const toggleShowMore = (categoryName: string) => {
        setShowMoreMap(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
    };

    return (
        <div className="flex flex-col gap-m">
            <h1 className="text-heading-xl text-text-default">
                Zoekresultaten voor: <span className="text-heading-light">{searchTerm}</span>
            </h1>

            <div className="flex gap-xs">
                <Button
                    variant="pill"
                    label="Filteren"
                    iconLeft="funnel"
                    isActive={filterPanelOpen}
                    onToggle={handleFilterToggle}
                />
                <Dropdown
                    variant="pill"
                    label="Sorteren"
                    options={sortOptions}
                    value={sortValue}
                    onChange={onSortChange}
                    isOpen={sortOpen}
                    onOpenChange={handleSortOpenChange}
                />
            </div>

            {filterPanelOpen && (
                <CardContainer borderColor="gray-subtle" padding="m">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-l">
                        {categories.map((category) => {
                            const isExpanded = showMoreMap[category.name] ?? false;
                            const visibleOptions = isExpanded
                                ? category.options
                                : category.options.slice(0, maxVisible);
                            const hasMore = category.options.length > maxVisible;

                            return (
                                <div key={category.name} className="flex flex-col gap-xs">
                                    <span className="text-heading-m text-text-default">{category.name}</span>

                                    {visibleOptions.map((option) => {
                                        const isSelected = selectedFilters.includes(option.label);
                                        return (
                                            <button
                                                key={option.label}
                                                onClick={() => onFilterSelect?.(option.label)}
                                                className="flex items-center justify-between gap-xs text-left hover:text-text-brand"
                                            >
                                                <span className={isSelected ? 'text-body-bold text-text-default' : 'text-body-light text-text-default'}>
                                                    {option.label}
                                                </span>
                                                <Badge variant="default" label={option.count.toString()} />
                                            </button>
                                        );
                                    })}

                                    {hasMore && (
                                        <button
                                            onClick={() => toggleShowMore(category.name)}
                                            className="flex items-center gap-xxs text-meta-regular text-text-gray hover:text-text-default"
                                        >
                                            <span>{isExpanded ? 'Minder tonen' : 'Meer tonen'}</span>
                                            <Icon
                                                name="caret-down"
                                                size="s"
                                                color="gray"
                                                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContainer>
            )}

            {selectedFilters.length > 0 && (
                <div className="flex flex-wrap gap-xs">
                    {selectedFilters.map((filter) => (
                        <Tag
                            key={filter}
                            label={filter}
                            onRemove={() => onFilterRemove?.(filter)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
