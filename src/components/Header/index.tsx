import HeaderTab from "./tab";
import { useEffect } from "react";
import { TabProps } from "../../types/Tabs";

interface HeaderProps {
    Tabs: TabProps[];
    currentTab: TabProps;
    addTabs: (newTab: TabProps) => void,
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>;
}

export default function Header({ Tabs, addTabs, setCurrentTab, currentTab }: HeaderProps) {

    function handleAddTab() {
        const newTab: TabProps = {
            tabId: Date.now(),
            name: "NewTab",
            blocks: []
        };
        addTabs(newTab);
        setCurrentTab(newTab);
    }

    return (
        <div className="h-fit w-screen px-4 py-1 flex items-center justify-between">
            <div className="flex gap-2 items-center overflow-scroll">
                {Tabs.map((item) => (
                    <HeaderTab
                        key={item.tabId}
                        tab={item}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                ))}
                <div className="text-2xl px-4 rounded hover:bg-sky-100 cursor-pointer" onClick={handleAddTab}>
                    +
                </div>
            </div>
        </div>
    );
}
