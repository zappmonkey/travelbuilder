'use client'

import { usePathname } from 'next/navigation'
import Page from "@/components/page";

export default function Router()
{
    const pathname = usePathname()
    return (<>
            {pathname}
            <Page url={pathname}/>
        </>
    )
}
