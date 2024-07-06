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
        <div className="h-screen w-full bg-black dark:bg-zinc-700 p-1 overflow-hidden">
        <div className="flex flex-col bg-white dark:bg-black h-full py-2 overflow-scroll rounded px-2">
                <Header addTabs={addTabs} Tabs={Tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabPage {...currentTab} addBlock={addBlock} />
            </div>
        </div>
    );
}
