import Print from "@/components/ui/dev/print";
import WizardHandler from "@/lib/wizard/handler";
import {SimpleInput} from "@/lib/wizard/input";
import {classNames, dateFormat, dateToHumanReadable, getIsoDate, getTodayIsoDate} from "@/lib/utils/methods";
import Select, {Option} from "@/components/form/element/select";
import Selections from "@/components/wizard/selections/selections";

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

    const elementsWithSelections = function(elements: any[]): any[] {
        const elementsWithSelections = [];
        for (const element of elements) {
            let elementAdded = false;
            if (element.hasOwnProperty('selections') && element.selections.length > 0) {
                for (const selection of element.selections) {
                    if (selection.hasOwnProperty('choices') && selection.choices.length > 1) {
                        if (!elementAdded) {
                            elementsWithSelections.push(element);
                            elementAdded = true;
                        }
                    }
                }
            }
        }
        return elementsWithSelections;
    }

    return (
        <div className={classNames(props.className ? props.className : "", "w-full")}>
            {selectedComponents.map((component: any) => (
                <div key={component.id} className="w-full grid grid-cols-4 mt-4">
                    <h2 className="col-span-4 text-nrv-orange font-medium">{component.name}</h2>
                    {component.groups.map((group: any) => (
                        <div key={group.id} className="col-span-4 grid grid-cols-4">
                            <h3 className="col-span-4 mt-4 text-gray-800">{group.name}</h3>
                            <div className="col-span-4 grid grid-cols-4">
                                {group.dates && group.dates.length > 1 ?
                                    <Select
                                        name="date"
                                        options={getDateOptions(group.dates)}
                                        value={props.input.adults.toString()}
                                        label={'Vanaf wanneer wil je verblijven?'}
                                        className="col-span-1 mt-2"
                                        onChange={(value: string) => props.handler.onChangeAdults(value)}
                                    />
                                : null}
                                {group.min_duration != group.max_duration ?
                                    <Select
                                        name="duration"
                                        options={getDurationOptions(group.min_duration, group.max_duration)}
                                        value={props.input.adults.toString()} label={'Hoe lang wil je verblijven?'}
                                        className="col-span-1 mt-2"
                                        onChange={(value: string) => props.handler.onChangeAdults(value)}
                                    />
                                : null}
                            </div>
                            {elementsWithSelections(group.elements).map((element: any) => (<div key={element.id} className="col-span-4">
                                {element.selections && element.selections.length > 0 ? element.selections.map((selection: any) => (
                                    <div key={element.id + "_" + selection.id} className="w-full mt-4">
                                        <Selections group_id={group.id} input={props.input} selection={selection} />
                                    </div>
                                )) : null}
                            </div>))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}