import {Component} from "react";

type Props = {
    name: string
    label?: string
    rows?: number
    value?: string
    required?: boolean
    className?: string
}

export default class Textarea extends Component<Props> {
    render() {
        return (
            <div className={this.props.className ? this.props.className : ''}>
                <label htmlFor={this.props.name} className="block text-sm/6 font-medium text-gray-600">
                    {this.props.label} {this.props.required ?
                    <span className={"text-red-700"}>*</span> : <></>}
                </label>
                <div className="mt-2">
                    <textarea
                        id={this.props.name}
                        name={this.props.name}
                        rows={this.props.rows ? this.props.rows : 4}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-800 sm:text-sm/6"
                        defaultValue={this.props.value}
                    />
                </div>
            </div>
        )
    }
}