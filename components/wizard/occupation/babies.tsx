import Select, {Option} from "@/components/form/element/select";
import {SimpleInput} from "@/lib/wizard/input";
import WizardHandler from "@/lib/wizard/handler";

type Props = {
    input: SimpleInput,
    className?: string,
    wizardHandler: WizardHandler
}

export default function Babies(props: Props)
{
    const babies: Option[] = [];
    let value: number;
    let label: string;
    [...Array(6)].map((_, i) => {
        value = i + 1;
        label = "baby";
        if (value > 1) {
            label = "babies";
        }
        babies.push({
            value: value.toString(),
            label: value + " " + label,
        })
    })

    return (
        <Select name="babies" options={babies} value={props.input.babies.toString()} label={'Babies'} emptyLabel="Geen babies" className={(props.className ? props.className : "")} onChange={(value: string) => props.wizardHandler.onChangeBabies(value)}/>
    )
}