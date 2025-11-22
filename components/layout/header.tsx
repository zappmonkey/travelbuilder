'use client'

import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {
    ChevronDownIcon,
    PhoneIcon,
    EnvelopeIcon,
    UserIcon
} from '@heroicons/react/24/solid'

import {GenericContent, IContent, IMenuItem} from "@/interface/content";
import Image from "next/image";
const navigation = {
    categories: [
        {
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg',
                    imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
                },
                {
                    name: 'Carry',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-04.jpg',
                    imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
                },
            ],
        },
        {
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
                    imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
                    imageAlt: 'Model wearing light heather gray t-shirt.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
                    imageAlt:
                        'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
                },
                {
                    name: 'Carry',
                    href: '#',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
                    imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}
type Props = {
    generic: GenericContent
}

export default function Header(props: Props) {
    const [open, setOpen] = useState(false)
    function objToArray(obj: Dict<any>|undefined): any[] {
        let list: any[] = [];
        if (obj == undefined) {
            return list;
        }
        for (const key in obj) {
            list.push(obj[key]);
        }
        return list;
    }
    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <div className="flex px-4 pt-5 pb-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <TabGroup className="mt-2">
                            <div className="border-b border-gray-200">
                                <TabList className="-mb-px flex space-x-8 px-4">
                                    {props.generic.menu?.items?.menu_top_new.items ? objToArray(props.generic.menu?.items?.menu_top_new.items).map((item: IMenuItem) => (
                                        <Tab
                                            key={item.id}
                                            className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-nrv-orange data-selected:text-nrv-orange"
                                        >
                                            {item.label}
                                        </Tab>
                                    )): null}
                                </TabList>
                            </div>
                            <TabPanels as={Fragment}>
                                {props.generic.menu?.items?.menu_top_new.items ? objToArray(props.generic.menu?.items?.menu_top_new.items).map((menu: IMenuItem) => (
                                    <TabPanel key={menu.id} className="space-y-12 px-4 py-6">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                        {objToArray(menu.items).map((group: IMenuItem) => (
                                            <div key={group.id} className="group relative">
                                                {objToArray(group.items).map((item: IMenuItem) => (
                                                    <a key={item.id} href={item.url} className="mt-6 block text-sm font-medium text-gray-900">
                                                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                        {item.label}
                                                    </a>
                                                ))}
                                            </div>))}
                                        </div>
                                    </TabPanel>
                                )): null}
                            </TabPanels>
                        </TabGroup>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className="flow-root">
                                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                    Create an account
                                </a>
                            </div>
                            <div className="flow-root">
                                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative">
                <nav aria-label="Top">
                    {/* Top navigation */}
                    <div className="bg-[#33b4f0]">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 sm:py-4 lg:py-6">
                            <div className="flex items-center space-x-6">
                                {objToArray(props.generic.content?.ban_new_contact.items).map((item: IContent) => (
                                    <a key={item.id} href={item.link?.url} className="text-sm font-medium text-white hover:text-gray-100">
                                        {item.title == 'phone' ? <PhoneIcon width={16} height={16} className="inline mr-2"/> : <EnvelopeIcon width={16} height={16} className="inline mr-2"/>}
                                        {item.link?.label}
                                    </a>
                                ))}
                            </div>
                            <div className="flex flex-1 items-center justify-end">
                                {objToArray(props.generic.content?.ban_new_links.items).map((item: IContent) => (
                                    <a key={item.id} href={item.link?.url} className="text-sm font-medium text-white hover:text-gray-100 px-3 b-r border-white border-r-1">
                                        {item.title == 'icon' ? <UserIcon width={16} height={16} className="inline mr-2"/> : null}
                                        {item.link?.label}
                                    </a>
                                ))}
                                {objToArray(props.generic.content?.ban_new_logos.items).map((item: IContent) => (
                                    <a key={item.id} href={item.link?.url} className="text-sm font-medium text-white hover:text-gray-100 px-3">
                                        {item.title == 'sgr' ? <Image src="/sgr.svg" alt={item.title} width={0} height={0} className="w-5 h-auto"/>
                                            : (
                                                item.title == 'anvr' ? <Image src="/anvr.svg" alt={item.title} width={0} height={0} className="w-5 h-auto"/>
                                                : <Image src="/calamiteitenfonds.svg" alt={item.title ? item.title : ""} width={0} height={0} className="w-5 h-auto"/>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Secondary navigation */}
                    <div className="bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div>
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo (lg+) */}
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center z-20">
                                        <a href="/">
                                            <span className="sr-only">NRV</span>
                                            <img
                                                alt=""
                                                src={props.generic.content?.ban_new_mainlogo.items?.[0].images?.[0].url}
                                                className="h-20 w-auto mt-10 border-white rounded-[50%] border-4"
                                            />
                                        </a>
                                    </div>

                                    <div className="hidden h-full lg:flex z-10">
                                        {/* Flyout menus */}
                                        <PopoverGroup className="inset-x-0 bottom-0 px-4">
                                            <div className="flex h-full justify-center space-x-8">
                                                {props.generic.menu?.items?.menu_top_new.items ? objToArray(props.generic.menu?.items?.menu_top_new.items).map((menu: IMenuItem) => (
                                                    <Popover key={menu.id} className="flex">
                                                        <div className="relative flex">
                                                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-800 transition-colors duration-200 ease-out hover:text-nrv-orange data-open:text-nrv-orange">
                                                                {menu.label}
                                                                <ChevronDownIcon width={16} height={16} className="ml-1"/>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-nrv-orange"
                                                                />
                                                            </PopoverButton>
                                                        </div>
                                                        <PopoverPanel
                                                            transition
                                                            className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                                        >
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                                                        {objToArray(menu.items).map((column: IMenuItem) => (
                                                                            <div key={column.id} className="group relative">
                                                                                {objToArray(column.items).map((group: IMenuItem) => (<div key={group.id}>
                                                                                    <a href={group.url} className="mt-4 block font-medium text-nrv-blue hover:text-nrv-orange">
                                                                                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                        {group.label}
                                                                                    </a>
                                                                                    {objToArray(group.items).map((item: IMenuItem) => (
                                                                                        <a key={item.id} href={item.url} className="mt-1 block text-gray-900 hover:text-nrv-orange">
                                                                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                            {item.label}
                                                                                        </a>
                                                                                    ))}
                                                                                </div>
                                                                                ))}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </PopoverPanel>
                                                    </Popover>
                                                )) : null}
                                            </div>
                                        </PopoverGroup>
                                    </div>

                                    {/* Mobile menu and search (lg-) */}
                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(true)}
                                            className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        >
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon aria-hidden="true" className="size-6" />
                                        </button>

                                        {/* Search */}
                                        <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                        </a>
                                    </div>

                                    {/* Logo (lg-) */}
                                    <a href="/" className="lg:hidden">
                                        <span className="sr-only">NRV</span>
                                        <img
                                            alt=""
                                            src={props.generic.content?.ban_new_mainlogo.items?.[0].images?.[0].url}
                                            className="h-20 w-auto mt-10 border-white rounded-[50%] border-4"
                                        />
                                    </a>

                                    <div className="flex flex-1 items-center justify-end">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
