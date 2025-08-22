import { ReactNode, useState, useMemo } from 'react';
import { Icon } from "@atoms/basicAtoms/Icon/Icon";
import { Alert, AlertVariant } from "@molecules/feedbackMolecules/Alert/Alert";
import DataFrameItem, { DataFrameItemProps } from "./dataFrameItem";

export interface DataFrameInputField {
    name: string
    label: string
    value?: string
    type?: string
    disabled?: boolean
    readonly?: boolean
    placeholder?: string
    width?: 'full' | 'half' | 'third'
}

export interface DataFrameProps {
    title: string
    items?: DataFrameItemProps[]
    children?: ReactNode
    editable?: boolean
    onEdit?: () => void
    onSave?: (data: Record<string, any>) => void
    onCancel?: () => void
    editFields?: DataFrameInputField[]
    collapsible?: boolean
    isOpen?: boolean
    onToggle?: () => void
    alert?: {
        type: AlertVariant
        message: string
    }
    actions?: Array<{
        label: string
        onClick: () => void
        icon?: string
    }>
    isLoading?: boolean
}

export function DataFrame(props: DataFrameProps) {
    const {
        title,
        items,
        children,
        editable = false,
        onEdit,
        onSave,
        onCancel,
        editFields,
        collapsible = false,
        isOpen = true,
        onToggle,
        alert,
        actions,
        isLoading = false
    } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});

    // Auto-generate editFields from items if not provided
    const effectiveEditFields = useMemo(() => {
        if (editFields) {
            return editFields;
        }

        if (items && editable) {
            // Auto-generate fields from items
            // Try to be smart about field widths based on label patterns
            return items.map((item) => {
                const label = item.label.toLowerCase();
                let width: 'full' | 'half' | 'third' = 'full';

                // Common patterns for half-width fields
                if (label.includes('voornaam') || label.includes('achternaam') ||
                    label.includes('telefoon') || label.includes('mobiel') ||
                    label.includes('postcode') || label.includes('plaats')) {
                    width = 'half';
                }

                // Common patterns for third-width fields
                if (label.includes('huisnummer') || label.includes('toevoeging')) {
                    width = 'third';
                }

                // Email and addresses are typically full width
                if (label.includes('email') || label.includes('adres')) {
                    width = 'full';
                }

                // Determine input type based on label
                let type = 'text';
                if (label.includes('email')) {
                    type = 'email';
                } else if (label.includes('telefoon') || label.includes('mobiel')) {
                    type = 'tel';
                }

                return {
                    name: `field_${item.label.replace(/\s+/g, '_').toLowerCase()}`,
                    label: item.label,
                    value: typeof item.value === 'string' ? item.value : (item.value ? String(item.value) : ''),
                    width,
                    type
                };
            });
        }

        return [];
    }, [editFields, items, editable]);

    const handleHeaderClick = () => {
        if (collapsible && onToggle && !isEditing) {
            onToggle();
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit();
        }

        // Initialize form data from effective edit fields
        if (effectiveEditFields.length > 0) {
            const initialData: Record<string, any> = {};
            effectiveEditFields.forEach(field => {
                initialData[field.name] = field.value || '';
            });
            setFormData(initialData);
        }
        setIsEditing(true);
    };

    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setIsEditing(false);
        setFormData({});
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Group edit fields by row (based on width)
    const groupEditFields = (fields: DataFrameInputField[]) => {
        const rows: DataFrameInputField[][] = [];
        let currentRow: DataFrameInputField[] = [];
        let currentWidth = 0;

        fields.forEach(field => {
            const fieldWidth = field.width === 'third' ? 1/3 : field.width === 'half' ? 1/2 : 1;

            if (currentWidth + fieldWidth > 1.01) { // Small buffer for floating point
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                }
                currentRow = [field];
                currentWidth = fieldWidth;
            } else {
                currentRow.push(field);
                currentWidth += fieldWidth;
            }
        });

        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        return rows;
    };

    return (
        <div className={`dataframe ${collapsible ? 'dataframe--collapsible' : ''}`}>
            <div
                className="dataframe__header"
                onClick={handleHeaderClick}
            >
                <h2 className="dataframe__title">
                    {title}
                </h2>
                <div className="dataframe__header-actions">
                    {!isEditing && editable && (
                        <button
                            type="button"
                            className="dataframe__edit-button border-button-border-pill text-button-text-pill"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit();
                            }}
                        >
                            <Icon name="pencil-simple-outline" />
                            <span>Wijzigen</span>
                        </button>
                    )}
                    {isEditing && (
                        <div className="dataframe__edit-actions">
                            <button
                                type="button"
                                className="dataframe__cancel-button text-link-text-default"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancel();
                                }}
                            >
                                Annuleren
                            </button>
                            <button
                                type="button"
                                className="dataframe__save-button text-button-text-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave();
                                }}
                                disabled={isLoading}
                            >
                                <Icon name="square-fill" />
                                <span>Bevestigen</span>
                            </button>
                        </div>
                    )}
                    {collapsible && !isEditing && (
                        <button
                            type="button"
                            className="dataframe__toggle-button"
                            aria-expanded={isOpen}
                            aria-label={isOpen ? 'Inklappen' : 'Uitklappen'}
                        >
                            <Icon name={isOpen ? 'minus-outline' : 'plus-outline'} />
                        </button>
                    )}
                </div>
            </div>

            {alert && (
                <Alert
                    variant={alert.type}
                    className="mb-s"
                >
                    {alert.message}
                </Alert>
            )}

            {(!collapsible || isOpen) && (
                <>
                    {!isEditing ? (
                        <div className="dataframe__content">
                            {items && items.map((item, index) => (
                                <DataFrameItem
                                    key={item.label || index}
                                    {...item}
                                />
                            ))}
                            {children}
                        </div>
                    ) : (
                        <div className="dataframe__edit-content">
                            {effectiveEditFields.length > 0 ? (
                                groupEditFields(effectiveEditFields).map((row, rowIndex) => (
                                    <div key={rowIndex} className="dataframe__input-row">
                                        {row.map(field => (
                                            <div
                                                key={field.name}
                                                className="dataframe__input-container"
                                                style={{ flex: field.width === 'third' ? '0 0 33.333%' : field.width === 'half' ? '0 0 50%' : '1' }}
                                            >
                                                <label className="dataframe__input-label">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type || 'text'}
                                                    className="dataframe__input border-form-border-input-field"
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    disabled={field.disabled || isLoading}
                                                    readOnly={field.readonly}
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="dataframe__content">
                                    <p>No fields available for editing</p>
                                </div>
                            )}
                        </div>
                    )}

                    {actions && actions.length > 0 && !isEditing && (
                        <div className="dataframe__actions">
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="dataframe__action-button border-button-border-pill text-button-text-pill"
                                    onClick={action.onClick}
                                >
                                    {action.icon && <Icon name={action.icon} />}
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DataFrame;