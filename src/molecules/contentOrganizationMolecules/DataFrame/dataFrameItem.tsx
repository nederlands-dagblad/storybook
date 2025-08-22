import { ReactNode } from 'react';

export interface DataFrameItemProps {
    label: string
    value?: string | ReactNode
    skeleton?: string[]
    isLoading?: boolean
    multiline?: boolean
}

export function DataFrameItem(props: DataFrameItemProps) {
    const { label, value, skeleton, isLoading = false, multiline = false } = props;

    const formatValue = (val: string | ReactNode | undefined) => {
        if (!val) return '-';
        if (multiline && typeof val === 'string') {
            // Split on newline for multiline display
            return val.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
            ));
        }
        return val;
    };

    return (
        <div className="dataframe-item">
            <div className="dataframe-item__label">
                {label}
            </div>
            <div className={`dataframe-item__value ${multiline ? 'dataframe-item__value--multiline' : ''}`}>
                {isLoading && skeleton ? (
                    <div className="dataframe-item__skeleton-container">
                        {skeleton.map((skeletonClass, index) => (
                            <span
                                key={index}
                                className={`dataframe-item__skeleton ${skeletonClass}`}
                            />
                        ))}
                    </div>
                ) : (
                    formatValue(value)
                )}
            </div>
        </div>
    )
}

export default DataFrameItem;