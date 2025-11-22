'use server'

import Link from 'next/link'
import Header from "@/components/layout/header";
import Page from "@/components/page";
import Footer from "@/components/layout/footer";
import type {Metadata} from "next";
import {generic} from "@/lib/api/cms";
import {empty} from "@/lib/utils/methods";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "NRV",
        description: "NRV - Nederland reist voordelig",
        keywords: "NRV - Nederland reist voordelig",
        robots: {index: false, follow: false}
    }
}

export default async function NotFound()
{
    const generic_content = await generic()
    return (
        <>
            <div className="bg-white">
                <Header generic={generic_content}/>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                        404 - Not Found
                    </h2>
                </div>
                <Footer generic={generic_content}/>
            </div>
        </>
    )
}