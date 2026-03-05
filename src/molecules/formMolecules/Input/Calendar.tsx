import React, { useState } from 'react';
import Icon from "@atoms/basicAtoms/Icon/Icon.tsx";

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];

export interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect, minDate, maxDate }) => {
  const today = new Date();
  const [view, setView] = useState<Date>(selected ?? today);

  const year = view.getFullYear();
  const month = view.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setView(new Date(year, month - 1, 1));
  const nextMonth = () => setView(new Date(year, month + 1, 1));

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    if (minDate && d < new Date(minDate.setHours(0,0,0,0))) return true;
    if (maxDate && d > new Date(maxDate.setHours(23,59,59,999))) return true;
    return false;
  };

  const isSelected = (day: number) =>
      selected?.getFullYear() === year &&
      selected?.getMonth() === month &&
      selected?.getDate() === day;

  const isToday = (day: number) =>
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day;

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
      <>
        <style>{`
          @keyframes nd-calendar-enter {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div
            className="absolute top-full left-0 mt-xxs p-s bg-background-default border border-border-gray-subtle shadow-m z-10 w-[280px]"
            style={{ animation: 'nd-calendar-enter 150ms ease-out' }}
        >
          <div className="flex items-center justify-between pb-xs mb-xs border-b border-border-gray-subtle">
            <button type="button" onClick={prevMonth} className="flex items-center justify-center border-none bg-transparent cursor-pointer t w-8 h-8 transition-colors duration-150 hover:bg-background-gray-subtle">
              <Icon name={"caret-left"} size="m" color="brand" variant="outline"/>
            </button>
            <span className="text-meta-bold text-text-default">{MONTHS[month]} {year}</span>
            <button type="button" onClick={nextMonth} className="flex items-center justify-center border-none bg-transparent cursor-pointer w-8 h-8 transition-colors duration-150 hover:bg-background-gray-subtle">
              <Icon name={"caret-right"} size="m" color="brand" variant="outline"/>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-xxs">
            {DAYS.map(d => <div key={d} className="text-center text-meta-light text-text-gray py-xxs">{d}</div>)}
            {cells.map((day, i) =>
                day === null ? (
                    <div key={`empty-${i}`} />
                ) : (
                    <button
                        key={day}
                        type="button"
                        disabled={isDisabled(day)}
                        className={[
                          'flex items-center justify-center border-none cursor-pointer',
                          'text-meta w-9 h-9 transition-colors duration-150',
                          'disabled:text-text-gray disabled:cursor-not-allowed disabled:bg-transparent',
                          isSelected(day)
                              ? 'bg-background-brand text-text-inverse hover:bg-background-gray hover:text-text-default'
                              : isToday(day)
                                  ? 'bg-background-brand-subtle text-text-brand'
                                  : 'text-text-default hover:bg-background-gray',
                        ].join(' ')}
                        onClick={() => !isDisabled(day) && onSelect(new Date(year, month, day))}
                    >
                      {day}
                    </button>
                )
            )}
          </div>
        </div>
      </>
  );
};

export default Calendar;
