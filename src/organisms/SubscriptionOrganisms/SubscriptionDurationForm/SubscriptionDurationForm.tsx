import React, { useState } from 'react';
import RadioButton from '../../../molecules/formMolecules/RadioButton/RadioButton';
import Alert from '../../../molecules/feedbackMolecules/Alert/Alert';
import Input from '../../../molecules/formMolecules/Input/Input';
import Button from '../../../atoms/actionAtoms/Button/Button';
import { SubscriptionFeature } from '../../../molecules/subscriptionMolecules/SubscriptionCard/subscriptionCard';
import SubscriptionFeaturesAccordion from '../SubscriptionFeaturesAccordion/SubscriptionFeaturesAccordion';

export interface DeliveryDay {
    label: string;
    value: string;
    description?: string;
    price?: string;
}

export interface SubscriptionDuration {
    label: string;
    value: string;
    /** Shown in the summary panel as actieperiode, e.g. '24 maanden' */
    period?: string;
}

export interface OrderSummaryRow {
    label: string;
    value: string;
    /** When set, shows this value with strikethrough above the main value */
    originalValue?: string;
    /** Adds a divider above this row */
    isDivider?: boolean;
}

export interface SubscriptionDurationFormProps {
    // Subscription info (mobile: shown in form card)
    sectionHeading?: string;
    subscriptionTitle: string;
    subscriptionSubtitle?: string;
    subscriptionPricePerWeek: number;
    subscriptionOriginalPricePerWeek?: number;
    features?: SubscriptionFeature[];
    onChangeSubscription?: () => void;
    changeSubscriptionLabel?: string;

    // Delivery day (paper subscriptions)
    deliveryDayHeading?: string;
    deliveryDays?: DeliveryDay[];
    selectedDeliveryDay?: string;
    onDeliveryDayChange?: (value: string) => void;

    // Duration
    durationHeading?: string;
    durations?: SubscriptionDuration[];
    selectedDuration?: string;
    onDurationChange?: (value: string) => void;
    alertText?: string;

    // Start date
    startDateLabel?: string;
    startDate?: string;
    onStartDateChange?: (value: string) => void;
    minStartDate?: Date;
    maxStartDate?: Date;

    // Submit
    submitLabel?: string;
    onSubmit?: () => void;
}

const formatPrice = (price: number) =>
    `€${price.toFixed(2).replace('.', ',')}`;

const SubscriptionDurationForm: React.FC<SubscriptionDurationFormProps> = ({
    sectionHeading = 'Actieabonnement',
    subscriptionTitle,
    subscriptionPricePerWeek,
    subscriptionOriginalPricePerWeek,
    features = [],
    onChangeSubscription,
    changeSubscriptionLabel = 'Kies een ander abonnement',
    deliveryDayHeading = 'Op welke dag wil je de papieren krant ontvangen?',
    deliveryDays = [],
    selectedDeliveryDay,
    onDeliveryDayChange,
    durationHeading = 'Kies je looptijd',
    durations = [],
    selectedDuration,
    onDurationChange,
    alertText,
    startDateLabel = 'Gewenste startdatum',
    startDate = '',
    onStartDateChange,
    minStartDate = new Date(),
    maxStartDate,
    submitLabel = 'Vul je gegevens in',
    onSubmit,
}) => {
    const [dateValue, setDateValue] = useState<string>(startDate);
    const [activeDuration, setActiveDuration] = useState<string | undefined>(selectedDuration);
    const [activeDeliveryDay, setActiveDeliveryDay] = useState<string | undefined>(selectedDeliveryDay);

    const handleDateChange = (value: string) => {
        setDateValue(value);
        onStartDateChange?.(value);
    };

    const handleDurationChange = (value: string) => {
        setActiveDuration(value);
        onDurationChange?.(value);
    };

    const handleDeliveryDayChange = (value: string) => {
        setActiveDeliveryDay(value);
        onDeliveryDayChange?.(value);
    };

    const mobileSubLabel = deliveryDays.length === 0 ? (
        <span className="flex gap-xs">
            {subscriptionOriginalPricePerWeek && (
                <span className="line-through text-text-subtle">{formatPrice(subscriptionOriginalPricePerWeek)}</span>
            )}
            <span>{formatPrice(subscriptionPricePerWeek)} per week</span>
        </span>
    ) : undefined;

    return (
        <div className="bg-background-default shadow-m p-m lg:p-l flex flex-col gap-l">

            {/* Mobile-only: subscription section */}
            <div className="lg:hidden flex flex-col gap-s">
                <h2 className="text-heading-2 text-text-default">{sectionHeading}</h2>
                <SubscriptionFeaturesAccordion
                    label={subscriptionTitle}
                    subLabel={mobileSubLabel}
                    features={features}
                    onChangeSubscription={onChangeSubscription}
                    changeSubscriptionLabel={changeSubscriptionLabel}
                />
            </div>

            {/* Delivery day section (paper subscriptions) */}
            {deliveryDays.length > 0 && (
                <div className="flex flex-col gap-s">
                    <h2 className="text-heading-2 text-text-default">{deliveryDayHeading}</h2>
                    <div className="flex flex-col gap-xs">
                        {deliveryDays.map((day) => (
                            <RadioButton
                                key={day.value}
                                variant="card"
                                layout="horizontal"
                                heading={day.label}
                                label={day.description}
                                priceLabel={day.price}
                                name="deliveryDay"
                                value={day.value}
                                checked={activeDeliveryDay === day.value}
                                onChange={() => handleDeliveryDayChange(day.value)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Duration section */}
            {durations.length > 0 && (
                <div className="flex flex-col gap-s">
                    <h2 className="text-heading-2 text-text-default">{durationHeading}</h2>
                    <div className="flex flex-col gap-xs">
                        {durations.map((duration) => (
                            <RadioButton
                                key={duration.value}
                                variant="card"
                                layout="horizontal"
                                heading={duration.label}
                                name="duration"
                                value={duration.value}
                                checked={activeDuration === duration.value}
                                onChange={() => handleDurationChange(duration.value)}
                            />
                        ))}
                    </div>
                    {alertText && (
                        <Alert variant="info-dark">{alertText}</Alert>
                    )}
                </div>
            )}

            {/* Start date */}
            <Input
                label={startDateLabel}
                value={dateValue}
                setValue={handleDateChange}
                datePicker
                minDate={minStartDate}
                maxDate={maxStartDate}
            />

            {/* Submit */}
            <Button
                variant="secondary"
                label={submitLabel}
                iconRight="caret-right"
                iconRightVariant="outline"
                onClick={onSubmit}
                className="justify-center"
            />
        </div>
    );
};

export default SubscriptionDurationForm;
