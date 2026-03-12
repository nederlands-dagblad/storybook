import React from 'react';
import Icon from '@atoms/basicAtoms/Icon/Icon';

export interface TagProps {
    label: string;
    onRemove?: () => void;
    className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, onRemove, className = '' }) => {
    return (
        <div
            className={`inline-flex items-center gap-xxs bg-background-brand-subtle border-border-brand border-default text-meta-regular text-text-default p-xxs has-[button:hover]:bg-background-gray-subtle has-[button:hover]:border-border-gray ${className}`}
        >
            <span>{label}</span>
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="flex items-center"
                    aria-label={`Remove ${label}`}
                >
                    <Icon name="x-mark" size="s" color="default" />
                </button>
            )}
        </div>
    );
};

export default Tag;
