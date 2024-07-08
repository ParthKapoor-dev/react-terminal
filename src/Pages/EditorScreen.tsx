import { useEffect, useState } from "react";
import { BlockProps, TabProps } from "../types/Tabs";
import TerminalPage from "./TerminalPage";
import ChatbotPage from "./ChatBotPage";
import TabBar from "../components/TabBar";
import { addBlock, addTabs, checkTabTime, deleteTab, onDragOver, onDrop } from "../actions/editorPageActions";
import { cn } from "../utils/cn";

interface EditorScreenProps {
    Tabs: TabProps[],
    setTabs: React.Dispatch<any>
}

export default function EditorScreen({ Tabs, setTabs }: EditorScreenProps) {
    const [currentTab, setCurrentTab] = useState<TabProps>(Tabs[0]);
    const [dragover, setDragover] = useState<Boolean>(false);

    useEffect(() => {

        const lastTab = Tabs[Tabs.length - 1];
        if (checkTabTime(lastTab) < 1000)
            setCurrentTab(lastTab);
        else
            setCurrentTab(Tabs.find(tab => tab.tabId === currentTab.tabId) || Tabs[0]);
    }, [Tabs]);

    const handleAddTabs = (newTab: TabProps) => addTabs(Tabs, setTabs, newTab);

    const handleDelTab = (tabId: number) => deleteTab(tabId, Tabs, setTabs, setCurrentTab);

    const handleAddBlock = (newBlock: BlockProps) =>
        addBlock(Tabs, currentTab, newBlock, setTabs)

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
        onDragOver(event, setDragover);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) =>
        onDrop(event, handleAddTabs, setDragover);

    const handleDragLeave = () => setDragover(false);


    return (
        <div className={"h-[96vh] w-full overflow-hidden relative"}
            onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            <div className="flex flex-col bg-white dark:bg-black h-full p-2 overflow-scroll rounded">
                <TabBar
                    addTabs={handleAddTabs}
                    Tabs={Tabs}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    deleteTab={handleDelTab}
                />

                {currentTab.type == 'terminal' ? (
                    <TerminalPage
                        {...currentTab}
                        addBlock={handleAddBlock}
                    />
                ) : (
                    <ChatbotPage
                        {...currentTab}
                        addChats={handleAddBlock}
                    />
                )}
            </div>
            <div className={cn("hidden absolute z-10 inset-0 h-full w-full bg-black dark:bg-white opacity-30 rounded", dragover && "flex")} />
        </div>
    );
}
