'use server'

import React from "react";
import {generic} from "@/lib/api/cms";
import Print from "@/components/ui/dev/print";

type Props = {
    url: string
}

export default async function Page(props: Props) {
    // const generic_content = await generic()
    return (
        <Print context={props}/>
    )
}