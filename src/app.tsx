import { useEffect, useState } from "react"
import TerminalScreen from "./Pages/TerminalScreen";
import { cn } from "./utils/cn";
import { TabProps } from "./types/Tabs";
import { AppState, Section } from "./types/app";
import { initialApp } from "./DummyData/initialApp";
import Providers from "./Providers";

export default function App() {

    const [app, setApp] = useState<AppState>(() => {
        const savedApp = localStorage.getItem('windows');
        return savedApp ? JSON.parse(savedApp) : { windows: initialApp }
    });

    useEffect(() => {
        localStorage.setItem('windows', JSON.stringify(app));
        console.log('The App');
        console.log(app);
    }, [app])

    return (
        <div className="h-screen w-screen">
            <Providers>
                <Child state={app.windows[0]} setApp={setApp} parentIds={[]} />
            </Providers>
        </div>
    )
}

interface ChildProps {
    state: Section
    setApp: React.Dispatch<React.SetStateAction<AppState>>,
    parentIds: number[]
}
function Child({ state, setApp, parentIds }: ChildProps) {

    function setTabs(newTabs: TabProps[]) {
        setApp((prevApp) => {
            const updatedApp = JSON.parse(JSON.stringify(prevApp));
            const section = findSection(updatedApp.windows, parentIds, state.metadata.id);

            if (section && section.type == 'terminal') {
                section.data = newTabs
            };

            console.log(section);
            console.log(updatedApp);

            return updatedApp;
        });
    }

    if (state.type == 'terminal')
        return (
            <TerminalScreen Tabs={state.data} setTabs={setTabs} />
        )
    else if (state.type == 'parent') {
        const newParentIds = [...parentIds, state.metadata.id];
        console.log(newParentIds);
        return (
            <div className={cn("flex", state.metadata.split == "ver" && "flex-col")}>
                {state.children.map(child => (
                    <Child state={child} setApp={setApp} parentIds={newParentIds} />
                ))}
            </div>
        )
    }
    else
        return null;
}


function findSection(windows: Section[], parentIds: number[], childId: number): Section | null {

    let currentSection: Section | null = null;

    for (const window of windows) {
        currentSection = findSectionInChildren(window, parentIds, childId, 0);
        if (currentSection) break;
    }

    return currentSection;
}

function findSectionInChildren(node: Section, parentIds: number[], childId: number, level: number): Section | null {

    if (node.type == 'terminal' && node.metadata.id == childId)
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
