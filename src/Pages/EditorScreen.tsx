import { useEffect, useState } from "react";
import { BlockProps, TabProps } from "../types/Tabs";
import TerminalPage from "./TerminalPage";
import ChatbotPage from "./ChatBotPage";
import TabBar from "../components/TabBar";
import { cn } from "../utils/cn";
import { addBlock, addChild, addTabs, checkTabTime, deleteChild, deleteTab, onDragOver, onDrop } from "../actions/editorPageActions";
import { Section, updateType } from "../types/app";

interface EditorScreenProps {
    Tabs: TabProps[],
    setTabs: React.Dispatch<any>
    setChildren(update: updateType, child?: Section): void
}

export default function EditorScreen({ Tabs, setTabs, setChildren }: EditorScreenProps) {
    const [currentTab, setCurrentTab] = useState<TabProps>(Tabs[0]);
    const [dragover, setDragover] = useState<Boolean>(false);

    useEffect(() => {
        const lastTab = Tabs[Tabs.length - 1];
        if (checkTabTime(lastTab) < 1000)
            setCurrentTab(lastTab);
        else
            setCurrentTab(Tabs.find(tab => tab.tabId === currentTab.tabId) || Tabs[0]);
    }, [Tabs]);

    const handleAddTabs = (newTab: TabProps) =>
        addTabs(Tabs, setTabs, newTab);
    const handleDelTab = (tabId: number) =>
        deleteTab(tabId, Tabs, setTabs, setCurrentTab, setChildren);
    const handleDragLeave = () =>
        setDragover(false);
    const handleAddBlock = (newBlock: BlockProps) =>
        addBlock(Tabs, currentTab, newBlock, setTabs)
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
        onDragOver(event, setDragover);
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) =>
        onDrop(event, handleAddTabs, setDragover);
    const handleAddChild = (Tab: TabProps, type: updateType) =>
        addChild(Tab, setChildren, type);
    const handleDelChild = () =>
        deleteChild(setChildren);

    return (
        <div className={"h-full w-full min-h-1/3 min-w-1/3 flex-grow basis-0 overflow-hidden relative"}>
            <div className="flex flex-col bg-white dark:bg-black h-full w-full p-2 rounded">
                <TabBar
                    addTabs={handleAddTabs}
                    Tabs={Tabs}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    deleteTab={handleDelTab}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    deleteChild={handleDelChild}

                />

                {currentTab.type == 'terminal' ? (
                    <TerminalPage
                        {...currentTab}
                        addBlock={handleAddBlock}
                        addChild={handleAddChild}
                        deleteTab={handleDelTab}
                    />
                ) : (
                    <ChatbotPage
                        {...currentTab}
                        addChats={handleAddBlock}
                        addChild={handleAddChild}

                    />
                )}
            </div>
            <div className={cn("hidden absolute z-10 inset-0 h-full w-full bg-black dark:bg-white opacity-30 rounded", dragover && "flex")} />
        </div>
    );
}
