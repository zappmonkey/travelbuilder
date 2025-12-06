import DateObject from "react-date-object";

let locale = 'nl-NL';

export function classNames(...classes: string[])
{
    return classes.filter(Boolean).join(' ')
}

export function dateFormat(dateString: string, format: string)
{
    const date = new DateObject(dateString);
    return date.format(format);
}

export function dump(object: any)
{
    return JSON.stringify(object, null, 2);
}

export function randomGUID(length: number)
{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function empty(value: any): boolean
{
    if (value === '' || value === null || value === undefined || value === false || value === 'false' || (Array.isArray(value) && value.length === 0)) {
        return true;
    }
    return false;
}

export function getTodayIsoDate(): string
{
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    return yourDate.toISOString().split('T')[0]
}

export function getIsoDate(date: Date): string
{
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
}

export function minutesToDescription(minutes: number): string
{
    const [hours, minutesLeft] = getHoursAndMinutes(minutes);
    return `${hours}h ${minutesLeft}m`;
}

export function getHoursAndMinutes(minutes: number): [number, number]
{
    const hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);
    return [hours, minutes];
}

export function dateToHumanReadable(date: string|Date): string
{
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return date.toLocaleDateString(locale, options);
}

export function dateTimeToHumanReadable(date: string|Date): string
{
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return date.toLocaleDateString(locale, options);
}

export function getLocalCurrency(value: number): string
{
    return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value);
}

export function getMonthName(date: string|Date): string
{
    const options: Intl.DateTimeFormatOptions = {  month: 'long' };

    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return date.toLocaleDateString(locale, options);
}

export function stringToDate(date: string): Date
{
    return new Date(date);
}

export function objToArray(obj: Dict<any>|undefined): any[] {
    let list: any[] = [];
    if (obj == undefined) {
        return list;
    }
    for (const key in obj) {
        list.push(obj[key]);
    }
    return list;
}