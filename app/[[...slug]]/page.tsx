'use server'

import type { Metadata } from 'next'

import Page from "@/components/page";
import {generic} from "@/lib/api/cms";
import {GenericContent, IEntity, IPage} from "@/interface/content";
import {empty} from "@/lib/utils/methods";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NotFound from "@/components/errors/404";

interface ISlugs {
    slug: string[];
}

function getPage(generic_content: GenericContent, slugs: ISlugs): IPage|undefined
{
    let pathname = "/";
    if (slugs.hasOwnProperty("slug")) {
        pathname = "/" + slugs.slug.join("/");
    }
    let page: IPage|undefined = undefined;
    if (generic_content && generic_content.pages?.hasOwnProperty(pathname)) {
        page = generic_content.pages[pathname]
    }
    return page;
}

export async function generateMetadata({params}: {params: Promise<ISlugs>}): Promise<Metadata> {
    const slugs = await params;
    const generic_content = await generic()
    const page = getPage(generic_content, slugs);
    return {
        title: page && page.title? page.title : "NRV",
        description: page && page.description? page.description : "NRV - Nederland reist voordelig",
        keywords: page && page.keywords ? page.keywords : "NRV - Nederland reist voordelig",
        robots:{ index: empty(page?.no_index), follow: empty(page?.no_index) }
    }
}

export default async function Router({ params }: { params: Promise<ISlugs> })
{
    const slugs = await params
    const generic_content = await generic()
    const page = getPage(generic_content, slugs);
    if (page === undefined) {
        return <NotFound/>;
    }
    return (
        <div className="bg-white">
            <Header generic={generic_content}/>
            <Page generic={generic_content} page={page} />
            <Footer generic={generic_content}/>
        </div>
    )
}
