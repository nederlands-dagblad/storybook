import React from 'react';

export type SkeletonSize = 'sm' | 'md' | 'lg' | Array<'sm' | 'md' | 'lg'>;

export interface SkeletonProps {
  className?: string;
  size?: SkeletonSize;
}

export const Skeleton: React.FC<SkeletonProps> = ({
                                             className = '',
                                             size,
                                           }) => {
  // Get width based on size
  const getWidth = (sizeValue: 'sm' | 'md' | 'lg' | undefined) => {
    if (sizeValue === 'sm') return '4rem';
    if (sizeValue === 'md') return '8rem';
    if (sizeValue === 'lg') return '12rem';
    return '100%';
  };

  // Render a single skeleton element
  const renderSkeletonElement = (sizeValue: 'sm' | 'md' | 'lg' | undefined, index?: number) => {
    const skeletonStyle: React.CSSProperties = {
      width: getWidth(sizeValue),
      height: '16px',
      borderRadius: '2px',
      backgroundColor: '#E5E7EB',
      display: 'block',
    };

    return (
      <span
        key={index !== undefined ? index : 0}
        className={`skeleton skeleton-pulse ${index && index > 0 ? 'mt-2' : ''}`}
        style={skeletonStyle}
        aria-hidden="true"
      />
    );
  };

  // Handle array of sizes
  if (Array.isArray(size)) {
    return (
      <div className={`skeleton-group ${className}`}>
        {size.map((sizeItem, index) => renderSkeletonElement(sizeItem, index))}
      </div>
    );
  }

  // Render a single skeleton
  return renderSkeletonElement(size);
};

export default Skeleton;
