import { useEffect, useState } from "react"
import { AppState } from "./types/app";
import { initialApp } from "./DummyData/initialApp";
import Providers from "./Providers";
import Navbar from "./components/Navbar";
import Child from "./components/Child";

export default function App() {

    const [app, setApp] = useState<AppState>(() => {
        const savedApp = localStorage.getItem('windows');
        return savedApp ? JSON.parse(savedApp) : { windows: initialApp }
    });

    useEffect(() => {
        localStorage.setItem('windows', JSON.stringify(app));
    }, [app])

    return (
        <div className="h-screen overflow-hidden w-screen bg-black dark:bg-zinc-900 px-2">
            <Providers>
                <Navbar />
                <Child state={app.windows[0]} setApp={setApp} parentIds={[]} />
            </Providers>
        </div>
    )
}
