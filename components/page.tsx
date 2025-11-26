'use server'

import React from "react";
import {generic, package_group} from "@/lib/api/cms";
import Print from "@/components/ui/dev/print";
import {GenericContent, IPage} from "@/interface/content";
import ProductPage from "@/components/pages/product";

type Props = {
    page: IPage,
    generic: GenericContent,
}

export default async function Page(props: Props)
{
    switch (props.page.entity?.type) {
        case 'package_group':
            const product = await package_group(props.page.entity?.id);
            return <ProductPage product={product} generic={props.generic} />
    }
    return (
        <Print context={props.page}/>
    )
}