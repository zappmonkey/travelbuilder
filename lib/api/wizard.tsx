'use server'

import {fetcher} from '@/lib/api/fetcher';
import {WizardRequest} from "@/interface/wizard/request"

export async function wizard(request: WizardRequest): Promise<any>
{
    return fetcher.post('wizard', request)
}