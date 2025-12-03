import {classNames} from "@/lib/utils/methods";

type Props = {
    onClick?: (() => void);
    label: string;
    type: 'button' | 'submit';
    className?: string;
    form?: string;
}

export default function Button(props: Props)
{
    return (
        <button
            type={props.type}
            form={props.form}
            onClick={() => props.onClick ? props.onClick() : null}
            className={classNames(props.className ? props.className : '',
                "rounded-md bg-amber-800 px-4 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            )}
        >
            {props.label}
        </button>
    )
}