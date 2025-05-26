import React, { Children } from 'react';
import DescriptionListItem from './DescriptionListItem';

interface DescriptionListItemsProps {
    children: React.ReactNode,
    isLoading?: boolean
}

/**
 * DescriptionListItems component for grouping DescriptionListItem components
 */
const DescriptionListItems: React.FC<DescriptionListItemsProps> = ({children, isLoading}) => {
    const processedChildren = Children.map(children, child => {
        if (React.isValidElement(child) && child.type === DescriptionListItem) {
            return React.cloneElement(child, { isLoading });
        }
        return child;
    });
    
    return <>{processedChildren}</>;
};

export default DescriptionListItems;
