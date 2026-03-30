import React from 'react';

export interface TableProps {
    headers?: React.ReactNode[];
    rows: React.ReactNode[][];
    className?: string;
}

const Table: React.FC<TableProps> = ({ headers, rows, className = '' }) => {
    return (
        <table className={`w-full border-collapse ${className}`}>
            {headers && headers.length > 0 && (
                <thead>
                    <tr className="border-b-m border-border-brand">
                        {headers.map((header, i) => (
                            <th
                                key={i}
                                className="py-s px-xs text-heading-s text-text-default text-left"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b-default border-border-gray-subtle">
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                className="py-s px-xs text-body-light text-text-default text-left"
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
