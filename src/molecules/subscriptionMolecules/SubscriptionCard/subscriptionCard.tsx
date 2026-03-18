import React, { useState } from 'react';
import CardContainer from '@atoms/displayAtoms/CardContainer/CardContainer';
import { Button } from '@atoms/actionAtoms/Button/Button';
import Icon from '@atoms/basicAtoms/Icon/Icon';
import Badge from '@atoms/displayAtoms/Badge/Badge';
import FeatureModal from '../FeatureModal/FeatureModal';

export interface SubscriptionFeature {
    label: string;
    included: boolean;
    modalBody?: string;
    modalMediaUrl?: string;
    modalMediaType?: 'image' | 'video';
    modalMetaText?: string;
}

export interface SubscriptionCardProps {
    title: string;
    pricePerWeek: number;
    originalPricePerWeek?: number;

    features: SubscriptionFeature[];
    isFeatured?: boolean;
    ctaLabel?: string;
    ctaHref: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
    title,
    pricePerWeek,
    originalPricePerWeek,
    features,
    isFeatured = false,
    ctaLabel = 'Kies abonnement',
    ctaHref,
}) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

    const formatPrice = (price: number) =>
        `€${price.toFixed(2).replace('.', ',')}`;

    const discountPercentage = originalPricePerWeek
        ? Math.round((1 - pricePerWeek / originalPricePerWeek) * 100)
        : undefined;

    return (
        <div className={`flex flex-col ${isFeatured ? 'shadow-m' : ''}`}>
            {/* Featured badge */}
            <div className="flex items-center justify-center">
                {isFeatured && (
                    <span className="text-body-uppercase-bold-small text-text-brand bg-background-brand-subtle w-full text-center p-xxs">
                        Meest gekozen
                    </span>
                )}
            </div>

            <CardContainer
                borderColor="gray-subtle"
                padding="m"
                className={`flex flex-col gap-m ${isFeatured ? '!border-t-0' : ''}`}
            >
                {/* Title + Pricing + discount + CTA */}
                <div className="flex flex-col gap-s">
                <h3 className="text-heading-page text-text-default text-center">
                    {title}
                </h3>

                {/* Pricing + discount + CTA */}
                <div className="flex flex-col items-center gap-l">
                    <div className="flex flex-col items-center gap-xs">
                        <div className="flex items-center gap-xs">
                            {originalPricePerWeek && (
                                <span className="text-meta-light text-text-default !line-through">
                                    {formatPrice(originalPricePerWeek)}
                                </span>
                            )}
                            <span className="text-meta-bold text-text-default">
                                {formatPrice(pricePerWeek)} per week
                            </span>
                        </div>

                        {discountPercentage && (
                            <Badge variant="default" label={`${discountPercentage}% korting`} />
                        )}
                    </div>

                    <Button
                        variant="primary"
                        label={ctaLabel}
                        href={ctaHref}
                        style={{ paddingLeft: 'var(--spacing-m)', paddingRight: 'var(--spacing-m)' }}
                    />
                </div>
                </div>

                {/* Feature list */}
                <ul className="flex flex-col gap-xs">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start justify-between gap-xs">
                            <div className="flex items-start gap-xs">
                                <span className="flex-shrink-0">
                                    <Icon
                                        name={feature.included ? 'check' : 'x-mark'}
                                        variant="outline"
                                        size="s"
                                        color={feature.included ? 'brand' : 'gray'}
                                    />
                                </span>
                                <button
                                    type="button"
                                    className={`text-meta-light text-left ${feature.included ? 'text-text-default' : 'text-text-disabled !line-through'} ${feature.modalBody ? 'cursor-pointer' : 'cursor-default'}`}
                                    onClick={() => feature.modalBody && setOpenModalIndex(index)}
                                >
                                    {feature.label}
                                </button>
                            </div>
                            {feature.modalBody && (
                                <button
                                    type="button"
                                    className="flex-shrink-0 transition-colors"
                                    onClick={() => setOpenModalIndex(index)}
                                >
                                    <Icon name="info" variant="outline" size="s" color="default" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </CardContainer>

            {features.map((feature, index) =>
                feature.modalBody ? (
                    <FeatureModal
                        key={index}
                        isOpen={openModalIndex === index}
                        onClose={() => setOpenModalIndex(null)}
                        heading={feature.label}
                        body={feature.modalBody}
                        mediaUrl={feature.modalMediaUrl}
                        mediaType={feature.modalMediaType}
                        metaText={feature.modalMetaText}
                    />
                ) : null
            )}
        </div>
    );
};

export default SubscriptionCard;
