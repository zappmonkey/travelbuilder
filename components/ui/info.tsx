import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import React from "react";
import {classNames} from "@/lib/utils/methods";

type Props = {
    className?: string;
    children: React.ReactNode;
}

export default function InfoHover(props: Props)
{
    return (
        <div className={classNames(props.className ? props.className : "", "inline-block mx-1")}>
            <div className="group relative flex max-w-max flex-col items-center justify-center">
                <ExclamationCircleIcon width={20} height={20}/>
                <div className="absolute z-10 left-1/2 top-10 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100">
                    <div className="flex max-w-xs flex-col items-center shadow-lg">
                        <div className="rounded bg-gray-800 p-2 text-center text-xs text-white">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}