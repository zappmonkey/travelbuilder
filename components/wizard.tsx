'use server'

import Print from "@/components/ui/dev/print";
import {wizard} from "@/lib/api/wizard";
import {GenericContent} from "@/interface/content";
type Props = {
    product: any
    generic: GenericContent
}

export default async function Wizard(props: Props)
{
    let data = await wizard({
        "product": {
            "id": props.product.id,
            "type": "PACKAGE"
        },
        "occupation": {
            "adults": undefined,
            "children": undefined,
            "babies": undefined,
            "ages": [
                30,
                30
            ]
        },
        "date": "2025-12-13",
        "duration": undefined,
        "calls": [
            "price",
            "selection",
            "book_check"
        ]
    })
    return (
        <Print context={data}/>
    )
}