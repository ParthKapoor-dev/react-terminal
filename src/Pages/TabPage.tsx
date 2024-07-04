import { useEffect, useState } from "react";
import Block, { BlockProps } from "../components/Block";
import Terminal from "../components/Terminal";

export interface TabProps {
    tabId: number,
    name: string,
    blocks: BlockProps[]
}

export default function TabPage({ blocks , tabId , name }: TabProps) {

    const [prevBlocks, setPrevBlocks] = useState<BlockProps[]>(blocks);

    useEffect(() => {
        const blocks = localStorage.getItem('blocks');
        if (!blocks) {
            localStorage.setItem('blocks', JSON.stringify(blocks))
            return;
        }
        console.log(JSON.parse(blocks));
        setPrevBlocks(JSON.parse(blocks));
    }, [])


    return (
        <div>

            <div>
                {prevBlocks.map(item => (
                    <Block {...item} />
                ))}
            </div>

            <Terminal location={"~/code/mern/react-terminal/src"} setPrevBlocks={setPrevBlocks} />

        </div>
    )
}