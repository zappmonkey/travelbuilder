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
        value = i + 1;
        label = "kind";
        if (value > 1) {
            label = "kinderen";
        }
        children.push({
            value: value.toString(),
            label: value + " " + label,
        })
    })

    return (
        <Select name="children" options={children} value={props.input.children.toString()} label={'Kinderen'} emptyLabel="Geen kinderen" className={(props.className ? props.className : "")} onChange={(value: string) => props.wizardHandler.onChangeChildren(value)}/>
    )
}