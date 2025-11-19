'use server'

import {fetcher} from '@/lib/api/fetcher';
import {GenericContent} from "@/interface/content";

export async function generic(): Promise<GenericContent>
{
    return fetcher.get('cms/generic')
}