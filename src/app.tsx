import { useEffect, useState } from "react";
import Block, { BlockProps } from "./components/Block";
import Header from "./components/Header";
import Terminal from "./components/Terminal";

export default function App() {


    const [prevBlocks, setPrevBlocks] = useState(initialData);

    useEffect(() => {
        const blocks = localStorage.getItem('blocks');
        if (!blocks) {
            localStorage.setItem('blocks', JSON.stringify(initialData))
            return;
        }
        console.log(JSON.parse(blocks));
        setPrevBlocks(JSON.parse(blocks));
    }, [])

    return (
        <div className="min-h-screen bg-black p-2">
            <div className="flex flex-col bg-white rounded min-h-screen py-2">

                <Header />

                <div>
                    {prevBlocks.map(item => (
                        <Block {...item} />
                    ))}
                </div>

                <Terminal location={"~/code/mern/react-terminal/src"} setPrevBlocks={setPrevBlocks} />

            </div>
        </div>
    )
};


const initialData: BlockProps[] = [
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