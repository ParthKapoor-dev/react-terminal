import { useEffect, useState } from "react"
import { AppState, Section } from "./types/app";
import { initialApp } from "./DummyData/initialApp";
import Providers from "./Providers";
import Navbar from "./components/Navbar";
import Child, { findSection } from "./components/Child";
import { TabProps } from "./types/Tabs";

export default function App() {

    const [app, setApp] = useState<AppState>(() => {
        const savedApp = localStorage.getItem('windows');
        return savedApp ? JSON.parse(savedApp) : { windows: initialApp }
    });

    useEffect(() => {
        localStorage.setItem('windows', JSON.stringify(app));
    }, [app])

    function handleAddChatbot() {
        const newTab: TabProps = {
            tabId: Date.now(),
            name: 'ChatBot',
            type: 'chatbot',
            blocks: []
        }
        setApp(prevApp => {
            const updatedApp = JSON.parse(JSON.stringify(prevApp));
            const section = findFirstChild(updatedApp.windows[0]);

            if (section && section.type == 'editor') {
                section.data = [...section.data, newTab]
            };

            return updatedApp;
        });
    }

    return (
        <div className="h-screen overflow-hidden w-screen bg-black dark:bg-zinc-900 px-2">
            <Providers>
                <Navbar handleAddChatbot={handleAddChatbot}/>
                <Child state={app.windows[0]} setApp={setApp} parentIds={[]} />
            </Providers>
        </div>
    )
}


function findFirstChild(node: Section): Section {

    if (node.type == 'editor')
        return node;

    const section = findFirstChild(node.children[0]);
    return section
}