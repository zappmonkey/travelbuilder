import Select, {Option} from "@/components/form/element/select";
import {SimpleInput} from "@/lib/wizard/input";
import {getMonthName, stringToDate} from "@/lib/utils/methods";
import {DateDurations} from "@/interface/wizard/date_durations";
import WizardHandler from "@/lib/wizard/handler";

type Props = {
    input: SimpleInput,
    date_durations: DateDurations[],
    className?: string,
    wizardHandler: WizardHandler
}

export default function Months(props: Props) {

    const getMonths = function (date_durations: DateDurations[]): Option[]
    {
        const options: Option[] = [];
        let date: Date;
        let month: string;
        let months: string[] = [];
        for (const date_duration of date_durations) {
            date = stringToDate(date_duration.date);
            month = date.getFullYear() + "-" + date.getMonth().toString();
            if (!months.includes(month)) {
                options.push({
                    value: date.getFullYear() + "-" + ("0" + (date.getMonth() + 1).toString()).slice(-2) + "-15",
                    label: getMonthName(date) + " " + date.getFullYear().toString(),
                })
                months.push(month);
            }
        }
        return options;
    }
    const months = getMonths(props.date_durations);
    const displayDate = stringToDate(props.input.display_date.toString())
    const value  = displayDate.getFullYear() + "-" + ("0" + (displayDate.getMonth() + 1).toString()).slice(-2) + "-15";
    return (
        <Select key={value} name="month" options={months} value={value} label={'Maand'} className={(props.className ? props.className : "")} onChange={(value: string) => props.wizardHandler.onDisplayDateAction(stringToDate(value))} />
    )
}