import { useEffect, useState } from "react";
import Block, { BlockProps } from "../components/Block";
import Terminal from "../components/Terminal";

export interface TabProps {
    tabId: number;
    name: string;
    blocks: BlockProps[];
}

interface TabPageProps extends TabProps {
    setTabs: React.Dispatch<React.SetStateAction<TabProps[]>>;
}

export default function TabPage({ blocks, tabId, name, setTabs }: TabPageProps) {
    const [ShowBlocks, setShowBlocks] = useState<BlockProps[]>(blocks);

    useEffect(() => {
        setShowBlocks(blocks);
    }, [blocks]);

    useEffect(() => {
        localStorage.setItem('blocks', JSON.stringify(ShowBlocks));
    }, [ShowBlocks]);

    return (
        <div>
            <div>
                {ShowBlocks.map(item => (
                    <Block key={item.id} {...item} />
                ))}
            </div>
            <Terminal location={"~/code/mern/react-terminal/src"} setShowBlocks={setShowBlocks} setTabs={setTabs} tabId={tabId} />
        </div>
    );
}
