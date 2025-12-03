import {classNames} from "@/lib/utils/methods";

type Props = {
    name: string
    label?: string
    placeholder?: string
    type: string
    value?: string
    required?: boolean
    className?: string
    autoComplete?: string
    ref?: any
}

export default function Input(props: Props) {
    return (
        <div className={props.className ? props.className : ''}>
            {props.label ? <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-600">
                {props.label} {props.required ?
                <span className={"text-red-700"}>*</span> : null}
            </label> : null}
            <div className={props.label ? "mt-2" : ''}>
                <input
                    id={props.name}
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder ? props.placeholder : props.label}
                    defaultValue={props.value ? props.value : ''}
                    required={props.required}
                    autoComplete={props.autoComplete}
                    ref={props.ref}
                    className={classNames(props.type == 'color' ? 'h-10 px-1.5 py-0.5' : props.type !== 'hidden' ? 'px-3 py-1.5' : '',
                        "block w-full rounded-md bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-800 sm:text-sm/6")}
                />
            </div>
        </div>
    )
}
