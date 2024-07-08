import { useEffect, useState } from "react";
import { BlockProps, TabProps } from "../types/Tabs";
import TerminalPage from "./TerminalPage";
import ChatbotPage from "./ChatBotPage";
import TabBar from "../components/TabBar";
import { addBlock, addTabs, checkTabTime, deleteTab } from "../actions/editorPageActions";

interface EditorScreenProps {
    Tabs: TabProps[],
    setTabs: React.Dispatch<any>
}

export default function EditorScreen({ Tabs, setTabs }: EditorScreenProps) {
    const [currentTab, setCurrentTab] = useState<TabProps>(Tabs[0]);

    useEffect(() => {

        const lastTab = Tabs[Tabs.length-1];
        if (checkTabTime(lastTab) < 1000)
            setCurrentTab(lastTab);
        else
            setCurrentTab(Tabs.find(tab => tab.tabId === currentTab.tabId) || Tabs[0]);
    }, [Tabs]);

    const handleAddTabs = (newTab: TabProps) =>
        addTabs(Tabs, setTabs, newTab);

    const handleDelTab = (tabId: number) =>
        deleteTab(tabId, Tabs, setTabs, setCurrentTab);
    
    const handleAddBlock = (newBlock: BlockProps) =>
        addBlock(Tabs, currentTab, newBlock, setTabs)

    return (
        <div className="h-[96vh] w-full overflow-hidden">
            <div className="flex flex-col bg-white dark:bg-black h-full p-2 overflow-scroll rounded">
                <TabBar addTabs={handleAddTabs} Tabs={Tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} deleteTab={handleDelTab} />

                {currentTab.type == 'terminal' ? (
                    <TerminalPage {...currentTab} addBlock={handleAddBlock} />
                ) : (
                    <ChatbotPage {...currentTab} addChats={handleAddBlock} />
                )}
            </div>
        </div>
    );
}
