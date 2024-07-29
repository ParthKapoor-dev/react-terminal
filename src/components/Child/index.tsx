import EditorScreen from "../../Pages/EditorScreen";
import { AppState, Section, updateType } from "../../types/app";
import { TabProps } from "../../types/Tabs";
import { cn } from "../../utils/cn";

interface ChildProps {
    state: Section;
    setApp: React.Dispatch<React.SetStateAction<AppState>>;
    parentIds: number[];
}

export default function Child({ state, setApp, parentIds }: ChildProps) {

    function setTabs(newData: TabProps[]) {
        setApp((prevApp) => {
            const updatedApp = JSON.parse(JSON.stringify(prevApp));
            const section = findSection(updatedApp.windows, parentIds, state.metadata.id, 'editor');

            if (section && section.type === 'editor') {
                section.data = newData;
            }

            return updatedApp;
        });
    }

    function setChildren(update: updateType, child?: Section) {
        setApp((prevApp) => {
            const updatedApp = { ...prevApp };
            const section = findSection(updatedApp.windows, parentIds, state.metadata.id, 'parent');

            if (section && section.type === 'parent') {

                let index = section.children.findIndex(c =>
                    c.metadata.id === state.metadata.id
                );
                let split = 'ver';

                if (update == 'delete' || !child) {
                    section.children.splice(index, 1);
                    if (!section.children.length || !section) {
                        const newParentIds = [...parentIds];
                        newParentIds.pop();
                        console.log(newParentIds);
                        const parentSection = findSection(updatedApp.windows, newParentIds, state.metadata.id, 'parent');
                        console.log(parentSection);
                        if (parentSection && parentSection.type == 'parent') {
                            const childIndex = parentSection.children.findIndex(c =>
                                c.metadata.id == section.metadata.id
                            );
                            console.log(childIndex);
                            parentSection.children.splice(childIndex, 1);
                            // console.log(updatedApp)
                        }
                    }
                    return updatedApp;
                }

                const newParent: Section = {
                    type: 'parent',
                    metadata: {
                        id: Date.now(),
                        split: 'ver',
                    },
                    children: update == 'addBottom' ? [state, child] : [child, state]
                };


                if (update === 'addTop' || update === 'addBottom' && child) {
                    split = 'hor'
                } else if (update === 'addLeft' || update === 'addRight') {
                    index = update === 'addLeft' ? index : index + 1;
                    newParent.metadata.split = 'hor';
                }

                if (section.metadata.split == split) {
                    if (section.children.length == 1) {
                        section.children = newParent.children;
                        section.metadata = newParent.metadata;
                    } else
                        section.children[index] = newParent;
                } else {
                    section.children.splice(index, 0, child);
                }
            }

            return updatedApp;
        });
    }

    if (state.type === 'editor') {
        return (
            <EditorScreen Tabs={state.data} setTabs={setTabs} setChildren={setChildren} />
        );
    } else if (state.type === 'parent') {
        const newParentIds = [...parentIds, state.metadata.id];
        return (
            <div className={cn("flex flex-wrap basis-0 flex-grow h-full w-full gap-2 ", state.metadata.split === "ver" ? "flex-col" : "flex-row")}>
                {state.children.map((child) => (
                    <Child state={child} setApp={setApp} parentIds={newParentIds} />
                ))}
            </div>
        );
    } else {
        return null;
    }
}

export function findSection(windows: Section[], parentIds: number[], childId: number, type: 'parent' | 'editor'): Section | null {
    let currentSection: Section | null = null;

    for (const window of windows) {
        currentSection = findSectionInChildren(window, parentIds, childId, 0, type);
        if (currentSection) break;
    }

    return currentSection;
}

function findSectionInChildren(node: Section, parentIds: number[], childId: number, level: number, type: 'parent' | 'editor'): Section | null {
    if (type === 'parent' && node.type === 'parent' && node.metadata.id === parentIds[parentIds.length - 1])
        return node;

    if (type === 'editor' && node.type === 'editor' && node.metadata.id === childId)
        return node;

    if (node.type === 'parent' && node.metadata.id === parentIds[level]) {
        for (const child of node.children) {
            const foundSection = findSectionInChildren(child, parentIds, childId, level + 1, type);
            if (foundSection) {
                return foundSection;
            }
        }
    }

    return null;
}
