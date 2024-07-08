import ChatBotScreen from "../../Pages/ChatBotScreen";
import TerminalScreen from "../../Pages/TerminalScreen";
import { AppState, Section } from "../../types/app";
import { ChatProps } from "../../types/Chat";
import { TabProps } from "../../types/Tabs";
import { cn } from "../../utils/cn";

interface ChildProps {
    state: Section
    setApp: React.Dispatch<React.SetStateAction<AppState>>,
    parentIds: number[]
}
export default function Child({ state, setApp, parentIds }: ChildProps) {

    function setSection(type: 'terminal' | 'chatbot', newData: TabProps[] | ChatProps) {
        setApp((prevApp) => {
            const updatedApp = JSON.parse(JSON.stringify(prevApp));
            const section = findSection(updatedApp.windows, parentIds, state.metadata.id, type);

            if (section && section.type == type) {
                section.data = newData
            };

            return updatedApp;
        });
    }
    const setTabs = (newTabs: TabProps[]) => setSection('terminal', newTabs);
    const setChats = (newChats: ChatProps) => setSection('chatbot', newChats);


    if (state.type == 'terminal')
        return (
            <TerminalScreen Tabs={state.data} setTabs={setTabs} />
        )

    if (state.type == 'chatbot')
        return (
            <ChatBotScreen Chats={state.data} setChats={setChats} />
        )

    else if (state.type == 'parent') {
        const newParentIds = [...parentIds, state.metadata.id];
        return (
            <div className={cn("flex gap-2", state.metadata.split == "ver" && "flex-col")}>
                {state.children.map(child => (
                    <Child state={child} setApp={setApp} parentIds={newParentIds} />
                ))}
            </div>
        )
    }
    else
        return null;
}


function findSection(windows: Section[], parentIds: number[], childId: number, type: 'terminal' | 'chatbot'): Section | null {

    let currentSection: Section | null = null;

    for (const window of windows) {
        currentSection = findSectionInChildren(window, parentIds, childId, 0, type);
        if (currentSection) break;
    }

    return currentSection;
}

function findSectionInChildren(node: Section, parentIds: number[], childId: number, level: number, type: 'terminal' | 'chatbot'): Section | null {

    if (node.type == type && node.metadata.id == childId)
        return node;

    if (node.type == 'parent' && node.metadata.id == parentIds[level]) {
        for (const child of node.children) {
            const foundSection = findSectionInChildren(child, parentIds, childId, ++level, type);
            if (foundSection) {
                return foundSection
            }
        }
    };

    return null;
}
