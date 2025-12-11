import Select, {Option} from "@/components/form/element/select";
import {SimpleInput} from "@/lib/wizard/input";
import WizardHandler from "@/lib/wizard/handler";

type Props = {
    input: SimpleInput,
    className?: string,
    wizardHandler: WizardHandler
}

export default function Adults(props: Props)
{
    const adults: Option[] = [];
    let value: number;
    let label: string;
    [...Array(10)].map((_, i) => {
        value = i + 1;
        label = "volwassene";
        if (value > 1) {
            label = "volwassenen";
        }
        adults.push({
            value: value.toString(),
            label: value + " " + label,
        })
    })

    return (
        <Select name="adults" options={adults} value={props.input.adults.toString()} label={'Volwassenen'} className={(props.className ? props.className : "")} onChange={(value: string) => props.wizardHandler.onChangeAdults(value)}/>
    )
}