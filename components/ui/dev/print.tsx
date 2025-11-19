type Props = {
    context: any
}

export default function Print(props: Props) {
    return (
        <pre className='text-xs p-4 text-gray-800'>
            {JSON.stringify(props.context, null, 2)}
        </pre>
    )
}