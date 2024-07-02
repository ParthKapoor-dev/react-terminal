

export interface BlockProps {
    id: number,
    type: 'chat ' | 'terminal',
    input: string,
    output?: string ,
    location: string
}

export default function Block({ id, type, input, output, location }: BlockProps) {
    return (
        <div className="py-4 px-6 border-2 border-neutral-200 rounded-lg m-2">
            <div className="text-gray-500">
                {location}
            </div>
            <div className="text-lg font-semibold">
                {input}
            </div>
            <div className="text-lg">
                {output}
            </div>
        </div>
    )
}