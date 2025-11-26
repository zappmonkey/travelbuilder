'use server'

import {GenericContent} from "@/interface/content";
import {Banner} from "@/components/product/banner";
import Print from "@/components/ui/dev/print";
import ProductTabs from "@/components/product/tabs";

type Props = {
    generic: GenericContent
    product: any
}

export default async function ProductPage(props: Props)
{
    return (
        <>
            <Banner product={props.product}/>
            <ProductTabs product={props.product} generic={props.generic}/>
        </>
    )
}