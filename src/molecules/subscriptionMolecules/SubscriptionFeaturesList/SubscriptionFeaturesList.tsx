import React, { useState } from 'react';
import Icon from '../../../atoms/basicAtoms/Icon/Icon';
import FeatureModal from '../FeatureModal/FeatureModal';
import { SubscriptionFeature } from '../SubscriptionCard/subscriptionCard';

export interface SubscriptionFeaturesListProps {
    features: SubscriptionFeature[];
}

const SubscriptionFeaturesList: React.FC<SubscriptionFeaturesListProps> = ({ features }) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

    if (features.length === 0) return null;

    return (
        <>
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
            {openModalIndex !== null && features[openModalIndex]?.modalBody && (
                <FeatureModal
                    isOpen
                    heading={features[openModalIndex].label}
                    body={features[openModalIndex].modalBody!}
                    mediaUrl={features[openModalIndex].modalMediaUrl}
                    mediaType={features[openModalIndex].modalMediaType}
                    metaText={features[openModalIndex].modalMetaText}
                    onClose={() => setOpenModalIndex(null)}
                />
            )}
        </>
    );
};

export default SubscriptionFeaturesList;
