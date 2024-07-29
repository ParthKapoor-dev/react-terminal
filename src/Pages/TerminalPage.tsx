import { useState } from "react";
import Block from "../components/Block";
import Splits from "../components/Split";
import Terminal from "../components/Terminal";
import { BlockProps, TabProps } from "../types/Tabs";
import { updateType } from "../types/app";


interface TabPageProps extends TabProps {
    addBlock: (newBlock: BlockProps) => void,
    addChild: (Tab: TabProps, type: updateType) => void
    deleteTab: (tabId: number) => void
}

export default function TerminalPage({ tabId, addBlock, blocks, type, addChild }: TabPageProps) {

    const [dragover, setDragover] = useState<boolean>(false);

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        setDragover(true);
        event.preventDefault();
    }

    if (type == 'chatbot')
        return null;

    return (
        <div className="relative h-full overflow-auto page" onDragOver={handleDragOver} >
            <div>
                {blocks.map(item => (
                    <Block key={item.id} {...item} />
                ))}
            </div>
            <Terminal location={"~/code/mern/react-terminal/src"} addBlock={addBlock} tabId={tabId} />
            <Splits dragover={dragover} setDragover={setDragover} addChild={addChild} />
        </div>
    );
}
