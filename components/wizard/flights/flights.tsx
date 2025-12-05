import {InputSimple} from "@/lib/wizard/input";
import Print from "@/components/ui/dev/print";

type Props = {
    input: InputSimple,
    flights: any,
    className?: string,
    onChange?: (date: Date) => void,
}

export default function Flights(props: Props)
{
    return (
        <Print context={[props.input, props.flights]}/>
    )
}