import React from 'react';

export type PageHeadingProps = {
    title: string;
    showBody?: boolean;
    bodyText?: string;
};

export const PageHeading: React.FC<PageHeadingProps> = ({
                                                            title,
                                                            showBody = false,
                                                            bodyText,
                                                        }) => {
    return (
        <div>
            <h1 className="text-heading-page text-text-default">{title}</h1>
            {showBody && bodyText && (
                <div
                    className="text-body-light text-text-default mt-s"
                    dangerouslySetInnerHTML={{ __html: bodyText }}
                />
            )}
        </div>
    );
};

export default PageHeading;
