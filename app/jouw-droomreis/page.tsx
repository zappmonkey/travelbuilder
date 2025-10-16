'use client'

import React, { Fragment, useState } from 'react'
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
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {empty} from "@/utils/methods";
import Loader from "@/components/loader";
import TripOverview from "@/components/trip_overview";

const navigation = {
    categories: [
        {
            name: 'Acties',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Accessories',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg',
                    imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
                },
                {
                    name: 'Carry',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-04.jpg',
                    imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
                },
            ],
        },
        {
            name: 'Bestemmingen',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
                    imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
                },
                {
                    name: 'Basic Tees',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
                    imageAlt: 'Model wearing light heather gray t-shirt.',
                },
                {
                    name: 'Accessories',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
                    imageAlt:
                        'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
                },
                {
                    name: 'Carry',
                    href: '/',
                    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
                    imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Groepsreizen', href: '/' },
        { name: 'Privéreizen', href: '/' },
        { name: 'Familiereizen', href: '/' },
        { name: 'Zelfsamenstellen', href: '/jouw-droomreis' },
        { name: 'Cruises', href: '/' },
    ],
}
const categories = [
    {
        name: 'Groepsreizen',
        href: '/',
        imageSrc: 'https://www.nrv.nl/cache/image/201810250930150.Monument%20Valley%20in%20Amerika_1540452615.jpg',
    },
    {
        name: 'Privéreizen',
        href: '/',
        imageSrc: 'https://www.nrv.nl/cache/image/14382663047pealmachupi_1537334166.jpg',
    },
    {
        name: 'Familiereizen',
        href: '/',
        imageSrc: 'https://www.nrv.nl/cache/image/458x1920_d0b4a49f47df6381.webp',
    },
    {
        name: 'Zelfsamenstellen',
        href: '/',
        imageSrc: 'https://www.nrv.nl/cache/image/803x1835_500x1920_0b566bb24ea1244d.webp',
    },
    {
        name: 'Cruises',
        href: '/',
        imageSrc: 'https://www.nrv.nl/cache/image/458x1920_972f2be4f5312c95.webp',
    },
]
const collections = [
    {
        name: 'Handcrafted Collection',
        href: '/',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-01.jpg',
        imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
        description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
    },
    {
        name: 'Organized Desk Collection',
        href: '/',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-02.jpg',
        imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
        description: 'The rest of the house will still be a mess, but your desk will look great.',
    },
    {
        name: 'Focus Collection',
        href: '/',
        imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-collection-03.jpg',
        imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
        description: 'Be more productive than enterprise project managers with a single piece of paper.',
    },
]
const footerNavigation = {
    shop: [
        { name: 'Bags', href: '/' },
        { name: 'Tees', href: '/' },
        { name: 'Objects', href: '/' },
        { name: 'Home Goods', href: '/' },
        { name: 'Accessories', href: '/' },
    ],
    company: [
        { name: 'Who we are', href: '/' },
        { name: 'Sustainability', href: '/' },
        { name: 'Press', href: '/' },
        { name: 'Careers', href: '/' },
        { name: 'Terms & Conditions', href: '/' },
        { name: 'Privacy', href: '/' },
    ],
    account: [
        { name: 'Manage Account', href: '/' },
        { name: 'Returns & Exchanges', href: '/' },
        { name: 'Redeem a Gift Card', href: '/' },
    ],
    connect: [
        { name: 'Contact Us', href: '/' },
        { name: 'Facebook', href: '/' },
        { name: 'Instagram', href: '/' },
        { name: 'Pinterest', href: '/' },
    ],
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [loader, showLoader] = useState(false)
    const [overview, setOverview] = useState(false)

    const occupation = React.createRef<HTMLInputElement>();
    const location = React.createRef<HTMLInputElement>();
    const duration = React.createRef<HTMLInputElement>();
    const places = React.createRef<HTMLInputElement>();

    const closeOverview = function() {
        setOverview(false)
    };

    const refresh = function() {
        setOverview(false)
        build()
    };

    const build = async function(): Promise<void> {
        showLoader(true)
        let question: string = "Gebaseerd op de data in de file wil ik graag een voorstel voor een rondreis van ";
        if (!empty(duration.current?.value)) {
            question = question + (duration.current?.value ?? "") + " met ";
        }
        if (!empty(occupation.current?.value)) {
            question = question + (occupation.current?.value ?? "") + " door ";
        }
        if (!empty(location.current?.value)) {
            question = question + (location.current?.value ?? "") + " en wil ";
        }
        if (!empty(places.current?.value)) {
            if (isNaN(Number(places.current?.value))) {
                question = question + (places.current?.value ?? "") + " bezoeken. ";
            } else {
                question = question + (places.current?.value ?? "") + " plaatsen bezoeken. ";
            }
        }
        question = question + "Prijzen van externe bronnen toevoegen indien mogelijk."
        await fetch('http://127.0.0.1:8000/tripbuilder/prompt', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                question: question,
            }),
        })
        .then((response) => response.json())
        .then(async (res) => {
            setOverview(res)
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => showLoader(false));
    };

    return (
        <div className="bg-white">
            {loader ? <Loader/> : null}
            {overview ? <TripOverview trip={overview} closeAction={closeOverview} refreshAction={refresh}/> : null}
            {/* Hero section */}
            <div className="relative bg-gray-900">
                {/* Decorative image and overlay */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    <img
                        alt=""
                        src="https://www.nrv.nl/cache/image/500x1920_0b566bb24ea1244d.webp"
                        className="size-full object-cover"
                    />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

                {/* Navigation */}
                <header className="relative z-10 font-bold">
                    <nav aria-label="Top">
                        <div className="bg-[#33b4f0]">
                            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                                <div className="flex items-center space-x-6">
                                    <a href="/" className="text-sm font-medium text-white hover:text-gray-100">
                                        +31 (0)70 3076700
                                    </a>
                                    <a href="/" className="text-sm font-medium text-white hover:text-gray-100">
                                        info@nrv.nl
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Secondary navigation */}
                        <div className="bg-white/10 backdrop-blur-md backdrop-filter">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div>
                                    <div className="flex h-16 items-center justify-between">
                                        {/* Logo (lg+) */}
                                        <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                            <a href="/">
                                                <span className="sr-only">NRV</span>
                                                <img
                                                    alt=""
                                                    src="https://www.nrv.nl/cache/image/84x84_c9a3324b3a8a0401.png"
                                                    className="h-20 w-auto mt-10 border-white rounded-[50%] border-4"
                                                />
                                            </a>
                                        </div>

                                        <div className="hidden h-full lg:flex">
                                            {/* Flyout menus */}
                                            <PopoverGroup className="inset-x-0 bottom-0 px-4">
                                                <div className="flex h-full justify-center space-x-8">
                                                    {navigation.categories.map((category) => (
                                                        <Popover key={category.name} className="flex">
                                                            <div className="relative flex">
                                                                <PopoverButton className="group relative flex items-center justify-center text-md font-medium text-white transition-colors duration-200 ease-out">
                                                                    {category.name}
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-white"
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
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative">
                                                                                    <img
                                                                                        alt={item.imageAlt}
                                                                                        src={item.imageSrc}
                                                                                        className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                                                                                    />
                                                                                    <a href={item.href} className="mt-4 block font-bold text-gray-900">
                                                                                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </PopoverPanel>
                                                        </Popover>
                                                    ))}
                                                    {navigation.pages.map((page) => (
                                                        <a
                                                            key={page.name}
                                                            href={page.href}
                                                            className="flex items-center text-md font-medium text-white"
                                                        >
                                                            {page.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </PopoverGroup>
                                        </div>

                                        {/* Mobile menu and search (lg-) */}
                                        <div className="flex flex-1 items-center lg:hidden">
                                            <button type="button" onClick={() => setMobileMenuOpen(true)} className="-ml-2 p-2 text-white">
                                                <span className="sr-only">Open menu</span>
                                                <Bars3Icon aria-hidden="true" className="size-6" />
                                            </button>

                                            {/* Search */}
                                            <a href="/" className="ml-2 p-2 text-white">
                                                <span className="sr-only">Zoeken</span>
                                                <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                            </a>
                                        </div>

                                        {/* Logo (lg-) */}
                                        <a href="/" className="lg:hidden">
                                            <span className="sr-only">Your Company</span>
                                            <img
                                                alt=""
                                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                                                className="h-8 w-auto"
                                            />
                                        </a>

                                        <div className="flex flex-1 items-center justify-end">

                                            <div className="flex items-center lg:ml-8">
                                                {/* Help */}
                                                <a href="/" className="p-2 text-white lg:hidden">
                                                    <span className="sr-only">Help</span>
                                                    <QuestionMarkCircleIcon aria-hidden="true" className="size-6" />
                                                </a>
                                                <a href="/" className="hidden text-sm font-medium text-white lg:block">
                                                    Hulp nodig?
                                                </a>

                                                {/* Cart */}
                                                <div className="ml-4 flow-root lg:ml-8">
                                                    <a href="/" className="group -m-2 flex items-center p-2">
                                                        <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-white" />
                                                        <span className="ml-2 text-sm font-medium text-white">0</span>
                                                        <span className="sr-only">items in cart, view bag</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center lg:px-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">Jouw droomreis in een paar minuten voor je geregeld!</h1>
                    <form className="w-[480px] flex flex-col">
                        <div>
                            <label htmlFor="location" className="block text-md font-bold text-orange-600 pt-10 text-left">
                                Met wie ga je reizen? <i>(Beschrijf de groep)</i>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="occupation"
                                    name="occupation"
                                    type="occupation"
                                    ref={occupation}
                                    placeholder="bv. 2 volwassenen en 2 kinderen"
                                    aria-describedby="occupation-description"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-md font-bold text-orange-600 pt-5 text-left">
                                Waar wil je naar toe?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="location"
                                    name="location"
                                    type="location"
                                    ref={location}
                                    placeholder="bv. Costa Rica of Thailand en Vietnam"
                                    aria-describedby="location-description"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-md font-bold text-orange-600 pt-5 text-left">
                                Hoe lang wil je reizen?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="duration"
                                    name="duration"
                                    type="duration"
                                    ref={duration}
                                    placeholder="bv. 3 weken of 21 dagen"
                                    aria-describedby="duration-description"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="places" className="block text-md font-bold text-orange-600 pt-5 text-left">
                                Hoeveel of welke plaatsen zou wil je bezoeken?
                            </label>
                            <div className="mt-2">
                                <input
                                    id="places"
                                    name="places"
                                    type="places"
                                    ref={places}
                                    placeholder="bv. 5 of San José, Arenal, Puerto Viejo"
                                    aria-describedby="places-description"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        onClick={() => build()}
                        className="mt-8 inline-block rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base text-white font-bold hover:bg-orange-500"
                    >
                        Bekijk nu jouw droomreis?
                    </button>
                </div>
            </div>

            <main>
                {/* Category section */}
                <section aria-labelledby="category-heading" className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                        <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                            Bekijk per type reis
                        </h2>
                        <a href="/" className="hidden text-sm font-semibold text-orange-600 hover:text-orange-500 sm:block">
                            Bekijk alle reis types
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>

                    <div className="mt-4 flow-root">
                        <div className="-my-2">
                            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                                    {categories.map((category) => (
                                        <a
                                            key={category.name}
                                            href={category.href}
                                            className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                                        >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img alt="" src={category.imageSrc} className="size-full object-cover" />
                      </span>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray-800 opacity-50"
                                            />
                                            <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 px-4 sm:hidden">
                        <a href="/" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                            Browse all categories
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </section>

                {/* Featured section */}
                <section
                    aria-labelledby="social-impact-heading"
                    className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
                >
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0">
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                                <h2 id="social-impact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    <span className="block sm:inline">Level up</span>
                                    <span className="block sm:inline">your desk</span>
                                </h2>
                                <p className="mt-3 text-xl text-white">
                                    Make your desk beautiful and organized. Post a picture to social media and watch it get more likes
                                    than life-changing announcements. Reflect on the shallow nature of existence. At least you have a
                                    really nice desk setup.
                                </p>
                                <a
                                    href="/"
                                    className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                                >
                                    Shop Workspace
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Collection section */}
                <section
                    aria-labelledby="collection-heading"
                    className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
                >
                    <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Shop by Collection
                    </h2>
                    <p className="mt-4 text-base text-gray-500">
                        Each season, we collaborate with world-class designers to create a collection inspired by the natural world.
                    </p>

                    <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-8">
                        {collections.map((collection) => (
                            <a key={collection.name} href={collection.href} className="group block">
                                <img
                                    alt={collection.imageAlt}
                                    src={collection.imageSrc}
                                    className="aspect-3/2 w-full rounded-lg object-cover group-hover:opacity-75 lg:aspect-5/6"
                                />
                                <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{collection.description}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Featured section */}
                <section aria-labelledby="comfort-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0">
                            <img
                                alt=""
                                src="https://www.nrv.nl/cache/image/400x1680_8365b9ec2c740445_1602231193.jpg"
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                                <h2 id="comfort-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Simple productivity
                                </h2>
                                <p className="mt-3 text-xl text-white">
                                    Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best
                                    here. No kanban boards, burndown charts, or tangled flowcharts with our Focus system. Just the
                                    undeniable urge to fill empty circles.
                                </p>
                                <a
                                    href="/"
                                    className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                                >
                                    Shop Focus
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer aria-labelledby="footer-heading" className="bg-gray-900">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                <div>
                                    <h3 className="text-sm font-medium text-white">Shop</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.shop.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white">Company</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                <div>
                                    <h3 className="text-sm font-medium text-white">Account</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.account.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white">Connect</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.connect.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 md:mt-16 xl:mt-0">
                            <h3 className="text-sm font-medium text-white">Sign up for our newsletter</h3>
                            <p className="mt-6 text-sm text-gray-300">The latest deals and savings, sent to your inbox weekly.</p>
                            <form className="mt-2 flex sm:max-w-md">
                                <input
                                    id="email-address"
                                    type="text"
                                    required
                                    autoComplete="email"
                                    aria-label="Email address"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                                />
                                <div className="ml-4 shrink-0">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-hidden"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 py-10">
                        <p className="text-sm text-gray-400">Copyright &copy; 2021 Your Company, Inc.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
