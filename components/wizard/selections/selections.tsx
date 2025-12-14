import {SimpleInput} from "@/lib/wizard/input";
import Print from "@/components/ui/dev/print";
import {classNames, empty} from "@/lib/utils/methods";
import Select, {Option} from "@/components/form/element/select";

type Props = {
    input: SimpleInput,
    group_id: number
    selection: any
    className?: string
}

type MinMax = {
    min: number
    max: number
}
export default function Selections(props: Props)
{
    const totalParticipants: number = props.input.ages.length
    const choicesByName = {};
    const getAmountOptions = (min: number, max: number): Option[] => {
        const options: Option[] = [];
        for (let d = min; d <= max; d++) {
            options.push({
                value: d.toString(),
                label: d.toString() + ' x',
            })
        }
        return options;
    }
    const getMinMax = (choice: any): MinMax => {
        if (choice.items.length < 1) {
            return {
                min: 1,
                max: 1
            }
        }
        const firstItem = choice.items.filter((x: any) => typeof x!==undefined).shift();
        return {
            min: firstItem.min_occupation,
            max: firstItem.max_occupation,
        }
    }
    const getElementId = (selection: any): number => {
        return selection.element_ids.filter((x: any) => typeof x !== undefined).shift();
    }
    const addChoiceByName = (name: string, choice: any): string|null => {
        // @ts-ignore
        choicesByName[name] = choice;
        return null;
    }
    const choiceByName = (name: string): any => {
        // @ts-ignore
        return choicesByName.hasOwnProperty(name) ? choicesByName[name] : null;
    }
    const checkOccupation = (group_id: number, selection_id: number, currentName: string, currentValue: string) => {
        let minAssigned = 0;
        let maxAssigned = 0;
        const info = document.querySelector('.selection_' + group_id + '_' + selection_id + ' .info');
        document.querySelectorAll('.selection_' + group_id + '_' + selection_id + ' input, .selection_' + group_id + '_' + selection_id + ' select').forEach((el: any) => {
            const name = el.name;
            let value = el.value;
            if (currentName === name) {
                value = currentValue;
            }
            if (empty(name) || empty(value) || value === '0') {
                return;
            }
            const choice = choiceByName(name);
            const minMax = getMinMax(choice);
            minAssigned += (minMax.min * Number(value));
            maxAssigned += (minMax.max * Number(value));
        })
        if (info !== null) {
            if (minAssigned <= totalParticipants && totalParticipants <= maxAssigned) {
                info.textContent = '';
            } else {
                info.textContent = 'Er zijn ' + totalParticipants + ' reizigers en er zijn ' + maxAssigned + ' toegedeeld';
            }
        }
    }
    const baseName = "selection_" + props.group_id + "_" + getElementId(props.selection) + "_" + props.selection.id + "_";
    if (!props.selection || props.selection.choices.length == 0) {
        return null
    }
    let amountChoice: boolean = false;
    if (props.selection.selection_method_name === 'Toedeling minimaal aantal items' || props.selection.selection_method_name === 'Toedeling keuze') {
        amountChoice = true;
    }
    return (
        <div className={classNames(props.className ? props.className : "", "w-full")}>
            <h4 className="text-sm/6 font-medium text-gray-600 w-full">{props.selection.label}</h4>
            {amountChoice ?
                <div className={"w-full selection_" + props.group_id + '_' + props.selection.id}>
                    <div className="info col-span-8 text-amber-900 text-xs py-2"></div>
                    {props.selection.choices.map((choice: any) => (
                        <div key={choice.key} className="w-full grid grid-cols-8 gap-4 items-center mt-2">
                            {addChoiceByName(baseName + choice.key, choice)}
                            <Select
                                name={baseName + choice.key}
                                options={getAmountOptions(0, choice.max)}
                                value={choice.amount ? choice.amount.toString() : '0'}
                                allowEmpty={false}
                                className="col-span-1"
                                onChange={(value: string) => {
                                    checkOccupation(props.group_id, props.selection.id, baseName + choice.key, value)
                                }}
                            />
                            <span className="col-span-7 text-sm text-gray-900">
                                {choice.label}
                            </span>
                        </div>
                    ))}
                </div> : <>
                    <Print context={props.selection}/>
                </>
            }
        </div>
    )
}