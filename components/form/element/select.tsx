'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Field } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export type Option = {
    icon?: any
    value: string
    label: string
}

export type Props = {
    name: string
    label?: string
    emptyLabel?: string
    value?: string
    options: Option[]
    className?: string
    required?: boolean,
    allowEmpty?: boolean,
    ref?: any
    onChange?: (value: string) => void,
}

export default function Select(props: Props) {
    const getLabel = (value?: string): string => {
        for (const option of props.options) {
            if (option.value === value) {
                return option.label;
            }
        }
        return props.emptyLabel ?? "Make choice";
    };

    const [selected, setSelected] = useState(props.value)
    function handleSelect(value: string): void {
        setSelected(value)
        if (props.onChange) {
            props.onChange(value)
        }
    }
    return (
        <Field aria-required={props.required} className={props.className}>
            {props.ref ? <input type="hidden" ref={props.ref} value={selected ?? ""}/> : null}
            <Listbox name={props.name} value={selected} onChange={(value: string) => handleSelect(value)}>
                {props.label ? <Label className="block text-sm/6 font-medium text-gray-600 mb-2">{ props.label } { props.required ? <span className={"text-red-700"}>*</span> : <></>}</Label> : ''}
                <div className="relative">
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 border-1 border-gray-400 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-800 sm:text-sm/6">
                        <span className="col-start-1 row-start-1 truncate pr-6">{getLabel(selected)}</span>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-6 self-center justify-self-end text-gray-500 sm:size-5"
                        />
                    </ListboxButton>
                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                        {props.allowEmpty ?  <ListboxOption
                            key="empty"
                            value=""
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-400 select-none data-focus:bg-gray-600 data-focus:text-white data-focus:outline-hidden"
                        >
                            <span className="block truncate font-normal group-data-selected:font-semibold">{getLabel("")}</span>
                        </ListboxOption>: null}
                        {props.options.map((option) => (
                            <ListboxOption
                                key={option.value}
                                value={option.value}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-gray-500 data-focus:text-white data-focus:outline-hidden"
                            >

                                <span className="block truncate font-normal group-data-selected:font-semibold">{option.icon ? option.icon : null}{option.label}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-nrv-orange group-not-data-selected:hidden group-data-focus:text-white">
                                <CheckIcon aria-hidden="true" className="size-5" />
                            </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </Field>
    )
}
