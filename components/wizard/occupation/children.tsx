import Select, {Option} from "@/components/form/element/select";
import {SimpleInput} from "@/lib/wizard/input";
import WizardHandler from "@/lib/wizard/handler";

type Props = {
    input: SimpleInput,
    className?: string,
    wizardHandler: WizardHandler
}

export default function Children(props: Props)
{
    const children: Option[] = [];
    let value: number;
    let label: string;
    [...Array(6)].map((_, i) => {
        value = i;
        label =  value + " kind";
        if (value == 0) {
            label = "Geen kinderen";
        }
        if (value > 1) {
            label = value + " kinderen";
        }
        children.push({
            value: value.toString(),
            label: label,
        })
    })

    return (
        <Select name="children" options={children} value={props.input.children.toString()} label={'Kinderen'} emptyLabel="Geen kinderen" className={(props.className ? props.className : "")} onChange={(value: string) => props.wizardHandler.onChangeChildren(value)}/>
    )
}