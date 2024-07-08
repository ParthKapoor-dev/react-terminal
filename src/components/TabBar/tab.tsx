import { cn } from "../../utils/cn"
import { TabProps } from "../../types/Tabs"

interface HeaderTabProps {
    tab: TabProps,
    currentTab: TabProps,
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>,
}

export default function Tab({ tab, currentTab, setCurrentTab }: HeaderTabProps) {

    function handleClick() {
        setCurrentTab(tab);
    }

    return (
        <div className={cn("text-sm w-[18rem] h-8 border-2 border-neutral-300 flex justify-center items-center py-1 rounded hover:bg-sky-100 duration-300 cursor-pointer dark:hover:bg-cyan-900 dark:border-neutral-800 overflow-hidden",
            currentTab.tabId == tab.tabId ? "border-cyan-400 dark:border-cyan-400 " : "dark:hover:border-cyan-900"
        )}
            onClick={handleClick}>

            <div>
                {tab.name}
            </div>

        </div>
    )
}