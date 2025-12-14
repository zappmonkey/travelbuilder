import Print from "@/components/ui/dev/print";
import WizardHandler from "@/lib/wizard/handler";
import {SimpleInput} from "@/lib/wizard/input";
import {classNames, dateFormat, dateToHumanReadable, empty, getIsoDate, getTodayIsoDate} from "@/lib/utils/methods";
import Select, {Option} from "@/components/form/element/select";
import Selections from "@/components/wizard/selections/selections";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";

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

    const addGroupWithSelections = function(group_id: number) {
        const group = document.querySelector('.group_' + group_id);
        let groupAdded: boolean = false;
        const elementsAdded: number[] = [];
        const selectionAdded: number[] = [];
        if (group) {
            let groupSelection: any = {};
            let hasWarning = false;
            group.querySelectorAll('.selection .warning').forEach(warning => {
                if (!empty(warning.textContent)) {
                    hasWarning = true;
                }
            })
            if (hasWarning) {
                console.error("Implement optional group error");
            } else {
                group.querySelectorAll('.selection input, .selection select').forEach((el: any) => {
                    const name: string = el.name;
                    let value: string = el.value;
                    if (empty(name) || empty(value) || value === '0') {
                        return;
                    }
                    if (!groupAdded) {
                        groupSelection = {
                            id: group_id,
                            date: undefined,
                            duration: undefined,
                            elements: [],
                        }
                        groupAdded = true;
                    }
                    switch (name) {
                        case 'duration':
                            groupSelection.duration = Number(value);
                            break;
                        case 'date':
                            groupSelection.date = value;
                            break;
                        default:
                            const selectionParts = name.split("_");
                            const elementId = Number(selectionParts[2]);
                            const selectionId = Number(selectionParts[3]);
                            const choice = Number(selectionParts[4]);
                            if (!elementsAdded.includes(elementId)) {
                                let element: any = {
                                    id: elementId,
                                    selections: [{
                                        id: selectionId,
                                        choices: [{
                                            key: choice,
                                            amount: Number(value),
                                        }]
                                    }],
                                };
                                groupSelection.elements.push(element);
                                elementsAdded.push(elementId);
                                selectionAdded.push(selectionId);
                            } else {
                                for (const elementIndex in groupSelection.elements) {
                                    if (groupSelection.elements[elementIndex].id === elementId) {
                                        if (selectionAdded.includes(selectionId)) {
                                            for (const selectionIndex in groupSelection.elements[elementIndex].selections) {
                                                if (groupSelection.elements[elementIndex].selections[selectionIndex].id === selectionId) {
                                                    groupSelection.elements[elementIndex].selections[selectionIndex].choices.push({
                                                        key: choice,
                                                        amount: Number(value),
                                                    })
                                                }
                                            }
                                        } else {
                                            groupSelection.elements[elementIndex].selections.push({
                                                id: selectionId,
                                                choices: [{
                                                    key: choice,
                                                    amount: Number(value),
                                                }],
                                            })
                                            selectionAdded.push(selectionId);
                                        }
                                    }
                                }
                            }
                            break;
                    }

                });
                console.log(groupSelection);
            }
        }
    }

    return (
        <div className={classNames(props.className ? props.className : "", "w-full")}>
            {selectedComponents.map((component: any) => (
                <div key={component.id} className="w-full grid grid-cols-4 mt-6">
                    <h2 className="col-span-4 text-nrv-orange font-medium">{component.name}</h2>
                    {component.groups.map((group: any) => (
                        <div key={group.id} className={"col-span-4 grid grid-cols-4 group_" + group.id}>
                            <h3 className="col-span-4 mt-4 text-gray-800">{group.name}</h3>
                            <div className="col-span-4 grid grid-cols-4 selection">
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
                            {group.active ?
                                <button
                                    // onClick={() => props.handler.nextStep()}
                                    type="button"
                                    className="inline-flex items-center justify-center gap-x-2 rounded-md bg-nrv-orange px-3.5 my-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-nrv-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
                                >
                                    <MinusIcon aria-hidden="true" className="-mr-0.5 size-5" />
                                    Verwijderen
                                </button>
                            :
                                <button
                                    onClick={() => addGroupWithSelections(group.id)}
                                    type="button"
                                    className="inline-flex items-center justify-center gap-x-2 rounded-md bg-nrv-orange px-3.5 my-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-nrv-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
                                >
                                    <PlusIcon aria-hidden="true" className="-mr-0.5 size-5" />
                                    Toevoegen
                                </button>
                            }

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}