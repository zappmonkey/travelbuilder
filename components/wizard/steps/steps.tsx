import { CheckIcon } from '@heroicons/react/24/solid'

import WizardHandler from "@/lib/wizard/handler";

type Props = {
    className?: string,
    handler: WizardHandler,
}

export default function Steps(props: Props)
{
    const steps = props.handler.steps();
    return (
        <div className={props.className}>
            <nav aria-label="Progress">
                <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
                    {steps.map((step) => (
                        <li key={step.id} className="relative md:flex md:flex-1">
                            {step.completed ? (
                                <button onClick={() => props.handler.setStep(step.id)} className="group flex w-full items-center cursor-pointer">
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full rounded-full border-2 border-nrv-orange">
                                            <CheckIcon aria-hidden="true" className="size-6 text-nrv-orange" />
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-nrv-orange">{step.label}</span>
                                    </span>
                                </button>
                            ) : step.active ? (
                                <div aria-current="step" className="flex items-center px-6 py-4 text-sm font-medium">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-nrv-orange">
                                      <span className="text-nrv-orange">{step.id}</span>
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-nrv-orange">{step.label}</span>
                                </div>
                            ) : (
                                <div className="group flex items-center">
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                                            <span className="text-gray-500">{step.id}</span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-500">{step.label}</span>
                                    </span>
                                </div>
                            )}
                            {step.id <= steps.length - 1 ? (
                                <>
                                    {/* Arrow separator for lg screens and up */}
                                    <div aria-hidden="true" className="absolute top-0 right-0 hidden h-full w-5 md:block">
                                        <svg fill="none" viewBox="0 0 22 80" preserveAspectRatio="none" className="size-full text-gray-300">
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                stroke="currentcolor"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}