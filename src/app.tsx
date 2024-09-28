import { useEffect, useState } from "react"
import { AppState, Section } from "./types/app";
import { initialApp } from "./DummyData/initialApp";
import Providers from "./Providers";
import Navbar from "./components/Navbar";
import Child from "./components/Child";
import { TabProps } from "./types/Tabs";
/**
 * The App component is the main component of the application.
 * 
 * - Manages the application state using the useState hook, initializing it with data from localStorage if available, or with initialApp if not.
 * - Persists the application state to localStorage whenever it changes using the useEffect hook.
 * - Provides a handleAddChatbot function to add a new chatbot tab to the application state.
 * 
 * @returns JSX.Element - The rendered component.
 * 
 * Functions:
 * - handleAddChatbot: Adds a new chatbot tab to the application state.
 * 
 * Components:
 * - Providers: A wrapper component for providing context to child components.
 * - Navbar: A navigation bar component which takes handleAddChatbot as a prop.
 * - Child: A component that renders the application windows, taking the current state, setApp function, and an array of parent IDs as props.
 */
export default function App() {

    const [app, setApp] = useState<AppState>(() => {
        const savedApp = localStorage.getItem('windows');
        return savedApp ? JSON.parse(savedApp) : { windows: initialApp }
    });
    
    console.log('Hello World , this is quite nice')

    useEffect(() => {
        localStorage.setItem('windows', JSON.stringify(app));
        if (app.windows[0].type == 'parent')
            console.log(app.windows[0].children);
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
                <Navbar handleAddChatbot={handleAddChatbot} />
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
