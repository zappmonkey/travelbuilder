import Print from "@/components/ui/dev/print";
import WizardHandler from "@/lib/wizard/handler";
import {SimpleInput} from "@/lib/wizard/input";
import {classNames, dateToHumanReadable, empty, getIsoDate} from "@/lib/utils/methods";
import Select, {Option} from "@/components/form/element/select";
import Selections from "@/components/wizard/selections/selections";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {CheckIcon, MinusIcon, PlusIcon} from "@heroicons/react/20/solid";

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
    const groupInput = (group_id: number) => {
        if (props.input.groups.length > 0) {
            for (const group of props.input.groups) {
                if (group.id === group_id) {
                    return group;
                }
            }
        }
        return undefined;
    }

    const groupDuration = (group_id: number) => {
        const group = groupInput(group_id)
        if (group) {
            return group.duration?.toString();
        }
        return "";
    }
    const groupDate = (group_id: number) => {
        const group = groupInput(group_id)
        if (group) {
            return group.date;
        }
        return "";
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

    const removeGroup = function(group_id: number): void {
        let groupRemoved: boolean = false;
        for (const groupIndex in props.input.groups) {
            const group = props.input.groups[groupIndex];
            if (group.id == group_id) {
                props.input.groups.splice(Number(groupIndex), 1);
                groupRemoved = true;
            }
        }
        if (groupRemoved) {
            props.handler.update(props.input);
        }
    }

    const addGroupWithSelections = function(group_id: number): void {
        const group = document.querySelector('.group_' + group_id);
        let groupAdded: boolean = false;
        const elementsAdded: number[] = [];
        const selectionAdded: number[] = [];
        let groupSelection: Group;
        if (group) {
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
                            participants: [],
                            elements: [],
                        }
                        groupAdded = true;
                    }
                    if (groupSelection === undefined) {
                        return;
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
                                        group_id: selectionId,
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
                                                if (groupSelection.elements[elementIndex].selections[selectionIndex].group_id === selectionId) {
                                                    groupSelection.elements[elementIndex].selections[selectionIndex].choices.push({
                                                        key: choice.toString(),
                                                        amount: Number(value),
                                                    })
                                                }
                                            }
                                        } else {
                                            groupSelection.elements[elementIndex].selections.push({
                                                group_id: selectionId,
                                                choices: [{
                                                    key: choice.toString(),
                                                    amount: Number(value),
                                                }],
                                            } as Selection)
                                            selectionAdded.push(selectionId);
                                        }
                                    }
                                }
                            }
                            break;
                    }
                });
            }
        }
        // @ts-ignore
        if (groupSelection !== undefined) {
            let groupUpdated: boolean = false;
            for (const groupIndex in props.input.groups) {
                const group = props.input.groups[groupIndex];
                if (group.id == groupSelection.id) {
                    props.input.groups[groupIndex] = groupSelection;
                    groupUpdated = true;
                }
            }
            if (!groupUpdated) {
                props.input.groups.push(groupSelection);
            }
            props.handler.update(props.input);
        }
    }

    return (
        <div className={classNames(props.className ? props.className : "", "w-full")}>
            {selectedComponents.map((component: any) => (
                <div key={component.id} className="w-full grid grid-cols-4 mt-6">
                    <h2 className="col-span-4 text-nrv-orange font-medium">{component.name}</h2>
                    {component.groups.map((group: any) => (
                        <div key={group.id} className={"col-span-4 grid grid-cols-4 group_" + group.id}>
                            {/*<Print context={group}/>*/}
                            <h3 className="col-span-4 mt-4 text-gray-800">{group.name}</h3>
                            <div className="col-span-4 grid grid-cols-4 selection">
                                {group.dates && group.dates.length > 1 ?
                                    <Select
                                        name="date"
                                        options={getDateOptions(group.dates)}
                                        value={groupDate(group.id)}
                                        label={'Vanaf wanneer wil je verblijven?'}
                                        className="col-span-1 mt-2"
                                    />
                                : null}
                                {group.min_duration != group.max_duration ?
                                    <Select
                                        name="duration"
                                        options={getDurationOptions(group.min_duration, group.max_duration)}
                                        value={groupDuration(group.id)}
                                        label={'Hoe lang wil je verblijven?'}
                                        className="col-span-1 mt-2"
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
                            {group.selected ?<>
                                    <button
                                        onClick={() => removeGroup(group.id)}
                                        type="button"
                                        className="mt-4 inline-flex items-center justify-center gap-x-2 rounded-md bg-gray-500 px-3.5 my-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-nrv-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
                                    >
                                        <MinusIcon aria-hidden="true" className="-mr-0.5 size-5" />
                                        Verwijderen
                                    </button>
                                    <button
                                        onClick={() => addGroupWithSelections(group.id)}
                                        type="button"
                                        className="mt-4 inline-flex items-center justify-center gap-x-2 rounded-md bg-nrv-orange px-3.5 my-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-nrv-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
                                    >
                                        <CheckIcon aria-hidden="true" className="-mr-0.5 size-5" />
                                        Aanpassen
                                    </button>
                                </>
                            :
                                <button
                                    onClick={() => addGroupWithSelections(group.id)}
                                    type="button"
                                    className="mt-4 inline-flex items-center justify-center gap-x-2 rounded-md bg-nrv-orange px-3.5 my-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-nrv-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
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