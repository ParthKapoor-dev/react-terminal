import { useEffect, useState } from "react";
import Header from "./components/Header";
import TabPage, { TabProps } from "./Pages/TabPage";

const initialTabs: TabProps[] = [
    {
        tabId: 1,
        name: "~/code/mern/terminal",
        blocks: [
            {
                id: 1,
                type: 'terminal',
                location: "~/code/mern/react-terminal",
                input: "ls src/",
                output: "app.tsx   assets   components   index.css   main.tsx   Pages   utils   vite-env.d.ts   xtermTerminal.tsx",
            },
            {
                id: 2,
                type: 'terminal',
                location: "~/code/mern/react-terminal",
                input: "cd src/",
            },
            {
                id: 3,
                type: 'terminal',
                location: "~/code/mern/react-terminal/src",
                input: "ls app.tsx",
                output: "Block  Header",
            }
        ]
    }
];

export default function App() {
    const [Tabs, setTabs] = useState<TabProps[]>(() => {
        const savedTabs = localStorage.getItem('tabs');
        return savedTabs ? JSON.parse(savedTabs) : initialTabs;
    });
    const [currentTab, setCurrentTab] = useState<TabProps>(Tabs[0]);

    useEffect(() => {
        localStorage.setItem('tabs', JSON.stringify(Tabs));
    }, [Tabs]);

    useEffect(() => {
        setCurrentTab(Tabs.find(tab => tab.tabId === currentTab.tabId) || Tabs[0]);
    }, [Tabs]);

    return (
        <div className="max-h-screen max-w-screen w-screen h-screen bg-black p-2 overflow-hidden">
            <div className="flex flex-col bg-white rounded h-full py-2 overflow-scroll">
                <Header setTabs={setTabs} Tabs={Tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <TabPage {...currentTab} setTabs={setTabs} />
            </div>
        </div>
    );
}
