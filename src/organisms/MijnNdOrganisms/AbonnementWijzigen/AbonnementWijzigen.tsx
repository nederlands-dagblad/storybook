import React, { useState } from 'react';
import { AccordionItem } from '@molecules/contentOrganizationMolecules/Accordion/Accordion';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import SubscriptionFeaturesList from '@molecules/subscriptionMolecules/SubscriptionFeaturesList/SubscriptionFeaturesList';
import { SubscriptionFeature } from '@molecules/subscriptionMolecules/SubscriptionCard/SubscriptionCard';
import Input from '@molecules/formMolecules/Input/Input';
import Button from '@atoms/actionAtoms/Button/Button';
import Alert from '@molecules/feedbackMolecules/Alert/Alert';
import RadioButton from '@molecules/formMolecules/RadioButton/RadioButton';

type SubscriptionType = 'digitaal-basis' | 'digitaal-plus' | 'digitaal-papier';

const subscriptions: { id: SubscriptionType; title: string }[] = [
    { id: 'digitaal-basis', title: 'Digitaal Basis' },
    { id: 'digitaal-plus', title: 'Digitaal Plus' },
    { id: 'digitaal-papier', title: 'Digitaal + Papier' },
];

export interface BezorgDag {
    label: string;
    description?: string;
    price?: string;
    value: string;
}

export interface AbonnementWijzigenProps {
    currentSubscription?: SubscriptionType;
    prijsDigitaalBasis?: string;
    prijsDigitaalPlus?: string;
    prijsDigitaalPapier?: string;
    features?: Partial<Record<SubscriptionType, SubscriptionFeature[]>>;
    bezorgDagen?: BezorgDag[];
    actieAbonnement?: boolean;
    onSelect?: (subscription: SubscriptionType) => void;
}

export const AbonnementWijzigen: React.FC<AbonnementWijzigenProps> = ({
    currentSubscription,
    prijsDigitaalBasis,
    prijsDigitaalPlus,
    prijsDigitaalPapier,
    features,
    bezorgDagen = [],
    actieAbonnement,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionType | undefined>(currentSubscription);
    const [startdatum, setStartdatum] = useState('');
    const [selectedBezorgDag, setSelectedBezorgDag] = useState<string | undefined>();
    const [submitted, setSubmitted] = useState(false);

    const prices: Record<SubscriptionType, string | undefined> = {
        'digitaal-basis': prijsDigitaalBasis,
        'digitaal-plus': prijsDigitaalPlus,
        'digitaal-papier': prijsDigitaalPapier,
    };

    const handleSelect = (id: SubscriptionType) => {
        setSelectedSubscription(id);
        setStartdatum('');
        setSelectedBezorgDag(undefined);
        onSelect?.(id);
    };

    const selectedFeatures = selectedSubscription ? features?.[selectedSubscription] : undefined;

    const content = submitted ? (
        <Alert>
            {'Dank u wel voor het doorgeven van uw wijziging. Wij verwerken deze in ons systeem en sturen u vervolgens een bevestiging per e-mail. Heeft u nog vragen of opmerkingen? Dan kunt u <a href="https://nd.nl/service/contact" class="underline">hier</a> contact met ons opnemen.'}
        </Alert>
    ) : (
        <div className="flex flex-col gap-m">
            {actieAbonnement && (
                <Alert variant="warning">
                    U heeft een actie-abonnement met een vaste looptijd. Wanneer u uw abonnement wijzigt, gaat deze pas in na de einddatum van uw huidige abonnement.
                </Alert>
            )}
            <div className="grid grid-cols-3 gap-xs md:gap-s max-w-lg">
                {subscriptions.map(({ id, title }) => {
                    const isCurrent = currentSubscription === id;
                    const isSelected = selectedSubscription === id;
                    const price = prices[id];

                    return (
                        <button
                            key={id}
                            type="button"
                            className="flex flex-col p-0 border-0 bg-transparent cursor-pointer text-left w-full"
                            onClick={() => handleSelect(id)}
                        >
                            <CardContainer
                                borderColor={isSelected ? 'brand' : 'gray-subtle'}
                                padding="none"
                                className={`h-full flex flex-col w-full transition-[border-color] duration-200 ease-in-out ${!isSelected ? 'hover:border-border-brand' : ''}`}
                            >
                                {isCurrent && (
                                    <div className="text-meta-uppercase text-text-brand bg-background-brand-subtle px-xs md:px-s py-xxs text-center">
                                        Huidig abonnement
                                    </div>
                                )}
                                <div className="p-xs md:p-s flex flex-col gap-xxs text-center flex-1 justify-center">
                                    <span className="text-heading-s text-text-default">{title}</span>
                                    <span className="text-meta-light text-text-default">
                                        {price ?? '€....,—'}/maand
                                    </span>
                                </div>
                            </CardContainer>
                        </button>
                    );
                })}
            </div>
            {selectedFeatures && selectedFeatures.length > 0 && (
                <SubscriptionFeaturesList features={selectedFeatures} />
            )}
            {selectedSubscription && selectedSubscription !== currentSubscription && (
                <div className="flex flex-col gap-m">
                    {selectedSubscription === 'digitaal-papier' && bezorgDagen.length > 0 && (
                        <div className="flex flex-col gap-s">
                            <h2 className="text-heading-s text-text-default">Op welke dag wilt u de papieren krant ontvangen?</h2>
                            <div className="flex flex-col gap-xs">
                                {bezorgDagen.map((dag) => (
                                    <RadioButton
                                        key={dag.value}
                                        variant="card"
                                        layout="horizontal"
                                        heading={dag.label}
                                        label={dag.description}
                                        priceLabel={dag.price}
                                        name="bezorgDag"
                                        value={dag.value}
                                        checked={selectedBezorgDag === dag.value}
                                        onChange={() => setSelectedBezorgDag(dag.value)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-s">
                        <Input
                            label="Gewenste startdatum"
                            value={startdatum}
                            setValue={setStartdatum}
                            datePicker
                            minDate={new Date()}
                        />
                        <div>
                            <Button
                                variant="primary"
                                label="Abonnement wijzigen"
                                onClick={() => setSubmitted(true)}
                                disabled={!startdatum || (selectedSubscription === 'digitaal-papier' && !selectedBezorgDag)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <AccordionItem
            variant="large"
            label="Abonnement wijzigen"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            content={content}
        />
    );
};

export default AbonnementWijzigen;
