import { ChatBlockProps } from "../../types/Chat";

export default function ChatBlock({ id , input , output }: ChatBlockProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="py-2 px-4 border-2 border-orange-500 bg-orange-100 dark:bg-slate-800 rounded ">
                {input}
            </div>
            <div className="py-2 px-4 border-2 border-green-500 bg-green-100 dark:bg-slate-800 rounded">
                {output}
            </div>
        </div>
    )
}