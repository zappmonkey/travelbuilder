'use server'

import Print from "@/components/ui/dev/print";
import {wizard} from "@/lib/api/wizard";
import {GenericContent} from "@/interface/content";
import {Input} from "@/lib/wizard/input";
import Calendar from "@/components/wizard/matrix/calendar";
type Props = {
    product: any
    generic: GenericContent
}

export default async function Wizard(props: Props)
{
    const input = new Input(Number(props.product.id));
    await input.read()
    let date = input.date;
    let duration = input.duration;
    if (date === undefined) {
        date = input.display_date === undefined ? props.product.prices.lowest.date : input.display_date;
    }
    if (duration === undefined) {
        duration = props.product.prices.lowest.duration;
    }
    let calls = [
        "price",
        "selection",
    ];
    if (input.date !== undefined) {
        calls.push("book_check");
    }
    await input.write();
    let data = await wizard({
        "product": {
            "id": input.id,
            "type": "PACKAGE"
        },
        "occupation": {
            "adults": undefined,
            "children": undefined,
            "babies": undefined,
            "ages": input.ages
        },
        "date": date,
        "dates_around": 365,
        "duration": duration,
        "durations_around": undefined,
        "calls": calls
    })
    return (
        <>
            <Calendar prices={data.price.prices} input={input.simple()} />
            {/*<Print context={[props.product.prices?.lowest, data]}/>*/}
        </>
    )
}