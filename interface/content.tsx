export interface IImage {
    id?: bigint
    name?: string
    code?: string
    description?: string
    category?: string
    sort?: bigint
    url?: string
}

export interface ILink {
    label?: string
    url?: string
}

export interface IContent {
    id?: bigint;
    title?: string
    description?: string
    foot_text?: string
    html?: string
    link?: ILink
    date?: string
    publication_date?: string
    expiration_date?: string
    sort?: string
    images?: IImage[]
}

export interface IContentGroup {
    id?: bigint
    code?: string
    name?: string
    items?: IContent[]
}

export interface ILabel {
    id?: bigint
    code?: string
    name?: string
    domain?: string
    language_id?: string
    address?: string
    zip_code?: string
    city?: string
    country?: string
    phone?: string
    free?: string
}

export interface ICache {
    bypass?: boolean
    entity?: bigint
    content?: bigint
}

export interface ISettings {
    platform?: string
    instance?: string
    environment?: string
    domain?: string
    min_publicity?: string
    language_id?: string
    label?: ILabel
    cache?: ICache
}


export interface IMenuItem {
    id?: bigint
    code?: string
    label?: string
    url?: string
    no_follow?: boolean
    target_blank?: boolean
    svg?: string
    items?: Dict<IMenuItem>
}

export interface IEntity {
    id: bigint
    code: string
    type: string
}

export interface IPage {
    url?: string
    title?: string
    description?: string
    keywords?: string
    no_index?: boolean
    entity?: IEntity
}

export interface GenericContent {
    content?: Dict<IContentGroup>
    label?: ISettings
    menu?: IMenuItem
    pages?: Dict<IPage>
}