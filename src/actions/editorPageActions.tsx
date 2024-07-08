import { BlockProps, TabProps } from "../types/Tabs";

export function addBlock(
    Tabs: TabProps[],
    currentTab: TabProps,
    newBlock: BlockProps,
    setTabs: (tabs: TabProps[]) => void
) {
    const updatedTabs = Tabs.map(tab => {
        if (tab.tabId == currentTab.tabId)
            return { ...tab, blocks: [...tab.blocks, newBlock] };
        return tab;
    });
    setTabs(updatedTabs);
}

export function addTabs(
    Tabs: TabProps[],
    setTabs: (tabs: TabProps[]) => void,
    newTab: TabProps,
) {
    const updatedTabs = [...Tabs, newTab];
    setTabs(updatedTabs);
}

export function deleteTab(
    tabId: number,
    Tabs: TabProps[],
    setTabs: (tabs: TabProps[]) => void,
    setCurrentTab: React.Dispatch<React.SetStateAction<TabProps>>
) {

    if (Tabs.length == 1)
        return;

    const updatedTabs = Tabs.filter(tab => {
        if (tab.tabId === tabId) return false;
        return tab;
    });
    setCurrentTab(Tabs[0]);
    setTabs(updatedTabs);
}

export function checkTabTime(Tab: TabProps) {
    const date = new Date(Tab.tabId);
    const currentTime = new Date();
    return (+currentTime) - (+date);
}


export function onDragOver(
    event: React.DragEvent<HTMLDivElement>,
    setDragover: React.Dispatch<React.SetStateAction<Boolean>>

) {
    setDragover(true);
    event.preventDefault();
}

export function onDrop(
    event: React.DragEvent<HTMLDivElement>,
    handleAddTabs: (newTab: TabProps) => void,
    setDragover: React.Dispatch<React.SetStateAction<Boolean>>
) {
    setDragover(false);
    const newTab: TabProps = JSON.parse(event.dataTransfer.getData('text/plain'));
    handleAddTabs({ ...newTab, tabId: Date.now() });
}
