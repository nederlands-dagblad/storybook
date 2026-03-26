import React from 'react';
import Button from '../../../atoms/actionAtoms/Button/Button';
import { SubscriptionFeature } from '@molecules/subscriptionMolecules/SubscriptionCard/SubscriptionCard.tsx';
import { OrderSummaryRow } from '../SubscriptionDurationForm/SubscriptionDurationForm';
import { PersonalFormData } from '../SubscriptionPersonalForm/SubscriptionPersonalForm';
import SubscriptionFeaturesAccordion from '../SubscriptionFeaturesAccordion/SubscriptionFeaturesAccordion';

export interface SubscriptionSummaryPanelProps {
    heading?: string;
    className?: string;
    showOnMobile?: boolean;
    /** Renders as plain div without card/sticky/hidden styling — for use inside another panel */
    inline?: boolean;
    subscriptionTitle: string;
    subscriptionSubtitle?: string;
    features?: SubscriptionFeature[];
    onChangeSubscription?: () => void;
    changeSubscriptionLabel?: string;
    rows?: OrderSummaryRow[];
    footerText?: string;
    /** Personal data section */
    personalData?: PersonalFormData;
    onChangePersonal?: () => void;
    changePersonalLabel?: string;
}

const SubscriptionSummaryPanel: React.FC<SubscriptionSummaryPanelProps> = ({
    heading = 'Overzicht bestelling',
    className,
    showOnMobile = false,
    inline = false,
    subscriptionTitle,
    subscriptionSubtitle,
    features = [],
    onChangeSubscription,
    changeSubscriptionLabel = 'Kies een ander abonnement',
    rows = [],
    footerText,
    personalData,
    onChangePersonal,
    changePersonalLabel = 'Wijzig gegevens',
}) => {
    const fullName = [personalData?.firstName, personalData?.middleName, personalData?.lastName]
        .filter(Boolean).join(' ');
    const streetLine = [personalData?.street, personalData?.houseNumber, personalData?.addition]
        .filter(Boolean).join(' ');
    const cityLine = [personalData?.postcode, personalData?.city]
        .filter(Boolean).join(' ');

    return (
        <aside className={inline ? `flex flex-col gap-m ${className ?? ''}` : `${showOnMobile ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'} lg:sticky lg:top-l bg-background-default shadow-m p-m lg:p-l gap-m ${className ?? ''}`}>
            <h3 className="text-heading-2 text-text-default">{heading}</h3>

            {/* Subscription accordion */}
            <div className="flex flex-col gap-s">
                <SubscriptionFeaturesAccordion
                    label={subscriptionTitle}
                    subLabel={subscriptionSubtitle}
                    features={features}
                    onChangeSubscription={onChangeSubscription}
                    changeSubscriptionLabel={changeSubscriptionLabel}
                />
            </div>

            {/* Summary rows */}
            {rows.length > 0 && (
                <div className="flex flex-col gap-s">
                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className={`flex items-start justify-between gap-s ${row.isDivider ? 'pt-s border-t border-border-gray' : ''}`}
                        >
                            <span className="text-meta-light text-text-default">{row.label}</span>
                            <div className="flex flex-col items-end">
                                {row.originalValue && (
                                    <span className="text-meta-light text-text-default !line-through">
                                        {row.originalValue}
                                    </span>
                                )}
                                <span className={`text-text-default text-right ${row.isDivider ? 'text-body-bold' : 'text-meta-regular'}`}>
                                    {row.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {footerText && (
                <p className="text-meta-light text-text-default">{footerText}</p>
            )}

            {/* Personal data section */}
            {personalData && (
                <div className="flex flex-col gap-s pt-s border-t border-border-gray">
                    <h3 className="text-body-bold text-text-default">Gegevens</h3>
                    <div className="flex flex-col gap-xs">
                        {fullName && <span className="text-meta-light text-text-default">{fullName}</span>}
                        {personalData.email && <span className="text-meta-light text-text-default">{personalData.email}</span>}
                        {personalData.phone && <span className="text-meta-light text-text-default">{personalData.phone}</span>}
                        {streetLine && <span className="text-meta-light text-text-default">{streetLine}</span>}
                        {cityLine && <span className="text-meta-light text-text-default">{cityLine}</span>}
                    </div>
                    <Button
                        variant="pill"
                        label={changePersonalLabel}
                        iconLeft="pencil"
                        iconLeftVariant="outline"
                        onClick={onChangePersonal}
                        className="justify-center w-full"
                    />
                </div>
            )}
        </aside>
    );
};

export default SubscriptionSummaryPanel;
