'use server'

import Print from "@/components/ui/dev/print";

type Props = {
    product: any
}

export default async function Wizard(props: Props)
{
    return (
        <Print context={props.product.id}/>
    )
}