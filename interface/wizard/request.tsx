import {Product} from "@/interface/wizard/product"
import {Occupation} from "@/interface/wizard/occupation"

export interface WizardRequest {
    product: Product|undefined;
    occupation: Occupation|undefined;
    date: string|undefined;
    display_date: string|undefined;
    dates_around: number|undefined;
    duration: number|undefined;
    durations_around: number|undefined;
    calls: string[]
    groups: Group[]
}