import React, { useRef, useState, useEffect } from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";
import { Calendar } from './Calendar';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  setValue: (value: any) => any;
  label?: string;
  help?: string;
  errors?: string[] | null;
  // Date picker options — all optional, won't affect non-date usages
  datePicker?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const formatDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const parseDate = (value: string): Date | null => {
  const parts = value.split('/');
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts.map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  return isNaN(d.getTime()) ? null : d;
};

export const Input: React.FC<InputProps> = (props) => {
  const {
    label, help, errors,
    datePicker,
    minDate, maxDate,
    setValue,
    value,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close calendar on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleDateSelect(date: Date) {
    setValue(formatDate(date));
    setOpen(false);
  }

  const selectedDate = datePicker ? parseDate(value) : null;

  return (
      <div className={`text-body-regular text-text-default ${datePicker ? ' relative' : ''}`} ref={wrapperRef}>
        {label && <label className="text-body-light">{label}</label>}

        <div className={datePicker ? 'relative flex items-center' : undefined}>
          <input
              className={`w-full px-3 py-2 border text-default bg-background-default focus:outline-none focus:border-border-brand disabled:bg-background-gray disabled:text-text-disabled disabled:cursor-not-allowed ${errors?.length ? 'border-border-warning' : 'border-border-gray'} ${datePicker ? ' cursor-pointer pr-10' : ''}`}
              onChange={onChange}
              value={value}
              readOnly={datePicker}
              onClick={datePicker ? () => setOpen(o => !o) : undefined}
              placeholder={datePicker ? 'DD/MM/YYYY' : rest.placeholder}
              {...rest}
          />
          {datePicker && (
              <button
                  type="button"
                  className=" absolute right-0 flex items-center justify-center w-10 h-full border-none bg-transparent cursor-pointer text-icons-brand hover:text-text-brand-hover"
                  onClick={() => setOpen(o => !o)}
                  aria-label="Open date picker"
              >
                <Icon name={"calendar-blank"} size="s" color="default" variant="outline"/>
              </button>
          )}
        </div>

        {datePicker && open && (
            <Calendar
                selected={selectedDate}
                onSelect={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
            />
        )}

        {(help || errors?.length) ? (
            <div className="flex flex-col">
                {help && <span className="text-text-gray text-meta-regular">{help}</span>}
                {errors && errors.map((error, i) => (
                    <span key={i} className="text-text-warning text-meta-regular">{error}</span>
                ))}
            </div>
        ) : null}
      </div>
  );
};

export default Input;