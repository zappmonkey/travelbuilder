import Select, {Option} from "@/components/form/element/select";
import {InputSimple} from "@/lib/wizard/input";

type Props = {
    input: InputSimple,
    className?: string,
    onChange?: (value: string) => void,
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
        <Select name="babies" options={babies} value={props.input.babies.toString()} label={'Babies'} emptyLabel="Geen babies" className={(props.className ? props.className : "")} onChange={props.onChange}/>
    )
}