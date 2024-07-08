import { useEffect, useState } from "react";
import { BlockProps, TabProps } from "../types/Tabs";
import TerminalPage from "./TerminalPage";
import ChatbotPage from "./ChatBotPage";
import TabBar from "../components/TabBar";

interface EditorScreenProps {
    Tabs: TabProps[],
    setTabs: React.Dispatch<any>
}

export default function EditorScreen({ Tabs, setTabs }: EditorScreenProps) {
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
                <TabBar addTabs={addTabs} Tabs={Tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

                {currentTab.type == 'terminal' ? (
                    <TerminalPage {...currentTab} addBlock={addBlock} />
                ) : (
                    <ChatbotPage {...currentTab} addChats={addBlock} />
                )}
            </div>
        </div>
    );
}
