import {Product} from "@/interface/wizard/product"
import {Occupation} from "@/interface/wizard/occupation"

export interface Request {
    product: Product|undefined;
    occupation: Occupation|undefined;
    date: string|undefined;
    duration: number|undefined;
    calls: string[]
}