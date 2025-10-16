'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from "react";
import {ArrowPathIcon, XMarkIcon} from "@heroicons/react/20/solid";

type Props = {
    trip: any,
    closeAction: () => void,
    refreshAction: () => void,
}

export default function TripOverview(props: Props) {
    return (
        <Dialog open={true} onClose={() => {}} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-gray-800 p-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[1440px] sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <DialogTitle className="flex justify-between font-medium text-orange-600 text-2xl">
                            <div>
                                Onze droomreis voorstel voor jou!
                            </div>
                            <div>
                                <button onClick={() => {props.refreshAction()}} className="px-3 text-white/60 hover:text-orange-600">
                                    <ArrowPathIcon width={20} height={20} />
                                </button>
                                <button onClick={() => {props.closeAction()}} className="px-3 text-white/60 hover:text-orange-600">
                                    <XMarkIcon width={20} height={20} />
                                </button>
                            </div>
                        </DialogTitle>
                        <div>
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-text-top">
                                        <table className="min-w-full border-separate border-spacing-0">
                                            <thead>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="sticky top-0 z-10 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-white/50 sm:pl-6 lg:pl-8"
                                                    >
                                                        Dag
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-white/50 sm:table-cell"
                                                    >
                                                        Waar?
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-white/50 sm:table-cell"
                                                    >
                                                        Wat?
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-white/50 lg:table-cell w-5/12"
                                                    >
                                                        Omschrijving
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-white/50 w-1/12"
                                                    >
                                                        Prijs
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="pt-10">
                                            {props.trip.map((day: any) => (<>
                                                {day.accommodation ?
                                                <tr key={"acco_" + day.accommodation.accommodation_id}>
                                                    <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-whitesm:pl-6 lg:pl-8">
                                                        Dag {day.start_day} {day.start_day != day.end_day ? "t/m " + day.end_day : ""}
                                                    </td>
                                                    <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white/70  font-medium">
                                                        {day.location ? day.location.name : null}
                                                    </td>
                                                    <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-orange-600 font-medium">
                                                        {day.accommodation ? day.accommodation.name : day.excursion.name}
                                                    </td>
                                                    <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white italic">
                                                        {day.accommodation ? day.accommodation.description : day.excursion.description}
                                                    </td>
                                                    <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white sm:pr-6 lg:pr-8">
                                                        {day.accommodation && day.accommodation.price ? "€ " : "Op aanvraag"}
                                                        {day.accommodation && day.accommodation.price ?
                                                            (day.accommodation.price.price_per_night ? day.accommodation.price.price_per_night * day.nights :
                                                                (day.accommodation.price.price_per_person ? day.accommodation.price.price_per_person + " p.p." :
                                                                    (day.accommodation.price.price ? day.price.price : null)
                                                                )
                                                            )
                                                        : null}
                                                    </td>
                                                </tr> :
                                                null}
                                                {day.excursion ?
                                                    <tr key={"exc_" + day.excursion.excursion_id}>
                                                        <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white sm:pl-6 lg:pl-8">
                                                            Dag {day.excursion.day}
                                                        </td>
                                                        <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white font-medium">
                                                            {/*{day.location ? day.location.name : null}*/}
                                                        </td>
                                                        <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white/60  font-medium">
                                                            {day.excursion.name}
                                                        </td>
                                                        <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white italic">
                                                            {day.excursion.description}
                                                        </td>
                                                        <td className="text-sm px-3 align-text-top pl-4 py-3.5 text-left text-white lg:pr-8">
                                                            {day.excursion && day.excursion.price && (day.excursion.price.price || day.excursion.price_per_person || day.excursion.price_per_night) ? "€ " : "Op aanvraag"}
                                                            {day.excursion && day.excursion.price ?
                                                                (day.excursion.price.price ? day.excursion.price.price :
                                                                        (day.excursion.price.price_per_person ? day.excursion.price.price_per_person + " p.p." :
                                                                                (day.excursion.price.price_per_night ? day.excursion.price.price_per_night * day.nights : null)
                                                                        )
                                                                )
                                                                : null}
                                                        </td>
                                                    </tr> :
                                                    null}
                                                </>))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
