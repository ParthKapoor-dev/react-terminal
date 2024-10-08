import { BlockProps } from "../../types/Tabs";

export default function Block({ input, output, location }: BlockProps) {
    return (
        <div className="py-4 px-6 border-2 border-neutral-200 rounded-lg m-2 dark:border-slate-900 shadow dark:shadow-neutral-800 dark:bg-slate-900">
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