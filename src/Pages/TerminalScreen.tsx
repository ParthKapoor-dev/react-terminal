import { useEffect, useState } from "react";
import Header from "../components/Header";
import TabPage from "./TabPage";
import { BlockProps, TabProps } from "../types/Tabs";

interface TerminalScreenProps {
    Tabs: TabProps[],
    setTabs: React.Dispatch<any>
}

export default function TerminalScreen({ Tabs, setTabs }: TerminalScreenProps) {
    const [currentTab, setCurrentTab] = useState<TabProps>(Tabs[0]);

    useEffect(() => {
        setCurrentTab(Tabs.find(tab => tab.tabId === currentTab.tabId) || Tabs[0]);
    }, [Tabs]);

    function addBlock(newBlock: BlockProps) {
        const updatedTabs = Tabs.map(tab => {
            if (tab.tabId == currentTab.tabId)
                return { ...tab, blocks: [...tab.blocks, newBlock] };
            return tab;
        });
        setTabs(updatedTabs);
    }

    function addTabs(newTab: TabProps) {
        const updatedTabs = [...Tabs, newTab];
        setTabs(updatedTabs);
    }

    return (
        <div className="h-[96vh] w-full overflow-hidden">
            <div className="flex flex-col bg-white dark:bg-black h-full p-2 overflow-scroll rounded">
                <Header addTabs={addTabs} Tabs={Tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabPage {...currentTab} addBlock={addBlock} />
            </div>
        </div>
    );
}
