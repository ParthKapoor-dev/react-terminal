import { cn } from "../../utils/cn"

interface HeaderTabProps {
    title: string,
    selected: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>,
    index: number
}

export default function HeaderTab({ title, selected, setSelected, index }: HeaderTabProps) {

    function handleClick() {
        setSelected(index);
    }
    return (
        <div className={cn("text-sm w-[18rem] border-2 border-neutral-300 flex justify-center items-center py-1 rounded hover:bg-sky-100 duration-300 cursor-pointer" , selected==index && "border-cyan-400 ")} 
        onClick={handleClick}>

            <div>
                {title}
            </div>

        </div>
    )
}