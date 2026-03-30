import React from 'react';
import { Modal } from '../../feedbackMolecules/Modal/Modal';

export interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    heading: string;
    body: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    metaText?: string;
}

const FeatureModal: React.FC<FeatureModalProps> = ({
    isOpen,
    onClose,
    heading,
    body,
    mediaUrl,
    mediaType = 'image',
    metaText,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} heading={!mediaUrl ? heading : undefined}>
            <div className="flex flex-col gap-m">
                {mediaUrl && (
                    mediaType === 'video' ? (
                        <video
                            src={mediaUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full"
                        />
                    ) : (
                        <img src={mediaUrl} alt="" className="w-full" />
                    )
                )}

                <div className="flex flex-col gap-m">
                    <div className="flex flex-col gap-xs">
                        {mediaUrl && <h2 className="text-heading-m text-text-default">{heading}</h2>}
                        <p className="text-body-light text-text-default">{body}</p>
                    </div>

                    {metaText && (
                        <p className="text-meta-light text-text-default italic">{metaText}</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default FeatureModal;
