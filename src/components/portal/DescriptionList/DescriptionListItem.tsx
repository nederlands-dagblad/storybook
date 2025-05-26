import React  from 'react';
import Skeleton, {SkeletonSize} from '@atoms/Skeleton/Skeleton';

interface DescriptionListItemProps {
  term?: React.ReactNode;
  children?: React.ReactNode;
  skeleton?: SkeletonSize;
  isLoading?: boolean
  className?: string;
}

/**
 * DescriptionListItem component for displaying a term-description pair
 */
const DescriptionListItem: React.FC<DescriptionListItemProps> = ({
  term,
  children,
  skeleton,
  isLoading = false,
  className = '',
}) => {

  // useEffect(() => {
  //   console.log("DescriptionListItem mounted", { term, children, skeleton, isLoading, className });
  // });

  return (
    <div className={`description-list-item ${className}`}>
      {term && <dt className="description-list-term">{term}</dt>}
      <dd className="description-list-description">
        {isLoading ? (
          skeleton ? (<Skeleton size={skeleton} />) : ''
        ) : (
          children
        )}
      </dd>
    </div>
  );
};

export default DescriptionListItem;
