'use server'

import {GenericContent} from "@/interface/content";
import {Banner} from "@/components/product/banner";
import Print from "@/components/ui/dev/print";

type Props = {
    generic: GenericContent
    content: any
}

export default async function ProductPage(props: Props)
{
    return (
        <>
            <Banner product={props.content}/>
            <Print context={props.content}/>
        </>
    )
}