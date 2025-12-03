interface PriceDetail {
    full: number;
    base: number;
    without_mutations: number;
}

interface Price {
    per_person: PriceDetail;
    total: PriceDetail;
    mutations: any[];
}

interface Selection {
    item_id: number
    subpackage_element_id: number
    amount: number
    unit_price: number
    availability: string
    daynumber: number
    duration: number
    code: string
    description: string
    property_id: number
    type: string
    type_id: number
    element_id: number
    element_code: string
    element_name: string
    discount: boolean
    amount_available: number
    group_composition: any[]
    accompanist: any[]
    allotment: any
}

export interface PriceModel {
    date: string;
    duration: number;
    price: Price;
    availability: string;
    description: string;
    selection: Selection[];
    item: any;
    tags: any
    metadata: any;
}