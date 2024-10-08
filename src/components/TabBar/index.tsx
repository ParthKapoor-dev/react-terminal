import Tab from "./tab";
import { TabProps } from "../../types/Tabs";

interface TabBarProps {
    Tabs: TabProps[];
    currentTab: TabProps;
    addTabs: (newTab: TabProps) => void,
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>;
    deleteTab: (tabId: number) => void,
    deleteChild: () => void
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void
    onDragLeave: () => void
}

export default function TabBar({ Tabs, addTabs, setCurrentTab, currentTab, deleteTab, onDragOver, onDragLeave, onDrop }: TabBarProps) {

    function handleAddTab() {
        const newTab: TabProps = {
            tabId: Date.now(),
            name: "NewTab",
            type: 'terminal',
            blocks: []
        };
        addTabs(newTab);
        setCurrentTab(newTab);
    }

    return (
        <div className="px-4 py-1 flex items-center justify-between"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        >
            <div className="flex gap-2 items-center overflow-hidden">
                {Tabs.map((item) => (
                    <Tab
                        key={item.tabId}
                        tab={item}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        deleteTab={deleteTab}
                    />
                ))}
                <div className="text-2xl px-4 rounded hover:bg-sky-100 cursor-pointer dark:hover:bg-cyan-800" onClick={handleAddTab}>
                    +
                </div>
            </div>
        </div>
    );
}
