'use client'

import {classNames, getIsoDate, getMonthName, getTodayIsoDate, stringToDate} from "@/lib/utils/methods";
import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {PriceModel} from "@/interface/wizard/price/price";

type Props = {
    label?: string
    placeholder?: string
    value?: string
    display_date?: string
    required?: boolean
    className?: string
    autoComplete?: string
    ref?: any
    prices: PriceModel[]
    input: any;
    onDisplayDateAction: (date: Date) => void;
    onDateAction: (date: Date) => void;
}
type Day = {
    date: string;
    isToday?: boolean;
    isSelected?: boolean;
    isCurrentMonth?: boolean;
    fullPrice: number|undefined
    basePrice: number|undefined
}

const getMonth = function getMonth(currentDate: Date, selectedDate: Date|undefined, prices: Dict<PriceModel>): any {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15);
    const today = new Date();
    const dates = [];
    let item: Record<string, any>;
    let price: PriceModel;
    let isoDate: string;
    let date: Date;
    for (let d = 1; d <= monthEnd.getDate(); d++) {
        date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
        isoDate = getIsoDate(date)
        item = {
            date: isoDate,
            isCurrentMonth: true,
            isToday: date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate(),
            isSelected: (selectedDate !== undefined && date.getFullYear() === selectedDate.getFullYear() && date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate()),
            fullPrice: undefined,
            basePrice: undefined,
        }
        if (prices.hasOwnProperty(isoDate)) {
            price = prices[isoDate];
            if (price.availability === 'available' || price.availability === 'on_request') {
                item['fullPrice'] = price.price.per_person.full;
                item['basePrice'] = price.price.per_person.base;
            }
        }
        dates.push(item);
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

const pricesToArray = function(prices: PriceModel[]): Dict<PriceModel>
{
    const priceArray = {};
    if (prices) {
        prices.forEach((price) => {
            // @ts-ignore
            priceArray[price.date] = price;
        })
    }
    return priceArray;
}


export default function Calendar(props: Props) {
    const prices = pricesToArray(props.prices);
    const date = (props.value ? new Date(props.value) : undefined);
    const displayDate = stringToDate(props.input.display_date !== undefined ? props.input.display_date : (props.value ? props.value : getTodayIsoDate()));
    const [selectDate, setSelectedDate] = useState<Date|undefined>(date);
    // const [currentDate, setCurrentDate] = useState<Date>(displayDate);
    const month = getMonth(displayDate, selectDate, prices)
    return (
        <div className={props.className ? props.className : ''}>
            <div className="bg-white min-w-[320px] w-full z-20 p-2 rounded-lg ring-1 ring-gray-200 shadow-sm">
                <section key={month.name} className="text-center">
                    <h2 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                        <button className="p-2 cursor-pointer" onClick={() => props.onDisplayDateAction(month.prev)}>
                            <ChevronLeftIcon className="size-4" />
                        </button>
                        <div className="capitalize">{month.name}</div>
                        <button className="p-2 cursor-pointer" onClick={() => props.onDisplayDateAction(month.next)}>
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
                                onClick={() => {const date = stringToDate(day.date); setSelectedDate(date); props.onDateAction(date)}}
                                className={classNames(
                                    day.isToday && !day.isSelected ? 'bg-white font-semibold text-nrv-orange'
                                        : (day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'),
                                    dayIdx === 0 ? 'rounded-tl-md' : '',
                                    dayIdx === 6 ? 'rounded-tr-md' : '',
                                    dayIdx === month.days.length - 7 ? 'rounded-bl-md' : '',
                                    dayIdx === month.days.length - 1 ? 'rounded-br-md' : '',
                                    ' hover:bg-gray-100 focus:z-10',
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        day.isSelected ? 'bg-nrv-orange font-semibold text-white' : '',
                                        'mx-auto flex h-14 items-center justify-center',
                                    )}
                                >
                                    {day.basePrice ? <div>
                                        <div className="py-1">{day.date.split('-').pop()?.replace(/^0/, '')}</div>
                                        <div className="py-1 border-t-1 border-t-gray-600">{Math.round(day.basePrice)}</div>
                                    </div> : day.date.split('-').pop()?.replace(/^0/, '')}
                                </time>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
