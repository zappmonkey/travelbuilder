'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import React from "react";

export default function Loader() {
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
                        className="relative transform overflow-hidden rounded-lg bg-gray-800 p-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex items-center justify-center rounded-full animate-bounce">
                                <span className="sr-only">NRV</span>
                                <img
                                    alt=""
                                    src="https://www.nrv.nl/cache/image/84x84_c9a3324b3a8a0401.png"
                                    className="h-20 w-auto mt-5 border-white rounded-[50%] border-4"
                                />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-2xl font-semibold text-orange-600">
                                    De droomreis staat zo voor je klaar!
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-md text-white/80">
                                        We zijn druk bezig om je droomreis samen te stellen. Dit kan ongeveer een minuut duren.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
