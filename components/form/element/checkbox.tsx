import {classNames} from "@/lib/utils/methods";

type Props = {
    name: string
    label?: string
    description?: string
    checked?: boolean
    required?: boolean
    className?: string
    action?: (checked: boolean) => void
}

export default function Checkbox(props: Props)
{
    return (
        <div className={classNames(props.className ?? '', "flex gap-3")}>
            <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                    <input
                        defaultChecked={props.checked}
                        id={props.name}
                        name={props.name}
                        type="checkbox"
                        onChange={(e) => props.action ? props.action(e.target.checked) : undefined}
                        aria-describedby={props.name + "-description"}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-amber-800 checked:bg-amber-800 indeterminate:border-amber-800 indeterminate:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                    >
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                    </svg>
                </div>
            </div>
            <div className="text-sm/6">
                <label htmlFor={props.name} className="font-medium text-gray-900">
                    {props.label}{props.required ?
                    <span className={"text-red-700"}>*</span> : null}
                </label>
                {props.description ? <p id={props.name + "-description"} className="text-gray-500">
                    {props.description}
                </p> : null}
            </div>
        </div>
    )
}