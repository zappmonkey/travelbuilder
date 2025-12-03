import Select, {Option} from "@/components/form/element/select";
import {InputSimple} from "@/lib/wizard/input";

type Props = {
    input: InputSimple,
    className?: string,
    onChange?: (value: string) => void,
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
        <Select name="adults" options={adults} value={props.input.adults.toString()} label={'Volwassenen'} className={(props.className ? props.className : "")} onChange={props.onChange}/>
    )
}