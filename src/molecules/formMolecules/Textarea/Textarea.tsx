import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    setValue: (value: string) => void;
    label?: string;
    help?: string;
    errors?: string[] | null;
}

export const Textarea: React.FC<TextareaProps> = ({
    value,
    setValue,
    label,
    help,
    errors,
    rows = 5,
    ...rest
}) => {
    return (
        <div className="flex flex-col gap-xxs text-body-regular text-text-default">
            {label && <label className="text-body-light">{label}</label>}
            <textarea
                value={value}
                onChange={e => setValue(e.target.value)}
                rows={rows}
                className={`w-full px-3 py-2 border bg-background-default focus:outline-none focus:border-border-brand resize-none ${errors?.length ? 'border-border-warning' : 'border-border-gray'}`}
                {...rest}
            />
            {(help || errors?.length) && (
                <div className="flex flex-col">
                    {help && <span className="text-text-gray text-meta-regular">{help}</span>}
                    {errors?.map((error, i) => (
                        <span key={i} className="text-text-warning text-meta-regular">{error}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Textarea;
