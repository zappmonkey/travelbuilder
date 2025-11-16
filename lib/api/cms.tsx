'use server'

import {fetcher} from '@/lib/api/fetcher';

export async function generic(): Promise<any>
{
    return fetcher.get('cms/generic')
}