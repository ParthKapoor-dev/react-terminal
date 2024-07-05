import { TabProps } from "../../Pages/TabPage";
import { cn } from "../../utils/cn"

interface HeaderTabProps {
    tab: TabProps,
    currentTab : TabProps,
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>,
}

export default function HeaderTab({ tab, currentTab, setCurrentTab }: HeaderTabProps) {

    function handleClick() {
        setCurrentTab(tab);
    }

    return (
        <div className={cn("text-sm w-[18rem] border-2 border-neutral-300 flex justify-center items-center py-1 rounded hover:bg-sky-100 duration-300 cursor-pointer", currentTab.tabId == tab.tabId && "border-cyan-400 ")}
            onClick={handleClick}>

            <div>
                {tab.name}
            </div>

        </div>
    )
}