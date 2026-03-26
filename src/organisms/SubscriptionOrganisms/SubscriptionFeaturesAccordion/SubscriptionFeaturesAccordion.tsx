import React from 'react';
import { AccordionItem } from '../../../molecules/contentOrganizationMolecules/Accordion/accordion';
import Button from '../../../atoms/actionAtoms/Button/Button';
import { SubscriptionFeature } from '../../../molecules/subscriptionMolecules/SubscriptionCard/subscriptionCard';
import SubscriptionFeaturesList from '../../../molecules/subscriptionMolecules/SubscriptionFeaturesList/SubscriptionFeaturesList';

export interface SubscriptionFeaturesAccordionProps {
    label: string;
    subLabel?: React.ReactNode;
    features?: SubscriptionFeature[];
    onChangeSubscription?: () => void;
    changeSubscriptionLabel?: string;
}

const SubscriptionFeaturesAccordion: React.FC<SubscriptionFeaturesAccordionProps> = ({
    label,
    subLabel,
    features = [],
    onChangeSubscription,
    changeSubscriptionLabel = 'Kies een ander abonnement',
}) => {
    return (
        <>
            <AccordionItem
                label={label}
                subLabel={subLabel}
                content={<SubscriptionFeaturesList features={features} />}
            />
            <Button
                variant="pill"
                label={changeSubscriptionLabel}
                iconLeft="arrows-clockwise"
                iconLeftVariant="outline"
                onClick={onChangeSubscription}
                className="justify-center w-full"
            />
        </>
    );
};

export default SubscriptionFeaturesAccordion;
