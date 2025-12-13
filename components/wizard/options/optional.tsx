import Print from "@/components/ui/dev/print";
import WizardHandler from "@/lib/wizard/handler";
import {SimpleInput} from "@/lib/wizard/input";
import {classNames, dateFormat, dateToHumanReadable, getIsoDate, getTodayIsoDate} from "@/lib/utils/methods";
import Select, {Option} from "@/components/form/element/select";

type Props = {
    handler: WizardHandler,
    input: SimpleInput,
    categories: string[]
    components: any[]
    className?: string
}

export default function Optional(props: Props)
{
    const selectedComponents = [];
    for (const component of props.components) {
        if (props.categories.includes(component.code) || props.categories.includes(component.code.toLowerCase())) {
            selectedComponents.push(component);
        }
    }
    const getDurationOptions = (min: number, max: number): Option[] => {
        const options: Option[] = [];
        for (let d = min; d <= max; d++) {
            options.push({
                value: d.toString(),
                label: d.toString() + (d == 1 ? ' nacht' : ' nachten'),
            })
        }
        return options;
    }

    const getDateOptions = (dates: Date[]): Option[] => {
        const options: Option[] = [];
        for (const date of dates) {
            options.push({
                value: getIsoDate(date),
                label: dateToHumanReadable(date),
            })
        }
        return options;
    }

    return (
        <div className={classNames(props.className ? props.className : "", "w-full")}>
            {selectedComponents.map((component: any) => (
                <div key={component.id} className="block w-full grid grid-cols-4">
                    <h2 className="col-span-4 text-nrv-orange font-medium">{component.name}</h2>
                    {component.groups.map((group: any) => (
                        <div key={group.id} className="w-full">
                            <h3 className="col-span-4 mt-4 text-gray-800">{group.name}</h3>
                            {group.dates && group.dates.length > 1 ?
                                <Select
                                    name="date"
                                    options={getDateOptions(group.dates)}
                                    value={props.input.adults.toString()} label={'Hoe lang wil je verblijven?'}
                                    className={classNames(props.className ? props.className : "", "col-span-4 mt-2")}
                                    onChange={(value: string) => props.handler.onChangeAdults(value)}/>
                            : null}
                            {group.min_duration != group.max_duration ?
                                <Select
                                    name="duration"
                                    options={getDurationOptions(group.min_duration, group.max_duration)}
                                    value={props.input.adults.toString()} label={'Hoe lang wil je verblijven?'}
                                    className={classNames(props.className ? props.className : "", "col-span-4 mt-2")}
                                    onChange={(value: string) => props.handler.onChangeAdults(value)}/>
                            : null}
                            {group.elements.map((element: any) => (<div key={element.id} className="w-full">
                                {element.selections && element.selections.length > 0 ? element.selections.map((selection: any) => (
                                    <div key={element.id + "_" + selection.id} className="w-full">
                                        {selection.choices && selection.choices.length > 1 ? <Print context={null}/> : null}
                                    </div>
                                )) : null}
                            </div>))}
                            {/*<Print context={group}/>*/}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}