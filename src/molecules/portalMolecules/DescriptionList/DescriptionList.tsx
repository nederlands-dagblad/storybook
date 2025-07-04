import React from 'react';

export interface DescriptionListProps {
    className?: string,
    title?: React.ReactNode,
    actions?: React.ReactNode,
    footer?: React.ReactNode,
    isLoading?: boolean,
    children?: React.ReactNode
}

export const DescriptionList: React.FC<DescriptionListProps> = (props) => {

    const {
        className,
        title,
        actions,
        footer,
        isLoading = false,
        children
    } = props;

    // If not loading and no children, return null
    if (!isLoading && !children) {
        return null;
    }

    return (
        <div className={`description-list-container ${className || ''}`}>
            {(title || actions) && (
                <div className="description-list-header">
                    {title &&
                        <div className="description-list-title">
                            {title}
                        </div>
                    }
                    {actions &&
                        <div className="description-list-actions">
                            {actions}
                        </div>
                    }
                </div>
            )}

            <dl className="description-list">
                {children}
            </dl>

            {footer && (
                <div className="description-list-footer">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default DescriptionList;
