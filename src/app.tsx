import { useEffect, useState } from "react";
import Header from "./components/Header";
import TabPage, { TabProps } from "./Pages/TabPage";

export default function App() {


    const [Tabs, setTabs] = useState(initialTabs);
    const tabNames = Tabs.map(item => item.name);

    useEffect(() => {
        const tabs = localStorage.getItem('tabs');
        if (!tabs) {
            localStorage.setItem('tabs', JSON.stringify(initialTabs))
            return;
        }
        console.log(JSON.parse(tabs));
        setTabs(JSON.parse(tabs));
    }, [])

    return (
        <div className="min-h-screen bg-black p-2">
            <div className="flex flex-col bg-white rounded min-h-screen py-2">

                <Header TabTitles={tabNames} />

                {Tabs.map(tab => (
                    <TabPage {...tab} />
                ))}


            </div>
        </div>
    )
};

const initialTabs: TabProps[] = [
    {
        tabId: 1,
        name: "",
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
]