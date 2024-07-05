import { useEffect } from "react";
import HeaderTab from "./tab";
import { TabProps } from "../../Pages/TabPage";

interface HeaderProps {
    Tabs: TabProps[];
    currentTab: TabProps;
    setTabs: React.Dispatch<React.SetStateAction<TabProps[]>>;
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>;
}

export default function Header({ Tabs, setTabs, setCurrentTab, currentTab }: HeaderProps) {

    function handleAddTab() {
        const newTab: TabProps = {
            tabId: Date.now(),
            name: "NewTab",
            blocks: []
        };

        setTabs(prev => {
            const updatedTabs = [...prev, newTab];
            setCurrentTab(newTab); // Set the newly created tab as the current tab
            return updatedTabs;
        });
    }

    return (
        <div className="h-fit w-screen px-4 py-1 flex items-center justify-between">
            <div className="flex gap-2 items-center">
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
