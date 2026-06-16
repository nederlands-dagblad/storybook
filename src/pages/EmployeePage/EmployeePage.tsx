import React, { useState } from 'react';
import PageSection from '@molecules/PageSectionMolecules/PageSection/PageSection';
import PageHeading from '@atoms/displayAtoms/PageHeading/PageHeading';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import Button from '@atoms/actionAtoms/Button/Button';
import Dropdown from '@molecules/formMolecules/Dropdown/Dropdown';

const ALL_TEAMS_VALUE = 'all';
const ALL_TEAMS_LABEL = 'Alle teams';

export interface Employee {
    name: string;
    role: string;
    department: string;
    image?: string;
    authorPageUrl?: string;
    editUrl?: string;
}

export interface EmployeePageProps {
    heading?: string;
    intro?: string;
    employees?: Employee[];
    largeDepartments?: string[];
    buttonLabel?: string;
}

const EmployeePage: React.FC<EmployeePageProps> = ({
    heading = 'Wie zijn wij?',
    intro = 'Onderstaande medewerkers van het Nederlands Dagblad verzorgen voor u de krant, website, app, abonnementen, advertenties en de sociale media-accounts.',
    employees = [],
    largeDepartments = ['Directie', 'Hoofdredactie'],
    buttonLabel = 'Lees bio',
}) => {
    const [selectedDepartment, setSelectedDepartment] = useState(ALL_TEAMS_VALUE);

    const grouped = employees.reduce<{ department: string; members: Employee[] }[]>((acc, employee) => {
        const existing = acc.find(g => g.department === employee.department);
        if (existing) {
            existing.members.push(employee);
        } else {
            acc.push({ department: employee.department, members: [employee] });
        }
        return acc;
    }, []);

    const filterOptions = [
        { label: ALL_TEAMS_LABEL, value: ALL_TEAMS_VALUE },
        ...grouped.map(({ department }) => ({ label: department, value: department })),
    ];

    const visibleGroups = selectedDepartment === ALL_TEAMS_VALUE
        ? grouped
        : grouped.filter(g => g.department === selectedDepartment);

    return (
        <div className="w-full">
            <PageSection>
                <div className="flex flex-col gap-l lg:gap-xl">
                    <div className="text-center">
                        <PageHeading title={heading} showBody={true} bodyText={intro} />
                    </div>

                    {/* Mobile: select dropdown */}
                    <div className="lg:hidden">
                        <Dropdown
                            variant="select"
                            options={filterOptions}
                            value={selectedDepartment}
                            onChange={setSelectedDepartment}
                        />
                    </div>

                    {/* Desktop: pill buttons */}
                    <div className="hidden lg:flex flex-wrap gap-xs">
                        {filterOptions.map(({ label, value }) => (
                            <Button
                                key={value}
                                variant="pill"
                                label={label}
                                isActive={selectedDepartment === value}
                                onToggle={() => setSelectedDepartment(value)}
                            />
                        ))}
                    </div>

                    {visibleGroups.map(({ department, members }) => {
                        const isLarge = largeDepartments.includes(department);
                        const gridClass = isLarge
                            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

                        return (
                            <div key={department} className="flex flex-col gap-m">
                                <h3 className="text-heading-m text-text-default">{department}</h3>
                                <div className={`grid ${gridClass} gap-s`}>
                                    {members.map((employee, i) => (
                                        <CardContainer key={i} padding="none" borderColor="gray-subtle" className="relative flex flex-col h-full">
                                            {employee.editUrl && (
                                                <Button
                                                    variant="primary"
                                                    label="Bewerken"
                                                    href={employee.editUrl}
                                                    target="_blank"
                                                    className="absolute top-xs left-xs z-50"
                                                />
                                            )}
                                            {employee.image && (
                                                <img
                                                    src={employee.image}
                                                    alt={employee.name}
                                                    className="w-full aspect-[3/4] object-cover"
                                                />
                                            )}
                                            <div className="flex flex-1 flex-col items-center text-center gap-xxs p-xs md:p-s" lang="nl">
                                                <span className="text-meta-uppercase text-text-brand break-words hyphens-auto">{employee.role}</span>
                                                <span className="text-body-bold text-text-default break-words hyphens-auto">{employee.name}</span>
                                                {employee.authorPageUrl && (
                                                    <Button
                                                        variant="pill"
                                                        label={buttonLabel}
                                                        iconRight="caret-right"
                                                        href={employee.authorPageUrl}
                                                        className="mt-auto w-fit"
                                                    />
                                                )}
                                            </div>
                                        </CardContainer>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PageSection>
        </div>
    );
};

export default EmployeePage;
