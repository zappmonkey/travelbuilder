type Props = {
    context: any
}

export default function Print(props: Props) {
    return (
        <div className="w-xl">
            <pre className='text-xs p-4 text-gray-800'>
                {JSON.stringify(props.context, null, 2)}
            </pre>
        </div>
    )
}