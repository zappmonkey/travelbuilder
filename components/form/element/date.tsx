import {classNames, getIsoDate, getMonthName, getTodayIsoDate, stringToDate} from "@/lib/utils/methods";
import {CalendarDaysIcon, ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

type Props = {
    name: string
    label?: string
    placeholder?: string
    type: string
    value?: string
    required?: boolean
    className?: string
    autoComplete?: string
    ref?: any
}

type Day = {
    date: string;
    isToday?: boolean;
    isSelected?: boolean;
    isCurrentMonth?: boolean;
}

const getMonth = function getMonth(currentDate: Date, selectedDate: Date): any {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const today = new Date();
    const dates = [];
    for (let d = 1; d <= monthEnd.getDate(); d++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
        dates.push({
            date: getIsoDate(date),
            isCurrentMonth: true,
            isToday: date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate(),
            isSelected: date.getFullYear() === selectedDate.getFullYear() && date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate(),
        });
    }

    let start = monthStart.getDay()
    if (start == 0) {
        start = 6;
    } else {
        start = start - 1;
    }
    for (let d = 0; d < start; d++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), -1 * d);
        dates.unshift({date: getIsoDate(date)});
    }

    const end = monthEnd.getDay()
    let offset = 8 - end;
    if (dates.length + offset < 42) {
        offset = offset + 7;
    }
    for (let d = 1; d < offset; d++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, d);
        dates.push({date: getIsoDate(date)});
    }

    return {
        name: getMonthName(monthStart) + " " + monthStart.getFullYear(),
        prev: prevMonth,
        next: nextMonth,
        startDay: monthStart.getDay(),
        endDay: monthEnd.getDay(),
        days: dates,
    };
}

export default function DateInput(props: Props) {
    const [showCalendar, setShowCalendar] = useState(false);
    const date = new Date(props.value ? props.value : getTodayIsoDate());
    const [selectDate, setSelectedDate] = useState<Date>(date);
    const [currentDate, setCurrentDate] = useState<Date>(date);
    const month = getMonth(currentDate, selectDate)
    return (
        <div className={props.className ? props.className : ''}>
            {props.label ? <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-600">
                {props.label} {props.required ?
                <span className={"text-red-700"}>*</span> : null}
            </label> : null}
            <div className={classNames(props.label ? "mt-2" : '',
                "flex items-center w-full rounded-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-amber-800 bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 ")}
            >
                <CalendarDaysIcon width={20} height={24} className="flex-none ml-2 text-gray-400" onClick={() => setShowCalendar(!showCalendar)} />
                <input
                    id={props.name}
                    name={props.name}
                    type="text"
                    placeholder={props.placeholder ? props.placeholder : props.label}
                    required={props.required}
                    autoComplete={props.autoComplete}
                    ref={props.ref}
                    value={getIsoDate(selectDate)}
                    onFocus={() => setShowCalendar(true)}
                    readOnly={true}
                    className={'pr-2 pl-1 py-1.5 placeholder:text-gray-400 sm:text-sm/6 outline-none'}
                />
            </div>
            {showCalendar ? <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-10" onClick={() => {setShowCalendar(false)}}></div>
                    <div className="relative z-20">
                        {/*<Print context={month}/>*/}
                        <div className="absolute bg-white min-w-[320px] w-full z-20 mt-3 p-2 rounded-lg ring-1 ring-gray-200 shadow-sm">
                            <section key={month.name} className="text-center">
                                <h2 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                                    <button className="p-2 cursor-pointer" onClick={() => setCurrentDate(month.prev)}>
                                        <ChevronLeftIcon className="size-4" />
                                    </button>
                                    <div>{month.name}</div>
                                    <button className="p-2 cursor-pointer" onClick={() => setCurrentDate(month.next)}>
                                        <ChevronRightIcon className="size-4" />
                                    </button>
                                </h2>
                                <div className="mt-2 grid grid-cols-7 text-xs/6 text-gray-500">
                                    <div>M</div>
                                    <div>T</div>
                                    <div>W</div>
                                    <div>T</div>
                                    <div>F</div>
                                    <div>S</div>
                                    <div>S</div>
                                </div>
                                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-md bg-gray-200 text-sm ring-1 ring-gray-200">
                                    {month.days.map((day: Day, dayIdx: number) => (
                                        <button
                                            key={day.date}
                                            type="button"
                                            onClick={() => {setSelectedDate(stringToDate(day.date))}}
                                            className={classNames(
                                                day.isToday && !day.isSelected ? 'bg-white font-semibold text-amber-800'
                                                : (day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'),
                                                dayIdx === 0 ? 'rounded-tl-md' : '',
                                                dayIdx === 6 ? 'rounded-tr-md' : '',
                                                dayIdx === month.days.length - 7 ? 'rounded-bl-md' : '',
                                                dayIdx === month.days.length - 1 ? 'rounded-br-md' : '',
                                                'py-1.5 hover:bg-gray-100 focus:z-10',
                                            )}
                                        >
                                            <time
                                                dateTime={day.date}
                                                className={classNames(
                                                    day.isSelected ? 'bg-amber-800 font-semibold text-white' : '',
                                                    'mx-auto flex size-7 items-center justify-center rounded-full',
                                                )}
                                            >
                                                {day.date.split('-').pop()?.replace(/^0/, '')}
                                            </time>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            : null}
        </div>
    )
}
