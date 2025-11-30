'use server'

import {fetcher} from '@/lib/api/fetcher';
import {Request} from "@/interface/wizard/request"

export async function wizard(request: Request): Promise<any>
{
    return fetcher.post('wizard', request)
}