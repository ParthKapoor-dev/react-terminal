import { cn } from "../../utils/cn"
import { TabProps } from "../../types/Tabs"
import { CgClose } from "react-icons/cg";

interface HeaderTabProps {
    tab: TabProps,
    currentTab: TabProps,
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>,
    deleteTab: (tabId: number) => void
}

export default function Tab({ tab, currentTab, setCurrentTab, deleteTab }: HeaderTabProps) {

    function handleClick() {
        setCurrentTab(tab);
    }

    function handleDel() {
        deleteTab(tab.tabId);
    }

    function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
        event.dataTransfer.setData('text/plain', JSON.stringify(tab));
    }

    function handleDragEnd(event: React.DragEvent<HTMLDivElement>) {
        if(event.dataTransfer.dropEffect == 'move' || event.dataTransfer.dropEffect == 'copy' )
            handleDel();
    }

    return (
        <div className={cn(" min-w-28 w-[20rem] relative text-sm h-8 border-2 border-neutral-300 flex justify-center items-center gap-4 py-1 rounded hover:bg-sky-100 duration-300 cursor-pointer dark:hover:bg-cyan-900 dark:border-neutral-800 overflow-hidden",
            currentTab.tabId == tab.tabId ? "border-cyan-400 dark:border-cyan-400 " : "dark:hover:border-cyan-900"
        )} onClick={handleClick} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >

            <div>
                {tab.name}
            </div>

            <div className=" absolute right-1 hover:bg-slate-300 dark:hover:text-black dark:text-white px-2 py-1 rounded duration-200" onClick={handleDel}>
                <CgClose />
            </div>
        </div>
    )
}