import EditorScreen from "../../Pages/EditorScreen";
import { AppState, Section } from "../../types/app";
import { TabProps } from "../../types/Tabs";
import { cn } from "../../utils/cn";

interface ChildProps {
    state: Section
    setApp: React.Dispatch<React.SetStateAction<AppState>>,
    parentIds: number[]
}
export default function Child({ state, setApp, parentIds }: ChildProps) {

    function setSection(newData: TabProps[]) {
        setApp((prevApp) => {
            const updatedApp = JSON.parse(JSON.stringify(prevApp));
            const section = findSection(updatedApp.windows, parentIds, state.metadata.id);

            if (section && section.type == 'editor') {
                section.data = newData
            };

            return updatedApp;
        });
    }

    if (state.type == 'editor')
        return (
            <EditorScreen Tabs={state.data} setTabs={setSection} />
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


export function findSection(windows: Section[], parentIds: number[], childId: number): Section | null {

    let currentSection: Section | null = null;

    for (const window of windows) {
        currentSection = findSectionInChildren(window, parentIds, childId, 0);
        if (currentSection) break;
    }

    return currentSection;
}

function findSectionInChildren(node: Section, parentIds: number[], childId: number, level: number): Section | null {

    if (node.type == 'editor' && node.metadata.id == childId)
        return node;

    if (node.type == 'parent' && node.metadata.id == parentIds[level]) {
        for (const child of node.children) {
            const foundSection = findSectionInChildren(child, parentIds, childId, ++level);
            if (foundSection) {
                return foundSection
            }
        }
    };

    return null;
}
