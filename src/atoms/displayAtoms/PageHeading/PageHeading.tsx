import React from 'react';

export type PageHeadingProps = {
    title: string;
    showBody?: boolean;
    bodyText?: string;
    bodyClassName?: string;
};

export const PageHeading: React.FC<PageHeadingProps> = ({
                                                            title,
                                                            showBody = false,
                                                            bodyText,
                                                            bodyClassName = '',
                                                        }) => {
    return (
        <div>
            <h1 className="text-heading-xl text-text-default">{title}</h1>
            {showBody && bodyText && (
                <div
                    className={`text-body-light text-text-default mt-s ${bodyClassName}`}
                    dangerouslySetInnerHTML={{ __html: bodyText }}
                />
            )}
        </div>
    );
};

export default PageHeading;
